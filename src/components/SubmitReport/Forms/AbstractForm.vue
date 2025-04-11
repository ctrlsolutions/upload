<template>
    <div class="form">
      <div class="form-group" v-for="(field, index) in fields" :key="index">
        <label>{{ field.label }}</label>
  
        <!-- Text, Number Input -->
        <input
          v-if="['text', 'number'].includes(field.component)"
          :type="field.component"
          v-model="form[field.model]"
          :placeholder="field.placeholder || ''"
        />
  
        <!-- Textarea -->
        <textarea
          v-else-if="field.component === 'textarea'"
          v-model="form[field.model]"
          :placeholder="field.placeholder || ''"
        ></textarea>
  
        <!-- Date Input -->
        <BaseDateInput
          v-else-if="field.component === 'date'"
          v-model="form[field.model]"
          :width="'100%'"
        />
  
        <!-- Select Input -->
        <BaseSelectInput
          v-else-if="field.component === 'select'"
          v-model="form[field.model]"
          :options="field.options ?? []"
          style="width: 100%; height: 38px"
        />

  
        <span v-if="errors[field.model]" class="error">{{ errors[field.model] }}</span>
      </div>
    </div>
  </template>
  


  <script setup lang="ts">
  import BaseDateInput from '@/components/Global/BaseDateInput.vue'
  import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'
  import { reactive } from 'vue'
  
  // 1. Define field type
  type Field = {
    model: string
    label: string
    isRequired: boolean
    component: string
    placeholder: string
    options?: {value: string, label: string}[]
  }
  
  // 2. Use defineProps with type
  const props = defineProps<{
    fields: Field[]
  }>()
  
  const form = reactive<Record<string, any>>({})
  const errors = reactive<Record<string, string>>({})
  
  // 3. Now this works with no TS errors
  props.fields.forEach(field => {
    form[field.model] = ''
    errors[field.model] = ''
  })
  
  function validateForm() {
    let valid = true
    props.fields.forEach(field => {
      if (field.isRequired && !form[field.model]) {
        errors[field.model] = `${field.label} is required.`
        valid = false
      } else if (
        field.component === 'text' &&
        field.model === 'months' &&
        isNaN(form[field.model])
      ) {
        errors[field.model] = 'Valid months are required.'
        valid = false
      } else {
        errors[field.model] = ''
      }
    })
  
    const start = form.startDate
    const end = form.endDate
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
  
    const result: Record<string, any> = {}
    props.fields.forEach(field => {
      result[field.model] = form[field.model]
    })
  
    return result
  }
  
  defineExpose({ exposeForm })
  </script>
  
  
<style scoped>
    .error {
        color: red;
        font-size: 0.8rem;
    }
</style>
  