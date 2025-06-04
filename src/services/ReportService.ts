import api from '@/api'
import { ApiResponse } from '@/types/CommonInterface'

export const getForms = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/form/')
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('❌ Error fetching forms:', error.response?.data || error.message)
    return { success: false, error: error.response?.data }
  }
}

export const submitReport = async (form: any): Promise<ApiResponse> => {
  try {
    const response = await api.post('/report/', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('❌ Submit report failed:', error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data?.error || 'An unexpected error occurred',
    }
  }
}

export const fetchReports = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/report/')
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('❌ Error fetching reports:', error.response?.data || error.message)
    return { success: false, error: error.response?.data }
  }
}

export const generateReport = async (payload: any): Promise<ApiResponse> => {
  try {
    const response = await api.post('/report/generate/', payload)
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('❌ Generate report failed:', error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data?.error || 'An unexpected error occurred',
    }
  }
}

export const deleteReport = async (reportId: number): Promise<ApiResponse> => {
  try {
    const response = await api.delete(`/report/${reportId}/`)
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('❌ Delete report failed:', error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data?.error || 'An unexpected error occurred',
    }
  }
}
