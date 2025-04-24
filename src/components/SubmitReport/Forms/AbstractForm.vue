<template>
  <div class="form">
    <div class="form-group" v-for="(field, index) in fields" :key="field.id">
      <label>{{ field.label }}</label>

      <!-- Text Input -->
      <input
        v-if="field.type === 'text'"
        type="text"
        v-model="fieldResponse[field.id]"
        :placeholder="field.placeholder || ''"
      />

      <!-- Number Input -->
      <input
        v-else-if="field.type === 'number'"
        type="number"
        v-model.number="fieldResponse[field.id]"
        :placeholder="field.placeholder || ''"
      />

      <!-- Date Input -->
      <BaseDateInput
        v-else-if="field.type === 'date'"
        v-model="fieldResponse[field.id]"
        :width="'100%'"
        style="font-weight: 400;"
      />

      <!-- Select Input -->
      <BaseSelectInput
        v-else-if="field.type === 'select'"
        v-model="fieldResponse[field.id]"
        :options="field.options ?? []"
        style="width: 100%; height: 38px"
      />

      <!-- Error Message -->
      <span v-if="errors[field.id]" class="error">{{ errors[field.id] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BaseDateInput from '@/components/Global/BaseDateInput.vue'
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'

type Option = string | { value: string; label: string }

type Field = {
  id: string | number // Now using field.id
  label: string
  type: string // corresponds to "text", "number", etc.
  required: boolean
  regex_validation?: string | null
  placeholder?: string | null
  options?: Option[]
}

// Props
const props = defineProps<{
  fields: Field[]
}>()

const fieldResponse = reactive<Record<string | number, any>>({})
const errors = reactive<Record<string | number, string>>({})

// Normalize and initialize
props.fields.forEach((field) => {
  fieldResponse[field.id] = ''
  errors[field.id] = ''

  // Normalize options for select
  if (field.type === 'select' && Array.isArray(field.options)) {
    field.options = field.options.map(opt =>
      typeof opt === 'string' ? { value: opt, label: opt } : opt
    )
  }
})

function validateForm() {
  let valid = true

  props.fields.forEach(field => {
    const value = fieldResponse[field.id]

    if (field.required && (value === '' || value === null || value === undefined)) {
      errors[field.id] = `${field.label} is required.`
      valid = false
    } else if (field.type === 'number' && isNaN(value)) {
      errors[field.id] = `${field.label} must be a valid number.`
      valid = false
    } else if (
      field.type === 'number' &&
      field.id === 'months' &&
      (value <= 0 || isNaN(value))
    ) {
      errors[field.id] = 'Valid number of months is required.'
      valid = false
    } else if (field.regex_validation && !new RegExp(field.regex_validation).test(value)) {
      errors[field.id] = `${field.label} is not in valid format.`
      valid = false
    } else {
      errors[field.id] = ''
    }
  })

  const start = fieldResponse.startDate
  const end = fieldResponse.endDate
  if (start && end && new Date(end) < new Date(start)) {
    errors.endDate = 'End date must be after start date.'
    valid = false
  }

  return valid
}

function exposeForm() {
  if (!validateForm()) {
    console.warn('Validation failed')
    return null
  }

  const result: Record<string | number, any> = {}
  props.fields.forEach(field => {
    result[field.id] = fieldResponse[field.id]
  })
  return result
}

defineExpose({ exposeForm })
</script>


<style lang="scss" scoped> 

.error {
  color: red;
  font-size: 0.8rem;
}

.form {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  margin-top: 2rem;

  border-radius: 10px;
  background: #FCFCFC;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.25) inset;
  padding: 1.5rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  padding: 8px;
  padding-left: 2.7rem;
  border: 0.15px solid $red;
  border-radius: 10px;
  outline: none;
  color: $red;
  margin-top: 10px;
}

.form-group input::placeholder {
  color: $red;
  font-weight: 600;
  opacity: 0.4;
}

.error {
  color: red;
  font-size: 0.8rem;
}
</style>
