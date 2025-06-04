import axios, { AxiosError, AxiosResponse } from 'axios'
import type { ApiResponse } from '@/types/CommonInterface'
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

export const handleApiResponse = <T>(response: AxiosResponse<ApiResponse<T>>): ApiResponse<T> => {
  return response.data
}

export const handleApiError = (error: AxiosError<ApiResponse>): ApiResponse => {
  if (error.response?.data) {
    return error.response.data
  }
  return {
    success: false,
    error: { non_field_error: 'Network error. Please try again.' },
    message: 'Could not connect to the server. Check your internet.',
  }
}

export default api
