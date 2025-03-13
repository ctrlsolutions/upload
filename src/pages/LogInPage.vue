<template>
  <div class="login-container">
    <div class="login-header">
      <h1 class="login-title">Log in</h1>
      <p class="login-subtitle">Welcome! Log in to access your dashboard.</p>
    </div>

    <form class="input-group" @submit.prevent="submitForm">
      <BaseTextInput
        id="email"
        type="email"
        placeholder="Email"
        variant="green"
        width="100%"
        v-model="form.email"
        @blur="onBlur('email')"
        @input="clearError('email')"
      />
      <p v-if="errors.email" class="error-message">{{ errors.email }}</p>

      <BaseTextInput
        id="password"
        type="password"
        placeholder="Password"
        variant="green"
        width="100%"
        v-model="form.password"
        @blur="onBlur('password')"
        @input="clearError('password')"
      />
      <p v-if="errors.password" class="error-message">{{ errors.password }}</p>

      <a href="#" class="forgot-password">Forgot Password?</a>

      <FormButton variant="green" width="100%" @click="validateForm">
        LOG IN
      </FormButton>
    </form>

    <p class="or-text">OR</p>

    <GoogleLogin :callback="handleGoogleLogin">
      <FormButton variant="red" width="25rem" type="button">
        CONTINUE WITH GOOGLE
      </FormButton>
    </GoogleLogin>
  </div>

  <Toast ref="toast" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import FormButton from '@/components/Global/BaseFormButton.vue'
import { FormState, ErrorState } from '@/types/LoginInterface'
import {
  validateField as validateFieldFn,
  validateForm as validateFormFn,
} from '@/validators/LogInValidator'
import { login, googleLogin } from '@/services/AuthService'

import Toast from '@/components/Global/Toast.vue'
import axios from 'axios'

const toast = ref<InstanceType<typeof Toast> | null>(null)

const form = reactive<FormState>({
  email: '',
  password: '',
})

const errors = reactive<ErrorState>({
  email: '',
  password: '',
})

const onBlur = (field: keyof FormState) => {
  clearError(field)
  errors[field] = validateFieldFn(form, field) || ''
}

const clearError = (field: keyof ErrorState) => {
  errors[field] = ''
}

const validateForm = async () => {
  const validationErrors = validateFormFn(form)

  errors.email = validationErrors.email || ''
  errors.password = validationErrors.password || ''

  if (!errors.email && !errors.password) {
    await submitForm()
  }
}

const submitForm = async () => {
  try {
    const token = await login(form)
    localStorage.setItem('authToken', token)
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    toast.value?.showToast('Login successful!', 'success')

    setTimeout(() => {
      window.location.href = '/authenticated/dashboard'
    }, 2000)
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || 'An unexpected error occurred'
    toast.value?.showToast(`Error submitting form: ${errorMessage}`, 'error')
  }
}

const handleGoogleLogin = async (googleResponse: any) => {
  try {
    const token = googleResponse.credential
    await googleLogin(token)
    toast.value?.showToast('Login successful!', 'success')
  } catch (error: any) {
    toast.value?.showToast('Google login failed', 'error')
  }
}
</script>

<style lang="scss" scoped>
.error-message {
  color: $red;
  font-size: 0.75rem;
  margin: 0;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 25rem;
  margin: auto;
  padding: 2rem;
}

.login-header {
  text-align: center;
  font-size: 2rem;
  font-weight: 800;
}

.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
}

.or-text {
  margin: 1rem 0;
  font-size: 1rem;
}

.forgot-password {
  color: $green;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
}
</style>
