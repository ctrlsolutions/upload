import api from '@/api'
import Cookies from 'js-cookie'
import {
  LoginData,
  SignupData,
  ApiResponse,
  GoogleSignupData,
} from '@/types/AuthInterface'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const login = async (form: LoginData): Promise<ApiResponse> => {
  try {
    await setCSRFToken()
    const response = await api.post<{
      user_id: string
      username: string
    }>('/user/login/', form, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.data.username) {
      sessionStorage.setItem('username', response.data.username)
    }
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('Login failed:', error)
    return {
      success: false,
      error: error.response?.data?.error || 'An unexpected error occurred',
    }
  }
}

export const googleLogin = async (accessToken: string): Promise<void> => {
  await api.post('/user/google/signup/', { access_token: accessToken })
}

export const signupUser = async (
  userData: SignupData,
): Promise<ApiResponse> => {
  try {
    const response = await api.post('/user/signup/', userData, {
      headers: { 'Content-Type': 'application/json', withCredentials: false },
    })
    console.log('Signup response:', response.data)
    return { success: true, data: response.data }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || 'An unexpected error occurred'
    return { success: false, error: errorMessage }
  }
}

export const logout = async () => {
  try {
    await api.post('/user/logout/')
    sessionStorage.removeItem('username')
    return { success: true }
  } catch (error) {
    console.error('Logout failed:', error)
    return { success: false, error: 'Logout failed' }
  }
}

export const googleSignup = async (
  data: GoogleSignupData,
): Promise<ApiResponse> => {
  try {
    const response = await api.post('/user/google/signup/', data)
    return { success: true, data: response.data }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || 'An unexpected error occurred'
    return { success: false, error: errorMessage }
  }
}

export const isAuthenticated = async (): Promise<ApiResponse> => {
  try {
    const username = sessionStorage.getItem('username')
    if (!username) {
      return { success: false, error: 'No username stored' }
    }

    const response = await api.get(`/user/status/?username=${username}`, {
      headers: { 'Content-Type': 'application/json' },
    })

    return { success: true, data: { username: response.data.username } }
  } catch (error: any) {
    return { success: false, error: 'User not authenticated' }
  }
}

async function setCSRFToken() {
  await api.get('/user/csrf', {
    withCredentials: true,
  })
}

export function getCSRFToken() {
  const csrftoken = Cookies.get('csrftoken')
  if (!csrftoken) {
    throw new Error('Missing CSRF cookie.')
  }
  return csrftoken
}
