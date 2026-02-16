import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import { router } from '@/router'
import { vuetify } from '@/plugins/vuetify'
import { vReveal } from '@/directives/reveal'
import { vScrollAnimation } from '@/directives/scrollAnimation'
import '@/style.css'
import '@/styles/animations.css'
import '@/styles/reveal.css'

const app = createApp(App)

app.directive('reveal', vReveal)
app.directive('scroll-animation', vScrollAnimation)

app.use(createPinia()).use(router).use(vuetify).mount('#app')
