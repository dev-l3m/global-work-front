// Material Design Icons chargé via CDN dans index.html
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export const vuetify = createVuetify({
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'gwhLight',
    themes: {
      gwhLight: {
        dark: false,
        colors: {
          // Palette basée sur le logo Global Work Hub (dégradé violet -> orange)
          primary: '#6B5AE0', // violet principal
          secondary: '#FF7A3C', // orange du bas du logo
          accent: '#F48FB1',
          surface: '#FFFFFF',
          background: '#F7F4FF',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',
          info: '#5C6BC0',
          success: '#2EC4B6',
          warning: '#FFB703',
          error: '#E63946',
        },
      },
    },
  },
})
