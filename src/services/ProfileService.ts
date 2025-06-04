import api from '@/api'
import { ApiResponse } from '@/types/CommonInterface'
import { User } from '@/types/CommonInterface'

// USER
export const fetchProfile = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await api.get<User>('/profile/me/')
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error('❌ Error fetching profile:', error.response?.data || error.message)
    const errMsg = error.response?.data?.detail || error.message || 'Unknown error'
    return { success: false, error: errMsg }
  }
}

export const updateProfile = async (profileData: object) => {
  return api.patch(`/profile/update_profile/`, profileData)
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
