export interface LoginPayload {
  email: string
  password: string
}
export interface SignupPayload {
  email: string
  password: string
  password2: string
  first_name: string
  middle_name?: string
  last_name: string
  sex: string
  birth_date: string
  college?: number | null
  department?: number | null
  access_token?: string | null
}

export interface ErrorState {
  email: string
  password: string
}
