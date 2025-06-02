<template>
  <div class="signup-container">
    <header class="title-part">
      <h1 class="title">Sign up</h1>
      <p class="subtitle">New here? Create a new account below.</p>
    </header>
    <Form
      :initial-values="form"
      @submit.prevent="submitForm(form)"
      :validation-schema="signupSchema"
      v-slot="{ errors }"
      class="form-wrapper"
    >
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
            name="middle_name"
            type="text"
            placeholder="Middle name"
            variant="red"
            width="100%"
            v-model="form.middle_name"
          />
        </div>
        <InputField
          id="last_name"
          name="last_name"
          type="text"
          placeholder="Last name"
          variant="red"
          width="100%"
          v-model="form.last_name"
        />
        <div class="demographic-fields">
          <BaseSelectInput name="sex" v-model="form.sex" width="100%" label="Sex"
            ><option value="" disabled>Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other / Prefer not to say</option>
          </BaseSelectInput>
          <BaseDateInput
            name="birth_date"
            v-model="form.birth_date"
            width="100%"
            :max="maxDate"
            label="Date of Birth"
          />
        </div>
        <div class="university-fields">
          <BaseSelectInput
            name="college"
            v-model="form.college"
            placeholder="Select College"
            width="100%"
            label="College"
          >
            <option value="" disabled>Select</option>
            <option v-for="college in universityStore.colleges" :key="college.college_id" :value="college.college_id">
              {{ college.name }}
            </option>
          </BaseSelectInput>
          <BaseSelectInput
            name="department"
            v-model="form.department"
            placeholder="Select Department"
            width="100%"
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
        <button @click="console.log(form)">check form</button>
        <!-- <span v-if="errors">{{ errors }}</span> -->
        <!-- <span v-if="!meta.valid">Form is invalid</span> -->
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
    :form="ref(form)"
    @submit="submitForm"
    @close="showModal = false"
    class="info-modal"
  />
  <Toast ref="toast" />
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, Ref } from 'vue'
import { SignupPayload } from '@/types/AuthInterface'
import { FormButton, BaseSelectInput, InputField, BaseDateInput, Toast } from '@/components/Global'
import ExtraInfoModal from '@/components/SignUp/ExtraInfoModal.vue'
import { Form } from 'vee-validate'
import { getSignupSchema } from '@/composables/useAuthSchema'
import { useUniversityStore } from '@/stores/UniversityStore'
import { useUserStore } from '@/stores/UserStore'

const signupSchema = getSignupSchema()
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
  access_token: null,
}

const form: Ref<SignupPayload> = ref({ ...initialFormState })

const toast = ref<InstanceType<typeof Toast> | null>(null)
const maxDate = new Date().toISOString().split('T')[0]
const showModal = ref<boolean>(false)

const submitForm = async (form: SignupPayload) => {
  console.log('FORM VALUE', form)
  await userStore.signup(form)
  if (!userStore.success) {
    toast.value?.showToast(userStore.message, 'error')
    form = { ...initialFormState }
  } else {
    toast.value?.showToast(userStore.message, 'success')
    form = { ...initialFormState }
    setTimeout(() => (window.location.href = '/login'), 2000)
  }
}

const googleSignUp = async (response: any) => {
  form.value = { ...initialFormState }
  form.value.access_token = response.access_token
  showModal.value = true
}

// const submit = async (extraInfo: Record<string, any>) => {
//   if (!accessToken.value) return
//   const googleData: GoogleSignupPayload = {
//     access_token: accessToken.value,
//     extra_info: extraInfo,
//   }
//   const response = await googleSignup(googleData)
//   if (response.success) {
//     toast.value?.showToast('Google Signup successful!', 'success')
//     showModal.value = false
//   } else {
//     toast.value?.showToast(`Error submitting form: ${response.error}`, 'error')
//   }
// }

onMounted(async () => {
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
  padding: 2rem 2.5rem;
  width: 100%;
  height: 100%;
  text-align: center;
}

.title-part {
  grid-area: title;
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
}

.name-fields {
  @include sm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @include lg {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-columns: 1fr;
    align-items: start;
    gap: 0.7em;
  }
}

.demographic-fields {
  @include sm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @include lg {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-columns: 1fr;
    align-items: start;
    gap: 0.7em;
  }
}

.university-fields {
  @include sm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @include lg {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-columns: 1fr;
    align-items: start;
    gap: 0.7em;
  }
}

.title {
  font-weight: $base-fw;
  @include sm {
    font-size: 3em;
  }
  @include lg {
    font-size: 4em;
  }
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
  font-weight: $base-fw;
}
</style>
