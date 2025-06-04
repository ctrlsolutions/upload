import type { College, Department, Role } from '@/types/ProfileInterface'

export type ApiResponse<T = any> =
  | { success: true; data: T; message?: string }
  | { success: false; error: Record<string, string>; message?: string }

export interface User {
  profile_picture?: string
  id: number
  username: string
  first_name: string
  middle_name: string
  last_name: string
  sex: string
  email: string
  birth_date: string
  role: Role
  college?: College
  department?: Department
}
