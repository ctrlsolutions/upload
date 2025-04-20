<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { validatePasswordMatch } from '@/validators/AuthValidators'
import { signupUser, googleSignup } from '@/services/AuthService'
import { SignupData, GoogleSignupData } from '@/types/AuthInterface'
import FormButton from '@/components/Global/BaseFormButton.vue'
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'
import InputField from '@/components/Global/BaseTextInput.vue'
import BaseDateInput from '@/components/Global/BaseDateInput.vue'
import Toast from '@/components/Global/Toast.vue'

const userData = ref<SignupData>({
  email: '',
  password: '',
  password2: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  sex: '',
  birthdate: '',
  college: '',
  dept: '',
  role: '',
})

const sexOptions = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
]

const collegeOptions = [
  { value: 'cos', label: 'College of Science' },
  { value: 'css', label: 'College of Social Science' },
  { value: 'som', label: 'School of Management' },
  { value: 'ccad', label: 'College of Communication, Arts, and Design' },
]

const departmentMap = {
  cos: [
    { value: 'cs', label: 'Computer Science' },
    { value: 'math', label: 'Mathematics' },
    { value: 'bio', label: 'Biology' },
    { value: 'sts', label: 'Statistics' },
  ],
  css: [
    { value: 'psy', label: 'Psychology' },
    { value: 'com', label: 'Communication' },
  ],
  som: [
    { value: 'mktg', label: 'Marketing' },
  ],
  ccad: [
    { value: 'art', label: 'Arts' },
    { value: 'design', label: 'Design' },
  ],
} as const

type CollegeKeys = keyof typeof departmentMap;

const filteredDepartmentOptions = computed(() => {
  return userData.value.college
    ? departmentMap[userData.value.college as CollegeKeys] || []
    : [];
});

watch(
  () => userData.value.college,
  (newCollege) => {
    if (newCollege !== userData.value.college) {
      userData.value.dept = '';
    }
  }
);

const passwordError = ref<string | null>(null)
const signupSuccess = ref<string>('')
const signupError = ref<string>('')
const toast = ref<InstanceType<typeof Toast> | null>(null)
const accessToken = ref<string | null>(null)
const showModal = ref<boolean>(false)
const googleProfile = ref<Record<string, any> | null>(null)

const submitForm = async () => {
  signupSuccess.value = ''
  signupError.value = ''

  passwordError.value = validatePasswordMatch(
    userData.value.password,
    userData.value.password2,
  )
  if (passwordError.value) return

  const response = await signupUser(userData.value)
  if (response.success) {
    toast.value?.showToast('Signup successful!', 'success')
    userData.value = {
      email: '',
      password: '',
      password2: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      sex: '',
      birthdate: '',
      college: '',
      dept: '',
      role: '',
    }

    setTimeout(() => (window.location.href = '/login'), 2000)
  } else {
    toast.value?.showToast(`Error submitting form: ${response.error}`, 'error')
  }
}

const googleSignUp = (response: any) => {
  console.log('GOOGLE LOGIN RESPONSE', response)
  accessToken.value = response.access_token
  showModal.value = true
}

const submitToBackend = async (extraInfo: Record<string, any>) => {
  if (!accessToken.value) return

  const googleData: GoogleSignupData = {
    access_token: accessToken.value,
    extra_info: extraInfo,
  }

  const response = await googleSignup(googleData)
  if (response.success) {
    toast.value?.showToast('Google Signup successful!', 'success')
    showModal.value = false
  } else {
    toast.value?.showToast(`Error submitting form: ${response.error}`, 'error')
  }
}
</script>

<template>
  <div class="container">
    <form class="signup-container" @submit.prevent="submitForm">
      <h1 class="title">Sign up</h1>
      <p class="subtitle">New here? Create a new account below.</p>
      <div class="form-wrapper">
        <div class="signup-form">
          <InputField
            id="email"
            type="text"
            placeholder="Email"
            variant="red"
            width="100%"
            autocomplete="email"
            v-model="userData.email"
          />
          <InputField
            id="password"
            type="password"
            placeholder="Password"
            variant="red"
            width="100%"
            autocomplete="current-password"
            v-model="userData.password"
          />
          <InputField
            id="re-password"
            type="password"
            placeholder="Re-enter password"
            variant="red"
            width="100%"
            v-model="userData.password2"
          />
          <div class="separator"></div>
          <div class="name-fields">
            <InputField
              id="first-name"
              type="text"
              placeholder="First name"
              variant="red"
              width="100%"
              v-model="userData.first_name"
            />
            <InputField
              id="middle-name"
              type="text"
              placeholder="Middle name"
              variant="red"
              width="100%"
              v-model="userData.middle_name"
            />
          </div>
          <InputField
            id="last-name"
            type="text"
            placeholder="Last name"
            variant="red"
            width="100%"
            v-model="userData.last_name"
          />
          <div class="dob-sex-group">
            <div class="select-group">
              <BaseSelectInput
                v-model="userData.sex"
                :options="sexOptions"
                placeholder="Sex"
                width="100%"
                class="small-select"
              />
            </div>
            <div class="dob-group">
              <label class="label">Date of Birth</label>
              <BaseDateInput
                v-model="userData.birthdate"
                width="11rem"
                :min="'2000-01-01'"
                :max="'2020-12-31'"
              />
            </div>
          </div>
          <div class="select-group1">
            <div class="select-item1">
              <BaseSelectInput
                v-model="userData.college"
                :options="collegeOptions"
                placeholder="College"
                width="100%"
                class="small-select"
              />
            </div>
            <div class="select-item">
            <BaseSelectInput
              v-model="userData.dept"
              :options="filteredDepartmentOptions"
              placeholder="Department"
              width="100%"
              class="small-select"
              :disabled="!userData.college"
            />
          </div>
          </div>
          <p v-if="signupSuccess" class="text-green-600 text-sm mt-2">
            {{ signupSuccess }}
          </p>
        </div>
      </div>
      <div class="button-group">
        <BaseFormButton variant="black" width="12rem" type="button" @click="resetForm">RESET</BaseFormButton>
        <BaseFormButton variant="red" width="12rem" type="submit">SUBMIT</BaseFormButton>
      </div>
    </form>
    <p class="or-text">OR</p>
    <GoogleLogin :callback="googleSignUp" popup-type="TOKEN">
      <BaseFormButton variant="red" width="25rem" type="button">
        <v-icon name="fc-google" scale="1.2"></v-icon>
        CONTINUE WITH GOOGLE</BaseFormButton
      >
    </GoogleLogin>
  </div>
  <ExtraInfoModal
    v-if="showModal"
    :profile="googleProfile"
    @submit="submitToBackend"
    @close="showModal = false"
  />
  <Toast ref="toast" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { validatePasswordMatch } from '@/validators/AuthValidators'
import { signupUser, googleSignup } from '@/services/AuthService'
import { SignupData, GoogleSignupData } from '@/types/AuthInterface'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import FormRadio from '@/components/Global/BaseFormRadio.vue'
import InputField from '@/components/Global/BaseTextInput.vue'
import BaseDateInput from '@/components/Global/BaseDateInput.vue'
import Toast from '@/components/Global/Toast.vue'

const userData = ref<SignupData>({
  email: '',
  password: '',
  password2: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  sex: '',
  birthdate: '',
})

const passwordError = ref<string | null>(null)
const signupSuccess = ref<string>('')
const signupError = ref<string>('')
const toast = ref<InstanceType<typeof Toast> | null>(null)
const accessToken = ref<string | null>(null)
const showModal = ref<boolean>(false)
const googleProfile = ref<Record<string, any> | null>(null)

const submitForm = async () => {
  signupSuccess.value = ''
  signupError.value = ''

  passwordError.value = validatePasswordMatch(
    userData.value.password,
    userData.value.password2,
  )
  if (passwordError.value) return

  const response = await signupUser(userData.value)
  if (response.success) {
    toast.value?.showToast('Signup successful!', 'success')
    userData.value = {
      email: '',
      password: '',
      password2: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      sex: '',
      birthdate: '',
    }

    setTimeout(() => (window.location.href = '/login'), 2000)
  } else {
    toast.value?.showToast(`Error submitting form: ${response.error}`, 'error')
  }
}

const googleSignUp = (response: any) => {
  console.log('GOOGLE LOGIN RESPONSE', response)
  accessToken.value = response.access_token
  showModal.value = true
}

const submitToBackend = async (extraInfo: Record<string, any>) => {
  if (!accessToken.value) return

  const googleData: GoogleSignupData = {
    access_token: accessToken.value,
    extra_info: extraInfo,
  }

  const response = await googleSignup(googleData)
  if (response.success) {
    toast.value?.showToast('Google Signup successful!', 'success')
    showModal.value = false
  } else {
    toast.value?.showToast(`Error submitting form: ${response.error}`, 'error')
  }
}

const resetForm = () => {
  userData.value.email = '';
  userData.value.password = '';
  userData.value.password2 = '';
  userData.value.first_name = '';
  userData.value.middle_name = '';
  userData.value.last_name = '';
  userData.value.sex = '';
  userData.value.birthdate = '';
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 25rem;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.text-red-600 {
  color: $red;
  margin-bottom: -1rem;
  margin-top: -0.5rem;
  margin-right: 2rem;
}
.BaseDateInput {
  margin-left: 100rem;
}

.dob-sex-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
}

.dob-group,
.select-group {
  flex: 1;
}

.label,
.label1 {
  display: block;
  margin-bottom: 0.5rem;
  font-size: small;
  text-align: left;
}

.select-group {
  display: flex;
  align-items: center;
  gap: 0.1rem;
}

.select-group1 {
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0;
  margin-bottom: 0.5rem;
}

.select-item1 {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.small-select {
  font-size: 0.6rem;
  color: gray;
}

.signup-container {
  max-width: 25rem;
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: -0.5rem 0rem;
}

.form-wrapper {
  max-height: 19.5rem;
  overflow-y: auto;
  padding-right: 1rem;
  margin-bottom: -2rem;
  margin-top: 2rem;
}

.cont-google {
  width: 100%;
}

.google {
  padding-left: 1.3rem;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  align-items: flex-end;

  @include sm {
    padding-left: 0.8rem;
    font-size: 0.8em;
  }

  @include md {
    padding-left: 1rem;
    font-size: 0.9em;
  }

  @include lg {
    padding-left: 1.3rem;
    font-size: 1em;
  }
}

.form-wrapper::-webkit-scrollbar {
  width: 0.5rem;
}

.form-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.form-wrapper::-webkit-scrollbar-thumb {
  background: rgba($red, 0.5);
  border-radius: 1rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 0.5rem;
}

.label {
  margin: 0;
  font-weight: bold;
  color: #6f6f6f;
}

.label1 {
  text-align: left;
  margin: 0.5rem 1rem;
  color: #6f6f6f;
  font-weight: bold;
}

.separator {
  align-self: center;
  width: 95%;
  height: 0.1rem;
  background-color: $red;
  margin: 0.5rem 0;
  opacity: 80%;
}

.name-fields {
  display: flex;
  gap: 0.5rem;
}

.dob-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -1rem 0;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  position: sticky;
  bottom: 0;
  background: white;
  padding: -1rem 0;
}

.or-text {
  margin: -0.2rem 0;
  font-weight: bold;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}

.subtitle {
  font-weight: 800;
  color: #6f6f6f;
}
</style>
