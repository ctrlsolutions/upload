import { defineStore } from 'pinia'
import type { ApiResponse } from '@/types/CommonInterface'
import type { College } from '@/types/ProfileInterface'
import { getCollegeDepartments } from '@/services/ProfileService'

let socket: WebSocket | null = null

export const useUniversityStore = defineStore('university', {
  state: () => ({
    colleges: [] as College[],
  }),

  getters: {
    allDepartments: state =>
      state.colleges.flatMap(college => college.departments.map(dept => ({ ...dept, college: college.name }))),
    getDepartmentsByCollege: state => {
      return (collegeId: number) => {
        const college = state.colleges.find(c => c.college_id === collegeId)
        return college?.departments ?? []
      }
    },
  },

  actions: {
    async fetchColleges() {
      const res = await getCollegeDepartments()
      this.colleges = await res.data
    },
    setupWebSocket() {
      if (socket) return // prevent multiple connections

      socket = new WebSocket('ws://localhost:8000/ws/college/')

      socket.onopen = () => {
        console.log('✅ WebSocket connected')
      }

      socket.onmessage = (event: MessageEvent) => {
        const message = JSON.parse(event.data)
        if (message.type === 'college_added') {
          console.log('🎓 New college added:', message.data)

          // Option A: re-fetch the whole list
          this.fetchColleges()

          // OR Option B: add the new college directly (if safe to do so)
          // this.colleges.push(message.data)
        }
      }

      socket.onclose = () => {
        console.log('❌ WebSocket disconnected')
        socket = null
      }

      socket.onerror = error => {
        console.error('WebSocket error:', error)
      }
    },

    closeWebSocket() {
      if (socket) {
        socket.close()
        socket = null
      }
    },
  },
})
