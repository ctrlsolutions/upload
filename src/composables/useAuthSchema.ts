import * as yup from 'yup'

const capitalizeWords = (str: string) =>
  str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

export const getSignupSchema = () =>
  yup.object({
    email: yup
      .string()
      .when('access_token', {
        is: (val: string | null) => !val,
        then: schema => schema.required('Your email is required.'),
        otherwise: schema => schema.notRequired(),
      })
      .email('Please enter a valid email.')
      .test('is-up-email', 'Please use your UP email address.', function (value) {
        if (!value) return true
        if (!value.includes('@')) return true
        return /^[\w.+-]+@up\.edu\.ph$/.test(value)
      }),
    password: yup
      .string()
      .required('Entering a password is required.')
      .min(8, 'Your password must be at least 8 characters long.')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .matches(/\d/, 'Password must contain at least one number.')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.'), // TODO: VERIFY IF NEEDED
    password2: yup
      .string()
      .required('Retype your password.')
      .oneOf([yup.ref('password')], 'Password does not match.'),
    first_name: yup
      .string()
      .when('access_token', {
        is: (val: string | null) => !val,
        then: schema => schema.required('Your first name is required.'),
        otherwise: schema => schema.notRequired(),
      })
      .transform(capitalizeWords),
    middle_name: yup.string().transform(capitalizeWords).optional(),
    last_name: yup
      .string()
      .when('access_token', {
        is: (val: string | null) => !val,
        then: schema => schema.required('Your last name is required.'),
        otherwise: schema => schema.notRequired(),
      })
      .transform(capitalizeWords),
    sex: yup.string().required('Please choose a valid sex.'),
    birth_date: yup.string().required('Your birthdate is required.'),
    college: yup.number().nullable().required('Please choose your college.'),
    department: yup.number().nullable().required('Please choose your department.'),
    terms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions.'),
  })

  export const getLoginSchema = () =>
    yup.object({
      email: yup
        .string()
        .required('Your email is required.')
        .email('Please enter a valid email.')
        .test('is-up-email', 'Please use your UP email address.', function (value) {
          if (!value) {
            return true;
          }
          return /^[\w.+-]+@up\.edu\.ph$/.test(value);
      }),
    password: yup
      .string()
      .required('Entering a password is required.'), // Password is always required for standard login
    })