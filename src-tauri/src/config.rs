use serde::{Deserialize, Serialize};
use std::fs;
use std::io::Write;
use std::mem;
use std::path::PathBuf;
use std::ptr::null;
use std::sync::Mutex;
use tauri::api::path::{config_dir, BaseDirectory};
use tauri::{generate_context, Context};
use tauri::utils::assets::EmbeddedAssets;

const SETTINGS_FILENAME: &str = "settings.json";
/**
 * use std::env;
 *  let display = home.display();
    println!("{}", display);
    for (key, value) in env::vars() {
        println!("{key}: {value}")
    }
    for argument in env::args() {
        println!("{argument}")
    }
    let path = env::current_dir();
    println!("The current directory is {}", path.expect("REASON").display());
*/

pub fn get_tauri_context() -> tauri::Context<EmbeddedAssets> {
    // 生成应用程序的上下文对象
    let context = generate_context!();

    // 获取应用程序的配置路径 tauri.conf.json
    // let app_config = context.config();
    // println!("App Config: {}", app_config.tauri.bundle.identifier);
    // 获取应用程序信息
    // let package_info = context.package_info();
    // println!("App Package Info: {:#?}", package_info);

    // println!("App Context: {:#?}", context);
    context
}


// 获取本地应用文件路劲
fn get_config_dir() -> PathBuf {
    // 获取应用程序本地数据文件的建议目录的路径
    let tauri_identifier = get_tauri_context().config().tauri.bundle.identifier.to_string();
    config_dir().unwrap().join(tauri_identifier)
}

#[cfg(any(target_os = "windows", target_os = "macos", target_os = "linux"))]
fn get_config_root() -> PathBuf {
    let appdata = PathBuf::from(get_config_dir());
    appdata.join("config")
}

/**
 * #[derive(Debug, Serialize, Deserialize, Clone)] 是 Rust 中结构体或枚举的派生属性（derive attribute），
 * 它用于自动生成一些常用的实现代码，以简化开发人员的工作。
 * 具体来说：
 * Debug: 这个派生属性会为结构体或枚举自动生成 Debug trait 的实现。
 * Debug trait 允许你使用 println! 宏打印结构体或枚举的调试信息。
 * Serialize: 这个派生属性会为结构体或枚举自动生成 Serialize trait 的实现。
 * Serialize trait 是 Serde 库提供的，用于将结构体或枚举序列化为数据格式，比如 JSON、Bincode 等。
 * Deserialize: 这个派生属性会为结构体或枚举自动生成 Deserialize trait 的实现。
 * Deserialize trait 是 Serde 库提供的，用于将数据格式反序列化为结构体或枚举。
 * Clone: 这个派生属性会为结构体或枚举自动生成 Clone trait 的实现。
 * Clone trait 允许你通过复制的方式创建一个结构体或枚举的副本，而不是通过引用。
 * 通过在结构体或枚举的定义上添加这些派生属性，你可以在代码中直接使用这些特性，而不需要手动编写对应的实现代码。
 */
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Settings { // Rust 结构体定义成员变量 （类）
    lang: String,
    theme: String,
    // #[serde(rename = "fullName")]  // 指定别名
    #[serde(default)]  // 指定默认值为""
    bookmarks: String
}

/**
 *  结构体定义方法
    方法（Method）和函数（Function）类似，只不过它是用来操作结构体实例的。
    如果你学习过一些面向对象的语言，那你一定很清楚函数一般放在类定义里并在函数中用 this 表示所操作的实例。
    Rust 语言不是面向对象的，从它所有权机制的创新可以看出这一点。但是面向对象的珍贵思想可以在 Rust 实现。
    结构体方法的第一个参数必须是 &self，不需声明类型，因为 self 不是一种风格而是关键字。
    结构体 impl 块可以写几次，效果相当于它们内容的拼接！
 */
// Default: Settings 默认值设置
impl Default for Settings { 
    fn default() -> Self {
        Self {
            lang: "zh-Hans".to_string(),
            theme: "lightThemeYellow".to_string(),
            bookmarks: "".to_string()
        }
    }
}

// 定义Config 文件读写接口
trait Config {
    fn write_file(&self) {}
    fn read_file(&mut self) {}
}

// Settings类 实现 Config 文件读写方法
impl Config for Settings {
    fn write_file(&self) {
        let config_file = get_config_root().join(SETTINGS_FILENAME);
        // 如果文件目录不存在，则创建
        if !config_file.parent().unwrap().exists() {
            fs::create_dir_all(config_file.parent().unwrap()).unwrap();
        }
        // serde_json： 结构体 转 json 字符串，写入文件
        let serialized = serde_json::to_string(self).unwrap();
        let mut file = fs::File::create(config_file).unwrap();
        file.write_all(&serialized.as_bytes()).unwrap();
    }

    // 读取json文件，转 结构体
    fn read_file(&mut self) {
        let config_file = get_config_root().join(SETTINGS_FILENAME);
        let input = fs::read_to_string(config_file).unwrap();
        // 尝试解析 JSON 字符串为结构体实例
        match serde_json::from_str(&input) {
            Ok(deserialized) => {
                // 解析成功，执行替换操作
                let _ = mem::replace(self, deserialized);
                // println!("替换成功");
            },
            Err(err) => {
                // 解析失败，执行自定义操作
                println!("解析失败: {:?}", err);
            }
        }
    }
}

impl Settings {
    pub fn new() -> Self {
        let config_file = get_config_root().join(SETTINGS_FILENAME);
        if !config_file.exists() {
            Self::default()
        } else {
            let mut settings = Self::default();
            settings.read_file();
            settings
        }
    }

    pub fn set_language(&mut self, new_lang: String) {
        self.lang = new_lang;
        self.write_file();
        // println!("{:?}", self);
    }

    pub fn set_theme(&mut self, new_theme: String) {
        self.theme = new_theme;
        self.write_file();
        // println!("{:?}", self);
    }

    pub fn set_bookmarks(&mut self, new_bookmarks: String) {
        self.bookmarks = new_bookmarks;
        self.write_file();
        // println!("{:?}", self);
    }

    pub fn set_item(&mut self, _key: String, _value: String) {
        // self.s = value;
        // self.write_file();
        // println!("{:?}", self);
    }
}

#[derive(Debug)]
pub struct AppState {
    settings: Mutex<Settings>,
}

/**
 * 在 Rust 中，Mutex 是通过标准库中的 std::sync::Mutex 结构体实现的。它提供了两个主要方法：lock() 和 unlock()。
 * lock() 方法用于获取 Mutex 的锁，如果锁已经被其他线程持有，则当前线程会被阻塞，直到锁被释放。
 * unlock() 方法用于释放 Mutex 的锁，让其他线程可以继续访问被保护的数据。
 */
impl AppState {
    pub fn new() -> Self {
        Self {
            settings: Mutex::from(Settings::new()),
        }
    }
}

// main.rs invoke_handler command 方法
pub mod commands {
    // 导入其父模块中的所有项（变量、函数、结构体等）
    use super::*;

    #[tauri::command]
    pub async fn set_language(state: tauri::State<'_, AppState>, new_language: String) -> Result<(), String> {
        // let mut settings = state.settings.lock().map_err(|e| {
        //     let error_message = format!("Failed to acquire lock [Settings]: {}", e);
        //     error!("{}", error_message);
        //     error_message
        // })?;
        let mut settings = state.settings.lock().unwrap();
        settings.set_language(new_language);
        Ok(())
    }

    #[tauri::command]
    pub async fn set_theme(state: tauri::State<'_, AppState>, new_theme: String) -> Result<(), String> {
        let mut settings = state.settings.lock().unwrap();
        settings.set_theme(new_theme);
        Ok(())
    }

    #[tauri::command]
    pub async fn set_bookmarks(state: tauri::State<'_, AppState>, new_bookmarks: String) -> Result<(), String> {
        let mut settings = state.settings.lock().unwrap();
        settings.set_bookmarks(new_bookmarks);
        Ok(())
    }

    #[tauri::command]
    pub async fn set_item(state: tauri::State<'_, AppState>, key: String, value: String) -> Result<(), String> {
        let mut settings = state.settings.lock().unwrap();
        settings.set_item(key, value);
        Ok(())
    }

    #[tauri::command]
    pub async fn get_settings(state: tauri::State<'_, AppState>) -> Result<Settings, String> {
        let settings = state.settings.lock().unwrap().clone();
        Ok(settings)
    }
}