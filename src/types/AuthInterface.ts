export interface LoginData {
  email: string
  password: string
}

export interface ErrorState {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  password2: string
  first_name: string
  middle_name?: string
  last_name: string
  sex: string
  birth_date: string
  college_id?: number
  department_id?: number
}

export interface ApiResponse {
  success: boolean
  data?: any
  error?: string
}

export interface GoogleSignupData {
  access_token: string
  extra_info: Record<string, any>
}
