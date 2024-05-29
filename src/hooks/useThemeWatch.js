import { watch } from 'vue';
import { useTheme } from 'vuetify'

export default function watchTheme(ck) {
    const theme = useTheme()
    watch(theme.global.name, val => {
        ck(val);
      }, { immediate: true }) // immediate 立即执行
}