import { ThemeInstance } from 'vuetify'
import { TOOL_BOOKMARKS, MenuItem } from '@/config/router';
import { invoke } from '@tauri-apps/api';

// Rust Config 结构体对象
export type SettingType = {
  lang: string,
  theme: string,
  bookmarks: string
}

// 待办事项结构体
export type TodoType = {
  id: number,
  text: string,
  completed: boolean,
}

const TODO_STORA_KEY: string = 'toolkits-todo';

class ToolkitsHelper {
  /** 待办事项保存key */
  public _todo_stora_key: string;

  /** APP 主题对象 */
  private _theme: ThemeInstance;
  /** Vue 全局对象 appContext */
  private _proxy: any;

  private static _instance: ToolkitsHelper;

  static getInstance() {
    if (!ToolkitsHelper._instance) {
      ToolkitsHelper._instance = new ToolkitsHelper();
    }
    return ToolkitsHelper._instance;
  }

  private constructor() {
    this._todo_stora_key = TODO_STORA_KEY;
  }

  /** 获取收藏工具 */
  get bookmarks(): MenuItem[] {
    return this._proxy.$tool_bookmarks.value;
  }

  // Add to Favorites or Bookmarks
  set bookmarks(value: MenuItem[]) {
    this._proxy.$tool_bookmarks.value = value;
  }

  /**
   * 获取待办事项
   * @returns - { todo:[], size: number }
   */
  public getTodos() {
    try {
      let todos: TodoType[] = JSON.parse(localStorage.getItem(TODO_STORA_KEY));
      // console.log("🚀 ~ ToolkitsHelper ~ getTodos ~ todo:", todo, localStorage.getItem(this.TODO_STORA_KEY))
      return { todoList: todos, size: todos.length, undoneSize: this.getUndoneTodoSize(todos) }
    } catch(error) {
      console.log("🚀 ~ ToolkitsHelper ~ getTodosSize ~ error:", error)
    }
    return { todo: [], size: 0 }
  }

  public getUndoneTodoSize(todos: TodoType[]) {
    return todos.filter(todo => !todo.completed).length;
  }

  /**
   * 获取 Vue 全局对象
   * @returns Vue 全局变量 proxy
   */
  public getGlobalProperties() {
    return this._proxy;
  }

  /**
   * 读取配置文件，并初始化 APP 状态
   */
  public init(theme: ThemeInstance, proxy: any, i18nLocale?: any) {
    this._theme = theme;
    this._proxy = proxy;
    // _this._i18nLocale = i18nLocale;
    // console.log(_this._proxy, _this.theme, _this._i18nLocale);
    invoke('get_settings').then((res) => {
      const settings = res as SettingType;
      // 主题
      this._theme.global.name.value = settings.theme;
      // 语言
      if (i18nLocale.value !== settings.lang) {
        i18nLocale.value = settings.lang;
      }
      // 快捷菜单
      this.bookmarks = this.getBookmarksByPaths(settings.bookmarks.split(','));
    });
  }

  /**
   * Parent Menu Active
   * @param item - MenuItem
   */
  activeParentTool(item: MenuItem) {
    let parent = this._proxy.$tool_menus.value.find(tool => tool.path === item.parentPath);
    if (parent) parent.isActive = true;
  }

  /**
   * 是否已存在收藏夹中
   * @param path 工具ID
   * @returns 
   */
  existBookmark(path: string): boolean {
    return !!this.bookmarks.find(sub => sub.path.includes(path));
  }

  /**
   * 添加到收藏夹
   * @param tool tool对象
   */
  setBookmarks(tool: MenuItem) {
    this.bookmarks.push(tool);
  }

  /**
   * 从收藏夹中移除
   * @param path 工具ID
   */
  filterBookmarksByPath(path: string) {
    this.bookmarks = this.bookmarks.filter(sub => sub.path !== path);
  }

  /**
   * 获取已收藏工具
   * @param paths - bookmarks path string array
   * @returns MenuItem[]
   */
  getBookmarksByPaths(paths: string[] = []): MenuItem[] {
    let star_menus = this.bookmarks.map((x) => x);
    const all = this.getAllTools();
    paths.forEach(path => {
      const hasItem = star_menus.find(sub => sub.path === path);
      if (!hasItem) {
        all.forEach(item => {
          if (item.path === path) {
            star_menus.push(item);
          }
        });
      }
    })
    return star_menus;
  }
  
  /**
   * 获取所有工具
   * @returns 所有工具数组对象
   */
  getAllTools(): MenuItem[] {
    let allTools: MenuItem[] = [];
    let star_menus = TOOL_BOOKMARKS.map((x) => x); // 默认值
    star_menus.shift();
    allTools.push(...star_menus);
    this._proxy.$tool_menus.value.forEach(item => {
      if (item.submenu && item.submenu.length > 0) {
        allTools.push(...item.submenu);
      }
    });
    return allTools.sort((a, b) => b.name.localeCompare(a.name));
  }
}

export const toolkitsHelper = ToolkitsHelper.getInstance();

/**
 * Note: macos 声明并初始化静态变量导致 SyntaxError: Unexpected token '{' 错误
 * 本地开发环境报错，build无影响
 * 例：
 * class ToolkitsHelper {
 *  private static a: string = '1';
 * }
 * class ToolkitsHelper {
 *  static {
 *    this.a = '1';
 *  }
 * }
 */