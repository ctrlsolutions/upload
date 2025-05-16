<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { validatePasswordMatch } from '@/validators/AuthValidators'
import { signupUser, googleSignup } from '@/services/AuthService'
import { SignupData, GoogleSignupData } from '@/types/AuthInterface'
import FormButton from '@/components/Global/BaseFormButton.vue'
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'
import InputField from '@/components/Global/BaseTextInput.vue'
import BaseDateInput from '@/components/Global/BaseDateInput.vue'
import Toast from '@/components/Global/Toast.vue'
import { getCollegeDepartments } from '@/services/ProfileService'
import { College, Department } from '@/types/ProfileInterface'

const userData = ref<SignupData>({
  email: '',
  password: '',
  password2: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  sex: '',
  birth_date: '',
  college: NaN,
  department: NaN,
})

const passwordError = ref<string | null>(null)
const signupSuccess = ref<string>('')
const signupError = ref<string>('')
const toast = ref<InstanceType<typeof Toast> | null>(null)
const accessToken = ref<string | null>(null)
const showModal = ref<boolean>(false)
const googleProfile = ref<Record<string, any> | null>(null)
const collegeOptions = ref<College[]>([])

const submitForm = async () => {
  signupSuccess.value = ''
  signupError.value = ''

  passwordError.value = validatePasswordMatch(userData.value.password, userData.value.password2)
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
      birth_date: '',
      college: NaN,
      department: NaN,
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

onMounted(async () => {
  try {
    const response = await getCollegeDepartments()
    collegeOptions.value = response.data
  } catch (error: any) {
    console.log('ERROR:', error?.value)
  }
})

const filteredDepartments = computed(() => {
  const college = collegeOptions.value.find(c => c.college_id == userData.value.college)
  return college ? college.departments : []
})
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
              <BaseSelectInput v-model="userData.sex" width="100%" class="small-select" label="Sex"
                ><option value="" disabled>Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other / Prefer not to say</option>
              </BaseSelectInput>
            </div>
            <div class="dob-group">
              <label class="label">Date of Birth</label>
              <BaseDateInput v-model="userData.birth_date" width="100%" :min="'2000-01-01'" :max="'2020-12-31'" />
            </div>
          </div>
          <div class="select-group1">
            <div class="select-item1">
              <BaseSelectInput
                v-model="userData.college"
                placeholder="Select College"
                width="100%"
                class="small-select"
                label="College"
              >
                <option value="" disabled>Select</option>
                <option v-for="college in collegeOptions" :key="college.college_id" :value="college.college_id">
                  {{ college.name }}
                </option>
              </BaseSelectInput>
            </div>
            <div class="select-item">
              <BaseSelectInput
                v-model="userData.department"
                placeholder="Select Department"
                width="100%"
                class="small-select"
                :disabled="!userData.college"
                label="Department"
              >
                <option value="" disabled>Select</option>
                <option v-for="dept in filteredDepartments" :key="dept.department_id" :value="dept.department_id">
                  {{ dept.name }}
                </option>
              </BaseSelectInput>
            </div>
          </div>
          <p v-if="signupSuccess" class="text-green-600 text-sm mt-2">
            {{ signupSuccess }}
          </p>
        </div>
      </div>
      <div class="button-group">
        <FormButton variant="black" width="12rem">CANCEL</FormButton>
        <FormButton variant="red" width="12rem" type="submit">SUBMIT</FormButton>
      </div>
    </form>
    <p class="or-text">OR</p>
    <GoogleLogin :callback="googleSignUp" popup-type="TOKEN">
      <FormButton variant="red" width="25rem" type="button">
        <v-icon name="fc-google" scale="1.2"></v-icon>
        CONTINUE WITH GOOGLE</FormButton
      >
    </GoogleLogin>
  </div>
  <ExtraInfoModal v-if="showModal" :profile="googleProfile" @submit="submitToBackend" @close="showModal = false" />
  <Toast ref="toast" />
</template>

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

.dob-sex-group {
  display: flex;
  align-items: center;
}

.select-group,
.dob-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.select-group {
  display: flex;
  align-items: flex-start;
}

.select-group1 {
  display: flex;
  gap: 0.7rem;
  margin-bottom: 0.5rem;
}

.select-item1 {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 50%;
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
  font-size: small;
  font-weight: bold;
  color: #6f6f6f;
  display: block;
  text-align: left;
  margin-bottom: 0.3rem;
}

.label1 {
  font-size: small;
  font-weight: bold;
  color: #6f6f6f;
  display: block;
  text-align: left;
  margin-bottom: 0.3rem;
  margin-left: 0.7rem;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
