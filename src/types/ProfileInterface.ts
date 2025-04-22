export interface Department {
  department_id: number
  name: string
}
export interface College {
  college_id: number
  name: string
  departments: Department[]
}
export interface UserProfile {
  profile_picture?: string
  first_name: string
  email: string
  middle_name?: string
  last_name: string
  role: string
  college?: College
  department?: Department
}
export interface ProfileData {
  user: UserProfile
}
