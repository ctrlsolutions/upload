import { User } from '@/types/CommonInterface'
import { College, Department } from '@/types/ProfileInterface'

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
  name: string
  code: string
  description: string | null
  active: boolean
  fields: Field[]
}
export interface Report {
  id: number
  title: string
  user: User
  created_on: string
  department: Department
  college: College
}
