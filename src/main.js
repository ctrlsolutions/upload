import './assets/main.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiCaretDownFill, FcGoogle, BiCalendar, HiInformationCircle, BiBook, BiFileEarmarkMedical } from 'oh-vue-icons/icons'
import vue3GoogleLogin from 'vue3-google-login'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

addIcons(BiCaretDownFill, FcGoogle, BiCalendar, HiInformationCircle, BiBook, BiFileEarmarkMedical)

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})

app.use(router)
app.component('v-icon', OhVueIcon)
app.mount('#app')
