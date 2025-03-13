import axios from 'axios'
import { FormState } from '@/types/AuthInterface'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const login = async (form: FormState): Promise<string> => {
  const response = await axios.post<{ token: string }>(
    `${API_BASE_URL}/user/login/`,
    form,
    { headers: { 'Content-Type': 'application/json' } },
  )
  return response.data.token
}

export const googleLogin = async (accessToken: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/user/google/signup/`, {
    access_token: accessToken,
  })
}
