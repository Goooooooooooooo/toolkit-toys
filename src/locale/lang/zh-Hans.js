import zhHans from 'vuetify/lib/locale/zh-Hans';  // 导入Vuetify 自带的简体中文语言包

export default {
  // 展开 简体中文语言包的所有项目
  ...zhHans,   
  label: '简体中文',
  // page login
  login: '登录',
  register: '注册',
  username: '用户名',
  password: '密码',
  login_account: '登录帐户',
  // menu
  menu: {
    home: '首页',
    dashboard: '仪表盘',
    Formatters: '格式化工具',
    formatters: '格式化工具',
    "All Tools": '全部工具',
    AllTools: '全部工具',
    Calendar: '日历',
    Generators: '生成类工具',
    Converters: '转换类工具',
    'Password Note': '密码笔记',
    'Password Generator': '密码生成器',
    Nanoid: '识别码生成器(Naoid)',
    Timestamp: '时间戳转换',
    'Cron Expression': 'Cron表达式',
    JSON: 'JSON 格式化',
    SQL: 'SQL 格式化',
    'JSON <> YAML': 'JSON YAML 互转',
    Todos: '待办事项'
  },
  DELETE: '删除',
  delete: '删除',
  Delete: '删除',
  Close: '关闭',
  Save: '保存',
  Copy: '复制',
  Formatter: '格式化',
  'JSON Formatter': 'JSON 格式化',
  'SQL Formatter': 'SQL 格式化',
  Configuration: '配置',
  'Cron Expression': 'Cron表达式',
  Settings: '设置',
  Theme: '主题',
  Language: '语言',
  'Language settings': '语言 设置',
  'Theme settings': '主题 设置',
  Todos: '待办事项'
}