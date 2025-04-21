import { LoginData, ErrorState, SignupData } from '@/types/AuthInterface'

export const validateField = (
  form: LoginData | SignupData,
  field: keyof (LoginData & SignupData)
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
  if (field === 'password2' && 'reEnterPassword' in form) {
    if (!form.reEnterPassword) {
      return 'Re-entering the password is required.'
    } else if (form.password !== form.reEnterPassword) {
      return 'Passwords do not match.'
    }
  }
  return ''
}

export const validateForm = (form: LoginData | SignupData): ErrorState => {
  const errors: ErrorState = {
    email: validateField(form, 'email'),
    password: validateField(form, 'password'),
  }

  if ('reEnterPassword' in form) {
    errors.reEnterPassword = validateField(form, 'password2')
  }

  return errors
}


export const validatePasswordMatch = (
  password: string,
  password2: string,
): string | null => {
  return password !== password2 ? 'Passwords do not match.' : null
}
