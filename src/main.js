import { createApp, ref } from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import { TOOL_MENUS, TOOL_BOOKMARKS } from '@/config/router';
import i18n from '@/locale/core/i18n'
import globalUtilsPlugin from '@/plugins/globalUtilsPlugin'

loadFonts()

const app = createApp(App)
app.config.globalProperties.$tool_menus = ref(TOOL_MENUS);
app.config.globalProperties.$tool_bookmarks = ref(TOOL_BOOKMARKS);

app.use(i18n).use(vuetify).use(globalUtilsPlugin).mount('#app')
