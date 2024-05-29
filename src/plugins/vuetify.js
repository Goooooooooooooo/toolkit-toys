// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

// theme colors
import { themes } from '@/config/theme'

  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    options: { variations: true },
    variations: {
      colors: ['primary', 'secondary', 'surface'],
      lighten: 3,
      darken: 4,
    },
    themes: themes
  }
})
