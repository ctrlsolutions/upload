<template>
  <div class="signup-container">
    <header class="title-part">
      <h1 class="title">Sign up</h1>
      <p class="subtitle">New here? Create a new account below.</p>
    </header>
    <Form @submit.prevent="submitForm" :validation-schema="signupSchema" v-slot="{ errors }" class="form-wrapper">
      <div class="fields">
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          variant="red"
          width="100%"
          autocomplete="email"
          v-model="form.email"
        />
        <InputField
          name="password"
          type="password"
          placeholder="Password"
          variant="red"
          width="100%"
          autocomplete="current-password"
          v-model="form.password"
        />
        <InputField
          name="password2"
          type="password"
          placeholder="Re-enter password"
          variant="red"
          width="100%"
          v-model="form.password2"
        />
        <div class="separator"></div>
        <div class="name-fields">
          <InputField
            name="first_name"
            type="text"
            placeholder="First name"
            variant="red"
            width="100%"
            v-model="form.first_name"
          />
          <InputField
            name="last_name"
            type="text"
            placeholder="Last name"
            variant="red"
            width="100%"
            v-model="form.last_name"
          />
        </div>
        <div class="demographic-fields">
          <InputField
            name="middle_name"
            type="text"
            placeholder="Middle name"
            variant="red"
            width="100%"
            v-model="form.middle_name"
          />
          <BaseSelectInput v-model="form.sex" width="100%" class="small-select" label="Sex"
            ><option value="" disabled>Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other / Prefer not to say</option>
          </BaseSelectInput>
          <BaseDateInput v-model="form.birth_date" width="100%" :max="maxDate" label="Date of Birth" />
        </div>
        <div class="university-fields">
          <div class="select-item1">
            <BaseSelectInput
              v-model="form.college"
              placeholder="Select College"
              width="100%"
              class="small-select"
              label="College"
            >
              <option value="" disabled>Select</option>
              <option v-for="college in universityStore.colleges" :key="college.college_id" :value="college.college_id">
                {{ college.name }}
              </option>
            </BaseSelectInput>
          </div>
          <div class="select-item">
            <BaseSelectInput
              v-model="form.department"
              placeholder="Select Department"
              width="100%"
              class="small-select"
              :disabled="!form.college"
              label="Department"
            >
              <option value="" disabled>Select</option>
              <option
                v-for="dept in universityStore.getDepartmentsByCollege(Number(form.college))"
                :key="dept.department_id"
                :value="Number(dept.department_id)"
              >
                {{ dept.name }}
              </option>
            </BaseSelectInput>
          </div>
        </div>
      </div>
      <div class="button-group">
        <FormButton variant="black" width="100%">CANCEL</FormButton>
        <FormButton variant="red" width="100%" type="submit">SUBMIT</FormButton>
      </div>
    </Form>
    <div class="google-buttons">
      <p class="or-text">OR</p>
      <GoogleLogin :callback="googleSignUp" popupType="TOKEN" class="google">
        <FormButton variant="red" width="100%" type="button" class="google-button">
          <v-icon name="fc-google" scale="1"></v-icon>
          CONTINUE WITH GOOGLE
        </FormButton>
      </GoogleLogin>
    </div>
  </div>
  <ExtraInfoModal
    v-if="showModal"
    :profile="googleProfile"
    @submit="submitToBackend"
    @close="showModal = false"
    class="info-modal"
  />
  <Toast ref="toast" />
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { googleSignup } from '@/services/AuthService'
import { SignupPayload } from '@/types/AuthInterface'
import { FormButton, BaseSelectInput, InputField, BaseDateInput, Toast } from '@/components/Global'
import ExtraInfoModal from '@/components/SignUp/ExtraInfoModal.vue'
import { Form } from 'vee-validate'
import { signupSchema } from '@/composables/useAuthSchema'
import { useUniversityStore } from '@/stores/UniversityStore'
import { useUserStore } from '@/stores/UserStore'

const universityStore = useUniversityStore()
const userStore = useUserStore()

const initialFormState: SignupPayload = {
  email: '',
  password: '',
  password2: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  sex: '',
  birth_date: '',
  college: null,
  department: null,
  access_token: '',
}

const form = ref<SignupPayload>({ ...initialFormState })

const toast = ref<InstanceType<typeof Toast> | null>(null)
const maxDate = new Date().toISOString().split('T')[0]
const accessToken = ref<string | null>(null)
const showModal = ref<boolean>(false)
const googleProfile = ref<Record<string, any> | null>(null)

const submitForm = async () => {
  await userStore.signup(form.value)
  if (!userStore.success) {
    toast.value?.showToast(userStore.message, 'error')
    form.value = { ...initialFormState }
  } else {
    toast.value?.showToast(userStore.message, 'success')
    form.value = { ...initialFormState }
    setTimeout(() => (window.location.href = '/login'), 2000)
  }
}

const googleSignUp = (response: any) => {
  console.log('GOOGLE LOGIN RESPONSE', response)
  accessToken.value = response.access_token
  showModal.value = true
}

const submitToBackend = async (extraInfo: Record<string, any>) => {
  if (!accessToken.value) return

  // const googleData: GoogleSignupPayload = {
  //   access_token: accessToken.value,
  //   extra_info: extraInfo,
  // }

  // const response = await googleSignup(googleData)
  // if (response.success) {
  //   toast.value?.showToast('Google Signup successful!', 'success')
  //   showModal.value = false
  // } else {
  //   toast.value?.showToast(`Error submitting form: ${response.error}`, 'error')
  // }
}

onMounted(async () => {
  console.log('✅ SignUp mounted')

  try {
    if (universityStore.colleges.length === 0) {
      await universityStore.fetchColleges()
    }
    universityStore.setupWebSocket()
  } catch (error: any) {
    console.log('ERROR:', error?.value)
  }
})

onBeforeUnmount(() => {
  console.log('🧹 SignUp unmounted')
  universityStore.closeWebSocket()
})
</script>

<style lang="scss" scoped>
.signup-container {
  display: grid;
  grid-template-rows: 1fr 5fr 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    'title'
    'form'
    'submission';
  grid-auto-columns: 1fr;
  gap: 0em 1%;
  box-sizing: border-box;
  // background-color: red;
  padding: 2rem 2.5rem;
  width: 100%;
  height: 100%;
  text-align: center;
}

.title-part {
  grid-area: title;
  // background-color: blue;
}

.form-wrapper {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    'fields'
    'sub-btns';
  grid-auto-columns: 1fr;
  grid-area: 'form';
  gap: 0em 1%;
  box-sizing: border-box;
  // background-color: yellow;
  height: 100%;
  overflow: hidden;
}

.fields {
  display: flex;
  grid-area: fields;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  padding: 1rem 0.5rem;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.3rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background: rgba($red, 0.5);
  }
}

.button-group {
  display: flex;
  grid-area: sub-btns;
  justify-content: space-between;
  gap: 0.7rem;
  background: white;
  padding-top: 0.5rem;
  @include ratio-portrait {
    flex-wrap: wrap-reverse;
    justify-content: space-between;
  }
}

.google-buttons {
  grid-area: 'submission';
  // background-color: pink;
}

.demographic-fields {
  @include sm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @include lg {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-auto-columns: 1fr;
    align-items: end;
    gap: 0.7em;
  }
}

.name-fields {
  @include sm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @include lg {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    grid-auto-columns: 1fr;
    align-items: start;
    gap: 0.7em;
  }
}

.select-group {
  display: flex;
  align-items: flex-start;
}

.university-fields {
  display: flex;
  gap: 0.7rem;
  margin-bottom: 0.5rem;
}

.select-item1 {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 50%;
}

.small-select {
  color: gray;
  font-size: 0.6rem;
}

.title {
  font-weight: $base-fw;
  font-size: 3.5em;
}

.google {
  width: 100%;
}

.google-button {
  display: flex;
  gap: 1em;
}

.info-modal {
  z-index: 3;
}

.label {
  display: block;
  margin-bottom: 0.3rem;
  color: #6f6f6f;
  font-weight: bold;
  font-size: small;
  text-align: left;
}

.label1 {
  display: block;
  margin-bottom: 0.3rem;
  margin-left: 0.7rem;
  color: #6f6f6f;
  font-weight: bold;
  font-size: small;
  text-align: left;
}

.separator {
  align-self: center;
  opacity: 80%;
  margin: 0.5rem 0;
  background-color: $red;
  width: 95%;
  height: 0.1rem;
}

.or-text {
  padding: 1em 0em;
  font-weight: bold;
}

.subtitle {
  color: #6f6f6f;
  font-weight: 800;
}
</style>
