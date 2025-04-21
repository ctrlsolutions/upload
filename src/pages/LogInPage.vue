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

      <BaseFormButton variant="green" width="100%" @click.prevent="validateForm">
        LOG IN
      </BaseFormButton>
    </form>

    <p class="or-text">OR</p>

    <div class="input-group" id="google-login">
      <GoogleLogin :callback="handleGoogleLogin">
        <BaseFormButton variant="red" width="100%" type="button">
          CONTINUE WITH GOOGLE
        </BaseFormButton>
      </GoogleLogin>
    </div>
  </div>

  <Toast ref="toast" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import { LoginData, ErrorState } from '@/types/AuthInterface'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import {
  validateField as validateFieldFn,
  validateForm as validateFormFn,
} from '@/validators/AuthValidators'
import { login, googleLogin, logout } from '@/services/AuthService'

import Toast from '@/components/Global/Toast.vue'

const router = useRouter()

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
    const username = response.data.username
    toast.value?.showToast('Login successful!', 'success')

    setTimeout(() => {
      router.push(`/${username}`)
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

onMounted(async () => {
  console.log('HERE')

  const storedUsername = sessionStorage.getItem('username')

  if (storedUsername) {
    try {
      await logout()
      sessionStorage.removeItem('username') // Clear stored session data
      router.push('/login')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }
})
</script>

<style lang="scss" scoped>
.error-message {
  color: $red;
  font-size: 0.75rem;
  margin: -0.9rem 0;
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
  width: 9rem;
  margin-left: auto;
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

  &:hover {
    color: $green;
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
