import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { ReportTemplate } from '@/types/ReportInterface'
import { getFormTemplates } from '@/services/ReportService'

export const useReportTemplatesStore = defineStore('report-templates', {
  state: () => ({
    reportTemplates: [] as ReportTemplate[],
  }),
  getters: {
    getFormByReportType: state => {
      return (reportType: string) => {
        const template = state.reportTemplates.find(t => t.report_type === reportType)
        return template ? template.form : null
      }
    },
    firstReport: state => {
      return state.reportTemplates.length > 0 ? state.reportTemplates[0].form : null
    },
    formOptions: state => {
      return state.reportTemplates.map(t => ({
        label: t.form.title,
        value: t.form.id,
      }))
    },
    getFormById: state => {
      return (formId: string | number) => {
        for (const template of state.reportTemplates) {
          if (template.form.id.toString() === formId.toString()) {
            return template.form
          }
        }
        return null
      }
    },
  },
  actions: {
    async fetchTemplates() {
      const { data } = await getFormTemplates()
      console.log('Fetched templates:', data)
      this.reportTemplates = data
    },
  },
})
