import axios from 'axios'
import { getCSRFToken } from '@/services/AuthService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use(config => {
  if (config.method !== 'get') {
    const csrftoken = getCSRFToken()
    if (csrftoken) {
      config.headers['X-CSRFToken'] = csrftoken
    }
  }
  return config
})

export default api
