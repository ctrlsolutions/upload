import api, { handleApiResponse, handleApiError } from '@/api'
import { ApiResponse } from '@/types/CommonInterface'
import { User } from '@/types/CommonInterface'

// USER
export const fetchProfile = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/profile/me/')
    return handleApiResponse(response)
  } catch (error: any) {
    return handleApiError(error)
  }
}

// COLLEGE & DEPARTMENT
export const getCollegeDepartments = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/cd/get_college_departments/')
    console.log(response.data)
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('❌ Error fetching dashboard data:', error.response?.data || error.message)
    return { success: false, error: error.response?.data }
  }
}
