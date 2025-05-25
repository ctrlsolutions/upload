import './assets/main.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  BiCaretDownFill,
  FcGoogle,
  BiCalendar,
  IoPeople,
  FaClipboardList,
  IoPerson,
  FaSignOutAlt,
  MdAdminpanelsettingsRound,
  RiArrowUpSFill,
  BiGearFill,
  FaHistory,
  FaFolderOpen,
  MdSpacedashboardRound,
  FaInfoCircle,
  BiFileEarmarkMedicalFill,
  BiFileEarmarkExcelFill,
} from 'oh-vue-icons/icons'
import vue3GoogleLogin from 'vue3-google-login'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

addIcons(
  BiCaretDownFill,
  FcGoogle,
  BiCalendar,
  RiArrowUpSFill,
  IoPeople,
  IoPerson,
  FaHistory,
  FaSignOutAlt,
  MdAdminpanelsettingsRound,
  FaFolderOpen,
  BiGearFill,
  FaClipboardList,
  MdSpacedashboardRound,
  FaInfoCircle,
  BiFileEarmarkMedicalFill,
  BiFileEarmarkExcelFill,
)

const pinia = createPinia()
const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})

app.use(pinia)
app.use(router)
app.component('v-icon', OhVueIcon)
app.mount('#app')
