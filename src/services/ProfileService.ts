import api from '@/api'
import { ApiResponse } from '@/types/AuthInterface'
import { ProfileData } from '@/types/ProfileInterface'

export const getProfileData = async (
  username: string | null,
): Promise<ApiResponse> => {
  try {
    const response = await api.get<ProfileData>('/profile/get_data/')
    console.log('✅ Dashboard Data:', response.data)
    return { success: true, data: response.data }
  } catch (error: any) {
    console.error(
      '❌ Error fetching dashboard data:',
      error.response?.data || error.message,
    )
    return { success: false, error: error.response?.data }
  }
}

export const updateProfile = async (profileData: object) => {
  return api.patch(`/profile/update_profile/`, profileData)
}
