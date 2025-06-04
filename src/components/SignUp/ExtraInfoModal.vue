<template>
  <BaseModal>
    <div class="modal-content">
      <h1 class="modal-title">Before you proceed...</h1>
      <h5>We need more information from you.</h5>
      <Form :validation-schema="signupSchema" v-slot="{ errors, meta, handleSubmit }">
        <form @submit.prevent="handleSubmit(submitExtraInfo)" class="form-container">
          <div class="input-row align-label">
            <div class="input-pair">
              <BaseDateInput name="birth_date" v-model="form.birth_date" label="Birthdate" placeholder="Birthdate" />
            </div>
            <div class="input-pair">
              <BaseSelectInput name="sex" v-model="form.sex" width="100%" label="Sex"
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
                v-model="form.middle_name"
                placeholder="Middle Name"
                label="Middle Name"
                width="100%"
              />
            </div>
          </div>

          <div class="input-row align-label">
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

          <div class="input-row align-label">
            <div class="input-pair">
              <InputField
                name="password"
                type="password"
                v-model="form.password"
                placeholder="Password"
                label="Password"
                width="100%"
              />
            </div>
            <div class="input-pair">
              <InputField
                name="password2"
                type="password"
                v-model="form.password2"
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
          <button @click="console.log('TEST', form.access_token)"></button>
          <div class="button-container">
            <FormButton type="button" variant="black" route="" @click="closeModal">Cancel</FormButton>
            <FormButton type="submit" variant="red">Proceed</FormButton>
          </div>
        </form>
      </Form>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { defineEmits, Ref, toRefs, computed } from 'vue'
import { InputField, FormButton, BaseDateInput, BaseSelectInput } from '@/components/Global'
import { getExtraInfoSchema } from '@/composables/useAuthSchema'
import { Form } from 'vee-validate'

import { useUniversityStore } from '@/stores/UniversityStore'

const universityStore = useUniversityStore()

import BaseModal from '@/components/Global/BaseModal.vue'
import { SignupPayload } from '@/types/AuthInterface'

const props = defineProps<{
  form: Ref<SignupPayload>
}>()

const signupSchema = getExtraInfoSchema()
const { form } = toRefs(props)
const emit = defineEmits(['close', 'form-submit'])

const closeModal = () => {
  emit('close')
}

function submitExtraInfo() {
  console.log('SUBMITTING', form.value)
  emit('form-submit')
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
