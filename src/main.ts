import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import { useAuthStore } from '@/stores/auth'
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

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(vuetify)

// Init auth from storage after Pinia is installed (do not call initAuth in router)
const authStore = useAuthStore(pinia)
authStore.initAuth()

app.mount('#app')
