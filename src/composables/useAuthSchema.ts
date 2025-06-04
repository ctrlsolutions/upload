import * as yup from 'yup'

const capitalizeWords = (str: string) =>
  str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

export const getSignupSchema = () =>
  yup.object({
    email: yup
      .string()
      .required('Your email is required.')
      .email('Please enter a valid email.')
      .test('is-up-email', 'Please use your UP email address.', value => {
        if (!value) return false
        const email = value.trim().toLowerCase()
        if (!email.includes('@')) return true
        return email.endsWith('@up.edu.ph')
      }),
    password: yup
      .string()
      .required('Entering a password is required.')
      .min(8, 'Your password must be at least 8 characters long.')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .matches(/\d/, 'Password must contain at least one number.')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.'),
    password2: yup
      .string()
      .required('Retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match.'),
    first_name: yup.string().required('Your first name is required.').transform(capitalizeWords),
    middle_name: yup.string().transform(capitalizeWords).optional(),
    last_name: yup.string().required('Your last name is required.').transform(capitalizeWords),
    sex: yup.string().required('Please choose a valid sex.'),
    birth_date: yup.string().required('Your birthdate is required.'),
    college: yup.number().nullable().required('Please choose your college.'),
    department: yup.number().nullable().required('Please choose your department.'),
    terms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions.'),
  })

export const getExtraInfoSchema = () =>
  yup.object({
    middle_name: yup.string().transform(capitalizeWords).optional(),
    sex: yup.string().required('Please choose a valid sex.'),
    birth_date: yup.string().required('Your birthdate is required.'),
    college: yup.number().nullable().required('Please choose your college.'),
    department: yup.number().nullable().required('Please choose your department.'),
    password: yup
      .string()
      .required('Entering a password is required.')
      .min(8, 'Your password must be at least 8 characters long.')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .matches(/\d/, 'Password must contain at least one number.')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.'),
    password2: yup
      .string()
      .required('Retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match.'),
  })

export const getLoginSchema = () =>
  yup.object({
    email: yup
      .string()
      .required('Your email is required.')
      .email('Please enter a valid email.')
      .test('is-up-email', 'Please use your UP email address.', function (value) {
        if (!value) {
          return true
        }
        return /^[\w.+-]+@up\.edu\.ph$/.test(value)
      }),
    password: yup.string().required('Entering a password is required.'),
  })
