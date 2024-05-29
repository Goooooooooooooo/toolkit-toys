// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(unused_imports)]
use tauri::{AboutMetadata, CustomMenuItem, Menu, MenuEntry, MenuItem, Submenu};
use nanoid::nanoid;

use std::collections::HashMap;
use std::sync::Mutex;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn generate_nanoid(size: usize) -> String {
    nanoid!(size)
}

mod config;
// mod toodlist;

fn main() {
    let app_state = config::AppState::new();
    // let todo_list = toodlist::TodoListWrapper(Mutex::new(toodlist::TodoList {
    //     list: HashMap::new()
    // }));
    let ctx = config::get_tauri_context();
    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(
                    "sqlite:pwstore.db",  // DB文件
                    vec![
                        tauri_plugin_sql::Migration {
                            version: 1,
                            description: "create pwstore table",
                            sql: include_str!("../migrations/pwstore.sql"),  // 读取指定sql
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        }
                    ],
                )
                .build(),
        )
        // 新增菜单
        // Menu::new().add_native_item(MenuItem::Copy)
        .menu(Menu::with_items([
            #[cfg(target_os = "macos")]
			MenuEntry::Submenu(Submenu::new(
				&ctx.package_info().name,
				Menu::with_items([
					MenuItem::About(ctx.package_info().name.clone(), AboutMetadata::default())
						.into(),
					MenuItem::Separator.into(),
					MenuItem::Services.into(),
					MenuItem::Separator.into(),
					MenuItem::Hide.into(),
					MenuItem::HideOthers.into(),
					MenuItem::ShowAll.into(),
					MenuItem::Separator.into(),
					MenuItem::Quit.into(),
				]),
			)),
			MenuEntry::Submenu(Submenu::new(
				"File",
				Menu::with_items([
                    MenuItem::CloseWindow.into(),
                    #[cfg(target_os = "macos")]
                    CustomMenuItem::new("hello", "Hello").into(),
                ]),
			)),
			MenuEntry::Submenu(Submenu::new(
				"Edit",
				Menu::with_items([
					MenuItem::Undo.into(),
					MenuItem::Redo.into(),
					MenuItem::Separator.into(),
					MenuItem::Cut.into(),
					MenuItem::Copy.into(),
					MenuItem::Paste.into(),
					#[cfg(not(target_os = "macos"))]
					MenuItem::Separator.into(),
					MenuItem::SelectAll.into(),
				]),
			)),
			MenuEntry::Submenu(Submenu::new(
				"View",
				Menu::with_items([MenuItem::EnterFullScreen.into()]),
			)),
			MenuEntry::Submenu(Submenu::new(
				"Window",
				Menu::with_items([MenuItem::Minimize.into(), MenuItem::Zoom.into()]),
			)),
			// You should always have a Help menu on macOS because it will automatically
			// show a menu search field
			MenuEntry::Submenu(Submenu::new(
				"Help",
				Menu::with_items([CustomMenuItem::new("Learn More", "Learn More").into()]),
			)),
        ]))
        // 关闭窗口
        .on_window_event(|event|{
            match event.event() {
                tauri::WindowEvent::CloseRequested { api, .. } =>{
                    //阻止默认关闭
                    api.prevent_close();
                    let window = event.window().clone();
                    tauri::api::dialog::confirm(Some(&event.window()), "关闭应用", "确定关闭当前应用?", move| answer|{
                        if answer {
                            let _ = window.close();
                        }
                    })
                },
                _ => {}//todo
            }
        })
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            greet, 
            generate_nanoid, 
            config::commands::set_language,
            config::commands::set_theme,
            config::commands::set_bookmarks,
            config::commands::set_item,
            config::commands::get_settings,
        ])
        .run(ctx)
        .expect("error while running tauri toolkits application");
}


// target_os
// 键值选项通过目标操作系统设置一次。该值类似于平台目标三元组的第二个和第三个元素。

// 示例值：

// "windows"
// "macos"
// "ios"
// "linux"
// "android"
// "freebsd"
// "dragonfly"
// "openbsd"
// "netbsd"
// "none"（典型的嵌入式目标）