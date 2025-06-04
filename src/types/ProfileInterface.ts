import type { User } from '@/types/CommonInterface'

export interface Department {
  department_id: number
  name: string
}
export interface College {
  college_id: number
  name: string
  departments: Department[]
}
export interface Role {
  id: string
  code: string
  name: string
}
export interface FetchProfileResponse {
  user: User
}
