import { LoginData, ErrorState } from '@/types/AuthInterface'

export const validateField = (
  form: LoginData,
  field: keyof LoginData,
): string => {
  if (field === 'email') {
    if (!form.email) {
      return 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Invalid email format.'
    }
  }
  if (field === 'password') {
    if (!form.password) {
      return 'Password is required.'
    } else if (form.password.length < 6) {
      return 'Password must be at least 6 characters.'
    }
  }
  return ''
}

export const validateForm = (form: LoginData): ErrorState => {
  return {
    email: validateField(form, 'email'),
    password: validateField(form, 'password'),
  }
}

export const validatePasswordMatch = (
  password: string,
  password2: string,
): string | null => {
  return password !== password2 ? 'Passwords do not match.' : null
}
