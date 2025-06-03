import { defineStore } from 'pinia'
import type { User, ApiResponse } from '@/types/CommonInterface'
import { fetchProfile, updateProfile, getCollegeDepartments } from '@/services/ProfileService'
import { signup, login, logout } from '@/services/AuthService'
import type { SignupPayload, LoginPayload } from '@/types/AuthInterface'

export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null as User | null,
    loading: false,
    errors: null as Record<string, string> | null,
    message: undefined as string | undefined,
    success: false,
    initialized: false,
  }),
  actions: {
    async signup(credentials: SignupPayload) {
      this.loading = true
      this.errors = null

      const res = await signup(credentials)
      this.success = res.success
      if (!res.success) {
        if (res.error) this.errors = res.error
        this.message = res.message || 'Signup failed.'
      } else {
        this.message = res.message || 'Signed up successfully!'
      }
    },
    async googleSignup() {
      this.loading = true
      this.errors = null

      // const res = await goog
    },
    async login(credentials: LoginPayload) {
      this.loading = true
      this.errors = null

      const res = await login(credentials)
      this.success = res.success
      if (!res.success) {
        if (res.error) this.errors = res.error
        this.message = res.message || 'Login failed.'
      } else {
        this.message = res.message || 'Logged in successfully!'
      }
    },
    async fetchUserProfile() {
      this.loading = true
      this.errors = null

      const res = await fetchProfile()
      this.success = res.success
      if (!res.success) {
        if (res.error) this.errors = res.error
        this.message = res.message || 'Login failed.'
      } else {
        this.message = res.message || 'Logged in successfully!'
      }
    },

    async updateUserProfile(profileData: Partial<User>) {
      this.loading = true

      try {
        const response = await updateProfile(profileData)
        console.log(response.data)
        // Assuming the response includes the updated user profile
        this.profile = response.data.user
      } catch (error: any) {
        throw error // Rethrow so the component can catch it too
      } finally {
        this.loading = false
      }
    },
    setUserProfile(user: User) {
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
    isLoggedIn: state => !!state.profile?.email,
    getErrors: state => (fieldName: string) => {
      return state.errors?.[fieldName] || null
    },
  },
})
