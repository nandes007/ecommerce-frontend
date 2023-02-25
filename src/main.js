import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import VueSplide from '@splidejs/vue-splide'
import vSelect from 'vue-select'
import '@splidejs/vue-splide/css'
import './index.css'
import 'vue-select/dist/vue-select.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueSplide)
app.component('v-select', vSelect)
app.mount('#app')
