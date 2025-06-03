import api, { handleApiResponse, handleApiError } from '@/api'
import Cookies from 'js-cookie'
import type { LoginPayload, SignupPayload } from '@/types/AuthInterface'
import type { ApiResponse } from '@/types/CommonInterface'
import { useUserStore } from '@/stores/UserStore'

export const signup = async (userData: SignupPayload): Promise<ApiResponse> => {
  try {
    const response = await api.post('/user/', userData, {
      headers: { 'Content-Type': 'application/json', withCredentials: false },
    })
    console.log('Signup response:', response.data)
    return handleApiResponse(response)
  } catch (error: any) {
    return handleApiError(error)
  }
}

export const googleSignup = async (data: SignupPayload): Promise<ApiResponse> => {
  try {
    const response = await api.post('/user/google/signup/', data)
    return { success: true, data: response.data }
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'An unexpected error occurred'
    return { success: false, error: errorMessage }
  }
}

export const login = async (form: LoginPayload): Promise<ApiResponse> => {
  try {
    await setCSRFToken()
    const response = await api.post('/user/login/', form, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.data.success) {
      const userStore = useUserStore()
      userStore.fetchUserProfile()
    }
    return { success: response.data.success, data: response.data.data }
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

// export const isAuthenticated = async (): Promise<ApiResponse> => {
//   try {
//     const username = sessionStorage.getItem('username')
//     if (!username) {
//       return { success: false, error: 'No username stored' }
//     }

//     const response = await api.get(`/user/status/?username=${username}`, {
//       headers: { 'Content-Type': 'application/json' },
//     })

//     return { success: true, data: { username: response.data.username } }
//   } catch (error: any) {
//     return { success: false, error: 'User not authenticated' }
//   }
// }

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
