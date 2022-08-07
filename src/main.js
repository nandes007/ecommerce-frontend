import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import VueSplide from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'
import './index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueSplide)
app.mount('#app')
