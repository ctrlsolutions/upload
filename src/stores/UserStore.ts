import { defineStore } from 'pinia'
import { UserProfile } from '@/types/ProfileInterface'
import { getProfileData } from '@/services/ProfileService'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as UserProfile | null,
    isLoading: false,
    error: null as string | null,
    initialized: false,
  }),
  actions: {
    async fetchUserProfile() {
      this.isLoading = true
      this.error = null
      try {
        const username = sessionStorage.getItem('username')
        const response = await getProfileData(username)
        this.profile = response.data.user
        this.initialized = true
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch profile'
      } finally {
        this.isLoading = false
      }
    },
    setUserProfile(user: UserProfile) {
      this.profile = user
      this.initialized = true
    },
    clearUserProfile() {
      this.profile = null
      this.initialized = false
    },
  },
  getters: {
    getUserProfile: state => state.profile,
    isLoggedIn: state => !!state.profile?.email, // Example getter
  },
})
