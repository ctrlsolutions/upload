import axios from 'axios'
import {
  FormState,
  SignupData,
  ApiResponse,
  GoogleSignupData,
} from '@/types/AuthInterface'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const login = async (form: FormState): Promise<{ token: string; user_id: number }> => {
  const response = await axios.post<{ token: string; user_id: number }>(
    `${API_BASE_URL}/user/login/`,
    form,
    { headers: { 'Content-Type': 'application/json' } },
  )
  return response.data 
}


export const googleLogin = async (accessToken: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/user/google/signup/`, {
    access_token: accessToken,
  })
}

export const signupUser = async (
  userData: SignupData,
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/signup/`,
      userData,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )

    return { success: true, data: response.data }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || 'An unexpected error occurred'
    return { success: false, error: errorMessage }
  }
}

export const googleSignup = async (
  data: GoogleSignupData,
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/google/signup/`,
      data,
    )
    return { success: true, data: response.data }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || 'An unexpected error occurred'
    return { success: false, error: errorMessage }
  }
}

}
