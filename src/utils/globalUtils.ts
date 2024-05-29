// utils.ts
import { writeText, readText } from '@tauri-apps/api/clipboard';

class GlobalUtils {
  private static instance: GlobalUtils;
  stringUtils: StringUtils;

  // 私有构造函数，确保外部不能直接实例化
  private constructor() {
    this.stringUtils = new StringUtils();
  }

  // 获取实例的静态方法
  public static getInstance(): GlobalUtils {
    if (!GlobalUtils.instance) {
      GlobalUtils.instance = new GlobalUtils();
    }
    return GlobalUtils.instance;
  }

  // 获取当前时间
  getCurrentTime(): string {
      return new Date().toLocaleTimeString();
  }

  // 生成随机数
  generateRandomNumber(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async writeClipboardText(val: string) {
    await writeText(val);
  }

  async readClipboardText(): Promise<string> {
    return await readText();
  }

  /**
   * 深度拷贝对象
   * @param obj 
   * @returns 
   */
  deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    const clone: any = Array.isArray(obj) ? [] : {};
  
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clone[key] = this.deepClone(obj[key]);
      }
    }
  
    return clone as T;
  }

  /**
   * @desc  函数防抖，用于将多次执行变为最后一次执行
   * @param {function} func - 需要使用函数防抖的被执行的函数。必传
   * @param {Number} wait - 多少毫秒之内触发，只执行第一次，默认1000ms。可以不传
   */
  debounce(fn, delay) {
    delay = delay || 1000; //默认1s后执行
    let timer = null;
    return function () {
      let context = this;
      let arg = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(context, arg);
      }, delay);
    };
  }

  /**
   * 节流函数, 用于将多次执行变为每隔一段时间执行
   * @param fn 事件触发的操作
   * @param delay 间隔多少毫秒需要触发一次事件
   */
  throttle2(fn, delay) {
    let timer = null;
    return function () {
      let context = this;
      let args = arguments;
      if (!timer) {
        timer = setTimeout(function () {
          fn.apply(context, args);
          clearTimeout(timer);
        }, delay);
      }
    };
  }
}

// 字符串相关工具类
class StringUtils {

  /**
   * 判断字符串为空
   * - isBlank('') = true
   * - isBlank(null) = true
   * - isBlank(undefined) = true
   * - isBlank(' ') = true
   * @param str 字符串
   * @returns 
   */
  isBlank(str: string | null | undefined): boolean {
    if (
      str == undefined 
      || typeof str == 'undefined' 
      || !str 
      || str == null 
      || str == '' 
      || /^\s+$/gi.test(str)
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 判断字符串不为空
   * @param str 字符串
   * @returns 
   */
  isNotBlank(str: string): boolean {
    return !this.isBlank(str);
  }
}

export const globalUtils = GlobalUtils.getInstance();