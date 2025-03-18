<template>
  <div class="login-container">
    <div class="login-header">
      <h1 id="title">Log in</h1>
      <p id="subtitle">Welcome! Log in to access your dashboard.</p>
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

    <div class="input-group" id="google-login">
      <GoogleLogin :callback="handleGoogleLogin">
        <FormButton variant="red" width="100%" type="button">
          CONTINUE WITH GOOGLE
        </FormButton>
      </GoogleLogin>
    </div>
  </div>

  <Toast ref="toast" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import FormButton from '@/components/Global/BaseFormButton.vue'
import { LoginData, ErrorState } from '@/types/AuthInterface'
import {
  validateField as validateFieldFn,
  validateForm as validateFormFn,
} from '@/validators/AuthValidators'
import { login, googleLogin } from '@/services/AuthService'

import Toast from '@/components/Global/Toast.vue'
import axios from 'axios'

const toast = ref<InstanceType<typeof Toast> | null>(null)

const form = reactive<LoginData>({
  email: '',
  password: '',
})

const errors = reactive<ErrorState>({
  email: '',
  password: '',
})

const onBlur = (field: keyof LoginData) => {
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
    const response = await login(form) 
    console.log("Full response:", response) 

    if (response.token && response.user_id) {
      localStorage.setItem('token', response.token)
      console.log("Token:", response.token)
      console.log("User ID:", response.user_id)

      axios.defaults.headers.common['Authorization'] = `Token ${response.token}`
      toast.value?.showToast('Login successful!', 'success')
    }

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
  margin: -0.9rem;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 25rem;
  margin: auto;
  padding: 2rem;
  background-color: transparent;
  @include sm {
    width: 12rem;
    padding: 1rem;
  }
  @include md {
    width: 15rem;
    padding: 1.5rem;
  }
  @include lg {
    width: 25rem;
    padding: 2rem;
  }
}

.login-header {
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 3rem;
}

#title {
  font-size: 4rem;
  font-weight: 900;
}

#subtitle {
  font-size: 1rem;
}

.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @include sm {
    gap: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  @include md {
    gap: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  @include lg {
    gap: 2rem;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
}

.login-button {
  width: 100%;
}

.or-text {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;

  @include sm {
    margin-bottom: 0.5rem;
    font-size: 0.9em;
  }

  @include md {
    margin-bottom: 0.75rem;
    font-size: 1em;
  }

  @include lg {
    margin-bottom: 1rem;
    font-size: 1em;
  }
}

.forgot-password {
  width: 100%;
  text-align: right;
  margin-top: -0.5rem;
  padding-right: 1rem;

  @include sm {
    padding-right: 0.5rem;
    margin-bottom: 0.1rem;
  }

  @include md {
    padding-right: 0.75rem;
    margin-bottom: 0.2rem;
  }

  @include lg {
    padding-right: 1rem;
    margin-bottom: 0.3rem;
  }
}

.forgotp {
  color: $green;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    background-color: transparent;
  }

  &:focus {
    outline: none;
    background-color: transparent;
  }
}

#google-login {
  display: flex;
  flex-direction: column;
  margin-top: -0.75rem;
}
</style>
