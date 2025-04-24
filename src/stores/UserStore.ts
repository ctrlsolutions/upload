import { defineStore } from 'pinia'
import { UserProfile } from '@/types/ProfileInterface'
import { getProfileData } from '@/services/ProfileService'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as UserProfile | null,
    isLoading: false,
    error: null as string | null,
  }),
  //   actions: {
  //     async fetchUserProfile() {
  //       this.isLoading = true
  //       this.error = null
  //       try {
  //         const response = await getUser; // Calling the service
  //         this.profile = response.data as UserProfile;
  //       } catch (error: any) {
  //         this.error = error.message || 'Failed to fetch profile';
  //       } finally {
  //         this.isLoading = false;
  //       }
  //     },
  //     },
  //     clearUserProfile() {
  //       this.profile = null
  //     },
  //     // Add actions to update the profile if needed
  //   },
  getters: {
    getUserProfile: state => state.profile,
    isLoggedIn: state => !!state.profile?.email, // Example getter
  },
})
