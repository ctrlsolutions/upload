import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Form, Report } from '@/types/ReportInterface'
import { getForms, fetchReports, submitReport, generateReport, deleteReport } from '@/services/ReportService'
import { useUserStore } from '@/stores/UserStore'

export const useReportFormStore = defineStore('report-form', {
  state: () => ({
    forms: [] as Form[],
  }),
  getters: {
    getFormByReportType: state => {
      return (reportType: string) => {
        const template = state.forms.find(t => t.code === reportType)
        return template ? template : null
      }
    },
    firstReport: state => {
      return state.forms.length > 0 ? state.forms[0] : null
    },
    formOptions: state => {
      return state.forms.map(t => ({
        label: t.name,
        value: t.id,
      }))
    },
    getFormById: state => {
      return (formId: string | number) => {
        for (const form of state.forms) {
          if (form.id.toString() === formId.toString()) {
            return form
          }
        }
        return null
      }
    },
  },
  actions: {
    async fetchForms() {
      const res = await getForms()
      if (res.success) this.forms = res.data
    },
  },
})

export const useReportStore = defineStore('report', {
  state: () => ({
    reports: [] as Report[],
    lastSubmittedReport: null as Report | null,
  }),

  getters: {
    getReportByDepartment: state => {
      const userStore = useUserStore()
      return state.reports.filter(
        report => report.department.department_id === userStore.profile?.department?.department_id,
      )
    },
    getReportByCollege: state => {
      const userStore = useUserStore()
      return state.reports.filter(report => report.college.college_id === userStore.profile?.college?.college_id)
    },
    getAllUserReports: state => {
      const userStore = useUserStore()
      const user = userStore.profile
      if (!user) return []

      switch (user.role.name) {
        case 'faculty':
          return state.reports.filter(report => report.user.id === user.id)
        case 'department_head':
          return state.reports.filter(
            report => report.user.id === user.id || report.department.department_id === user.department?.department_id,
          )
        case 'college_dean':
          return state.reports.filter(report => report.college.college_id === user.college?.college_id)
        case 'chancellor':
        case 'admin':
          return state.reports
        default:
          return []
      }
    },
  },

  actions: {
    async fetchReportHistory() {
      try {
        const res = await fetchReports()
        if (res.success && res.data) {
          this.reports = res.data
        } else {
          console.error('Failed to fetch reports:', res.message)
        }
      } catch (err) {
        console.error('Unexpected error fetching reports:', err)
      }
    },

    async submitReport(formData: any) {
      try {
        const res = await submitReport(formData)
        if (res.success && res.data) {
          this.lastSubmittedReport = res.data
          this.reports.unshift(res.data) // Optional: Insert it at the top
        } else {
          console.error('Submit failed:', res.message)
        }
      } catch (err) {
        console.error('Unexpected error submitting report:', err)
      }
    },

    async deleteReport(reportId: number) {
      try {
        const res = await deleteReport(reportId)
        if (res.success) {
          this.reports = this.reports.filter(r => r.id !== reportId)
        } else {
          console.error('Delete failed:', res.error)
        }
      } catch (err) {
        console.error('Unexpected error deleting report:', err)
      }
    },

    async generateReport(payload: any) {
      try {
        const res = await generateReport(payload)
        if (!res.success) {
          console.error('Report generation failed:', res.error)
        }
      } catch (err) {
        console.error('Unexpected error generating report:', err)
      }
    },
  },
})
