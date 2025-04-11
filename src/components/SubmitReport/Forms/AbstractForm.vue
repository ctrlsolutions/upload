<template>
  <div class="form">
    <div class="form-group" v-for="(field, index) in fields" :key="index">
      <label>{{ field.label }}</label>

      <!-- Text Input -->
      <input
        v-if="field.component === 'text'"
        type="text"
        v-model="form[field.model]"
        :placeholder="field.placeholder || ''"
      />

      <!-- Number Input -->
      <input
        v-else-if="field.component === 'number'"
        type="number"
        v-model.number="form[field.model]"
        :placeholder="field.placeholder || ''"
      />

      <!-- Date Input -->
      <BaseDateInput
        v-else-if="field.component === 'date'"
        v-model="form[field.model]"
        :width="'100%'"
        style="font-weight: 400;"
      />

      <!-- Select Input -->
      <BaseSelectInput
        v-else-if="field.component === 'select'"
        v-model="form[field.model]"
        :options="field.options ?? []"
        style="width: 100%; height: 38px"
      />

      <!-- Error Message -->
      <span v-if="errors[field.model]" class="error">{{ errors[field.model] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BaseDateInput from '@/components/Global/BaseDateInput.vue'
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'

// 1. Define field type
type Field = {
  model: string
  label: string
  isRequired: boolean
  component: string
  placeholder: string
  options?: { value: string, label: string }[]
}

// 2. Use defineProps with type
const props = defineProps<{
  fields: Field[]
}>()

const form = reactive<Record<string, any>>({})
const errors = reactive<Record<string, string>>({})

// 3. Initialize form and error states
props.fields.forEach(field => {
  form[field.model] = ''
  errors[field.model] = ''
})

// 4. Validation logic
function validateForm() {
  let valid = true

  props.fields.forEach(field => {
    const value = form[field.model]

    if (field.isRequired && (value === '' || value === null || value === undefined)) {
      errors[field.model] = `${field.label} is required.`
      valid = false
    } else if (field.component === 'number' && isNaN(value)) {
      errors[field.model] = `${field.label} must be a valid number.`
      valid = false
    } else if (
      field.component === 'number' &&
      field.model === 'months' &&
      (value <= 0 || isNaN(value))
    ) {
      errors[field.model] = 'Valid number of months is required.'
      valid = false
    } else {
      errors[field.model] = ''
    }
  })

  // Additional cross-field validation
  const start = form.startDate
  const end = form.endDate
  if (start && end && new Date(end) < new Date(start)) {
    errors.endDate = 'End date must be after start date.'
    valid = false
  }

  return valid
}

// 5. Expose form result
function exposeForm() {
  if (!validateForm()) {
    console.warn('Validation failed')
    return null
  }

  const result: Record<string, any> = {}

  props.fields.forEach(field => {
    if (field.model == 'title'){
      result['report'] = {
        title: form[field.model]
      }
    }
    else{
      result[field.model] = form[field.model]
    }
    
  })

  return result
}

defineExpose({ exposeForm })
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

.error {
  color: red;
  font-size: 0.8rem;
}
</style>
