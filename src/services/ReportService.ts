import api from '@/api'
import { ApiResponse } from '@/types/AuthInterface'

export const getFormTemplates = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/ft/')
    // console.log(response.data)
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('❌ Error fetching report template data:', error.response?.data || error.message)
    return { success: false, error: error.response?.data }
  }
}

export const submitReport = async (form: any): Promise<ApiResponse> => {
  try {
    const response = await api.post<{
      user_id: string
      username: string
    }>('/report/', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('Submit form failed:', error)
    return {
      success: false,
      error: error.response?.data?.error || 'An unexpected error occurred',
    }
  }
}
