import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import { router } from '@/router'
import { vuetify } from '@/plugins/vuetify'
import { vScrollAnimation } from '@/directives/scrollAnimation'
import '@/styles/animations.css'

const app = createApp(App)

app.directive('scroll-animation', vScrollAnimation)

app.use(createPinia()).use(router).use(vuetify).mount('#app')
