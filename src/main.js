import './assets/main.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiCaretDownFill, FcGoogle, BiCalendar} from 'oh-vue-icons/icons'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

addIcons(BiCaretDownFill, FcGoogle, BiCalendar)


const app = createApp(App)

app.use(router)
app.component('v-icon', OhVueIcon)
app.mount('#app')