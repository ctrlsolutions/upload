// src/validators/loginValidator.ts
import { FormState, ErrorState } from '@/types/LoginInterface'

export const validateField = (
  form: FormState,
  field: keyof FormState,
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

export const validateForm = (form: FormState): ErrorState => {
  return {
    email: validateField(form, 'email'),
    password: validateField(form, 'password'),
  }
}
