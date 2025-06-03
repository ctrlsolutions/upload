<template>
  <BaseModal>
    <div class="modal-content">
      <h1 class="modal-title">Before you proceed...</h1>
      <h5 class="modal-subtitle">We need more information from you.</h5>
      <Form
        :initial-values="localForm"
        @submit="handleSubmit(localForm)"
        :validation-schema="signupSchema"
        v-slot="{ errors, meta }"
        class="form-container"
      >
        <div class="input-row align-label">
          <div class="input-pair">
            <BaseDateInput name="birth_date" v-model="localForm.birth_date" label="Birthdate" placeholder="Birthdate" />
          </div>
          <div class="input-pair">
            <BaseSelectInput name="sex" v-model="localForm.sex" width="100%" label="Sex"
              ><option value="" disabled>Select</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other / Prefer not to say</option>
            </BaseSelectInput>
          </div>
        </div>

        <div class="input-row align-label full-width">
          <div class="input-pair full-width">
            <InputField
              name="middle_name"
              v-model="localForm.middle_name"
              placeholder="Middle Name"
              label="Middle Name"
              width="100%"
            />
          </div>
        </div>

        <div class="input-row align-label">
          <BaseSelectInput
            name="college"
            v-model="localForm.college"
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
            v-model="localForm.department"
            placeholder="Select Department"
            width="100%"
            :disabled="!localForm.college"
            label="Department"
          >
            <option value="" disabled>Select</option>
            <option
              v-for="dept in universityStore.getDepartmentsByCollege(Number(localForm.college))"
              :key="dept.department_id"
              :value="Number(dept.department_id)"
            >
              {{ dept.name }}
            </option>
          </BaseSelectInput>
        </div>

        <div class="input-row align-label">
          <div class="input-pair">
            <InputField
              name="password"
              type="password"
              v-model="localForm.password"
              placeholder="Password"
              label="Password"
              width="100%"
            />
          </div>
          <div class="input-pair">
            <InputField
              name="password2"
              type="password"
              v-model="localForm.password2"
              placeholder="Re-enter password"
              label="Re-enter Password"
              width="100%"
            />
          </div>
        </div>
        <div class="input-row error-row">
          <span v-if="errors">{{ errors }}</span>
          <span v-if="!meta.valid">Form is invalid</span>
        </div>

        <h5 class="modal-subtitle">Please fill up the required fields and click proceed to continue.</h5>
        <button @click="console.log(localForm)"></button>
        <div class="button-container">
          <FormButton type="button" variant="black" route="" @click="closeModal">Cancel</FormButton>
          <FormButton type="submit" variant="red">Proceed</FormButton>
        </div>
      </Form>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, defineEmits, Ref } from 'vue'
import { InputField, FormButton, BaseDateInput, BaseSelectInput } from '@/components/Global'
import { getSignupSchema } from '@/composables/useAuthSchema'
import { Form } from 'vee-validate'

import { useUniversityStore } from '@/stores/UniversityStore'

const universityStore = useUniversityStore()

import BaseModal from '@/components/Global/BaseModal.vue'
import { SignupPayload } from '@/types/AuthInterface'

const props = defineProps<{
  form: Ref<SignupPayload>
}>()

const localForm = ref({ ...props.form.value })

const signupSchema = getSignupSchema()
const form = props.form // form is now Ref<SignupPayload>
const emit = defineEmits(['close', 'submit'])

// const handleSubmit = () => {
//   errors.value.password = ''
//   errors.value.retype = ''

//   const trimmedPassword = password.value.trim()
//   const trimmedRetype = retype.value.trim()

//   if (!trimmedPassword) {
//     errors.value.password = 'Password is required.'
//   } else if (trimmedPassword.length < 8) {
//     errors.value.password = 'Password must be at least 8 characters.'
//   }

//   if (!trimmedRetype) {
//     errors.value.retype = 'Please re-enter your password.'
//   } else if (trimmedPassword !== trimmedRetype && trimmedRetype.length >= 8) {
//     errors.value.retype = 'Passwords do not match.'
//   }

//   if (!errors.value.password && !errors.value.retype) {
//     emit('submit', {
//       password: trimmedPassword,
//       gender: gender.value,
//       dob: dob.value,
//       middleName: middleName.value,
//       college: college.value,
//       department: department.value,
//     })
//   }
// }

const closeModal = () => {
  emit('close')
}

function handleSubmit(values: SignupPayload) {
  console.log(form)
  emit('submit', values)
}
</script>

<style lang="scss" scoped>
.modal-content {
  padding: 1rem;
  text-align: left;
}

.modal-title {
  font-weight: bolder;
  font-size: 2.2rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.full-width .single-input {
  width: 100%;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  width: 100%;
}

.align-label > .label-side {
  margin-left: 1rem;
  width: 1rem;
  min-width: 5rem;
  font-weight: 500;
  font-size: 0.5rem;
  text-align: right;
}

.label-side {
  font-size: 0.8rem;
}

.label-side {
  display: block;
}

.input-row > *:not(.label-side) {
  flex: 1;
}

.input-row.error-row {
  gap: 1.5rem;
  padding-top: 0;
  padding-bottom: 0;
}

.error-message {
  min-height: 1.2em;
  color: red;
  font-size: 0.95rem;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 0.5rem;
  width: 100%;
}
</style>
