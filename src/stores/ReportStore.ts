import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { Form } from '@/types/ReportInterface'
import { getForms } from '@/services/ReportService'

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
      const { data } = await getForms()
      console.log('Fetched forms:', data)
      this.forms = data
    },
  },
})
