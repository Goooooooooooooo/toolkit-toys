import { createI18n } from 'vue-i18n'
import zhHans from '../lang/zh-Hans';   // 导入简体中文语言
import en from '../lang/en';            // 导入English语言
import ja from '../lang/ja';            // 导入日语

const languages = {
    'zh': zhHans,
    'en': en,
    'ja': ja
}

const i18n = createI18n({
    datetimeFormats: {},
    numberFormats: {},
    // allowComposition: true,  // to use with Composition API
    legacy: false,           // so that VueI18n still works with Options API
    globalInjection: true,   // to inject in the component
    locale: 'zh-Hans', // 默认中文
    messages: languages,
    fallbackLocale: 'en', // 没有中文的时候，默认使用英文
    silentTranslationWarn: true, //是否显示警告
    silentFallbackWarn: true, //是否显示回退警告
})

export default i18n