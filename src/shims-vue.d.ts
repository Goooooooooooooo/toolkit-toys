declare module '*.vue' {
    import {defineComponent} from 'vue';
    export default defineComponent;
}
// Note: ts 文件导入 vue 组件报错回避
// Cannot find module '../components/xxxxx.vue' or its corresponding type declarations.