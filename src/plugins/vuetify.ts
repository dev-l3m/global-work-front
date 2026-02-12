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
          primary: '#6B5AE0',
          secondary: '#FF7A3C',
          accent: '#F48FB1',
          surface: '#FFFFFF',
          background: '#f0eef8',
          'surface-bright': '#f0eef8',
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
