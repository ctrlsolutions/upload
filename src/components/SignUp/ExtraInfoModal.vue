<template>
  <BaseModal>
    <div class="modal-content">
      <h1 class="modal-title">Before you proceed...</h1>
      <h5 class="modal-subtitle">We need more information from you.</h5>
      <form @submit.prevent="handleSubmit" class="form-container">
        <div class="input-row align-label">
          <div class="input-pair">
            <BaseDateInput
              id="date"
              v-model="dob"
              label="Birthdate"
              placeholder="Birthdate"
            />
          </div>
          <div class="input-pair">
            <BaseSelectInput
              v-model="gender"
              label="Sex"
              width="100%"
            >
              <option disabled value="">Select gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </BaseSelectInput>
          </div>
        </div>

        <div class="input-row align-label full-width">
          <div class="input-pair full-width">
            <BaseTextInput
              name="middleName"
              v-model="middleName"
              placeholder="Middle Name"
              label="Middle Name"
              width="100%"
            />
          </div>
        </div>

        <div class="input-row align-label">
          <div class="input-pair">
            <BaseSelectInput
              v-model="college"
              label="College"
              width="100%"
            >
              <option disabled value="">Select college</option>
              <option value="CAS">College of Arts and Sciences</option>
              <option value="COE">College of Engineering</option>
              <option value="CBA">College of Business Administration</option>
            </BaseSelectInput>
          </div>
          <div class="input-pair">
            <BaseSelectInput
              v-model="department"
              label="Department"
              width="100%"
            >
              <option disabled value="">Select department</option>
              <option value="Math">Mathematics</option>
              <option value="CS">Computer Science</option>
              <option value="Physics">Physics</option>
            </BaseSelectInput>
          </div>
        </div>

        <div class="input-row align-label">
          <div class="input-pair">
            <BaseTextInput
              name="password"
              type="password"
              v-model="password"
              placeholder="Password"
              label="Password"
              width="100%"
            />
          </div>
          <div class="input-pair">
            <BaseTextInput
              name="retype"
              type="password"
              v-model="retype"
              placeholder="Re-enter password"
              label="Re-enter Password"
              width="100%"
            />
          </div>
        </div>
        <div class="input-row error-row">
          <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
          <span class="error-message" v-if="errors.retype">{{ errors.retype }}</span>
        </div>

        <h5 class="modal-subtitle">Please fill up the required fields and click proceed to continue.</h5>

        <div class="button-container">
          <BaseFormButton type="button" variant="black" route="" @click="closeModal">Cancel</BaseFormButton>
          <BaseFormButton type="submit" variant="red" route="">Proceed</BaseFormButton>
        </div>
      </form>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import BaseDateInput from '@/components/Global/BaseDateInput.vue'
import BaseModal from '@/components/Global/BaseModal.vue'
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'

const emit = defineEmits(['close', 'submit'])

const password = ref('')
const retype = ref('')
const gender = ref('')
const dob = ref('')
const middleName = ref('')
const college = ref('')
const department = ref('')
const errors = ref({
  password: '',
  retype: '',
})

const handleSubmit = () => {
  errors.value.password = ''
  errors.value.retype = ''

  const trimmedPassword = password.value.trim()
  const trimmedRetype = retype.value.trim()

  if (!trimmedPassword) {
    errors.value.password = 'Password is required.'
  } else if (trimmedPassword.length < 8) {
    errors.value.password = 'Password must be at least 8 characters.'
  }

  if (!trimmedRetype) {
    errors.value.retype = 'Please re-enter your password.'
  } else if (trimmedPassword !== trimmedRetype && trimmedRetype.length >= 8) {
    errors.value.retype = 'Passwords do not match.'
  }

  if (!errors.value.password && !errors.value.retype) {
    emit('submit', {
      password: trimmedPassword,
      gender: gender.value,
      dob: dob.value,
      middleName: middleName.value,
      college: college.value,
      department: department.value,
    })
  }
}

const closeModal = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.modal-content {
  padding: 1rem;
    text-align: left;
}

.modal-title {
  font-size: 2.2rem;
  font-weight: bolder;
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
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}

.align-label > .label-side {
  width: 1rem;
  min-width: 5rem;
  text-align: right;
  margin-left: 1rem;
  font-weight: 500;
  font-size: 0.5rem;
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
  color: red;
  font-size: 0.95rem;
  min-height: 1.2em;
}

.button-container {
  display: flex;
  justify-content: space-around;
  margin-top: 0.5rem;
  width: 100%;
}
</style>