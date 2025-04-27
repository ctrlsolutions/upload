export interface Field {
  id: number
  label: string
  type: string
  required: boolean
  placeholder: string | null
  options: any[] | null
  regex_validation: string | null
  valid_date_range: any | null
}

export interface Form {
  id: number
  title: string
  description: string | null
  active: boolean
  fields: Field[]
}

export interface ReportTemplate {
  report_type: string
  form: Form
}
