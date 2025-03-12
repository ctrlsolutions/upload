<template>
  <div class="login-container">
    <div class="login-header">
      <h1>Log in</h1>
    </div>
    <p>Welcome! Log in to access your dashboard.</p>
    <form class="input-group" @submit.prevent="submitForm">
      <BaseTextInput
        id="email"
        type="email"
        placeholder="Email"
        variant="green"
        width="100%"
        height="3.5rem"
        v-model="form.email"
        @input="clearError('email')"
      />
      <p v-if="hasAttemptedSubmit && errors.email" class="error-message">
        {{ errors.email }}
      </p>
      <BaseTextInput
        id="password"
        type="password"
        placeholder="Password"
        variant="green"
        width="100%"
        height="3.5rem"
        v-model="form.password"
        @input="clearError('password')"
      />
      <p v-if="hasAttemptedSubmit && errors.password" class="error-message">
        {{ errors.password }}
      </p>

      <div class="forgot-password">
        <a href="#" class="forgotp">Forgot Password?</a>
      </div>
      <div class="login-button">
        <FormButton variant="green" width="100%" @click="validateForm">
          LOG IN
        </FormButton>
      </div>
    </form>
    <div class="or-text">
      <p>OR</p>
    </div>
    <form class="cont-google">
      <FormButton variant="red" width="100%">
        <v-icon name="fc-google" scale="1.2"></v-icon>
        <span class="google">CONTINUE WITH GOOGLE</span>
      </FormButton>
    </form>

    <ModalLogin
      :isOpen="isGoogleModalOpen"
      @close="closeGoogleModal"
      @proceed="handleGoogleLogin"
    />
  </div>
  <Toast ref="toast" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import FormButton from '@/components/Global/BaseFormButton.vue'
import Toast from '@/components/Global/Toast.vue'
import ModalLogin from '@/components/Login/ModalLogin.vue';
import axios from 'axios'

const isGoogleModalOpen = ref(false);

const openGoogleModal = () => {
  isGoogleModalOpen.value = true;
};

const closeGoogleModal = () => {
  isGoogleModalOpen.value = false;
};

const handleGoogleLogin = (password: string) => {
  console.log('Proceeding with Google login, password:', password);
};

const toast = ref(null)

// Define types
interface FormState {
  email: string
  password: string
}

interface ErrorState {
  email: string
  password: string
}

// Reactive state
const form = reactive<FormState>({
  email: '',
  password: '',
})

const errors = reactive<ErrorState>({
  email: '',
  password: '',
})

const hasAttemptedSubmit = ref(false)

// Form validation
const validateForm = () => {
  hasAttemptedSubmit.value = true

  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Invalid email format.'
  }

  if (!form.password) {
    errors.password = 'Password is required.'
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  console.log('Errors object:', errors)
  if (!errors.email && !errors.password) {
    console.log('Form submitted successfully!', form)
  }
}

// Clear error messages
const clearError = (field: keyof ErrorState) => {
  errors[field] = ''
}

const submitForm = async () => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/user/login/',
      form,
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )

    localStorage.setItem('authToken', response.data.token)
    axios.defaults.headers.common['Authorization'] =
      `Token ${response.data.token}`
    toast.value.showToast('Login successful!', 'success')

    setTimeout(() => {
      window.location.href = 'http://localhost:5173/authenticated/dashboard'
    }, 2000)
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || 'An unexpected error occurred'
    toast.value.showToast(`Error submitting form: ${errorMessage}`, 'error')
  }
}
</script>

<style lang="scss" scoped>
.error-message {
  color: red;
  font-size: 0.7rem;
  margin-top: -1rem;
  margin-bottom: 0rem;
  padding: 0;
  line-height: 0;
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
  font-weight: 800;

  @include sm {
    font-size: 1.5rem;
  }

  @include md {
    font-size: 1.75rem;
  }

  @include lg {
    font-size: 2rem;
  }

  h1 {
    font-weight: 800;
  }
}

.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
  margin-bottom: 2rem;

  @include sm {
    gap: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  @include md {
    gap: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  @include lg {
    gap: 2rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
}

.login-button {
  width: 100%;
}

.or-text {
  margin-top: 1.5rem;
  margin-bottom: 1rem;

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
  margin-bottom: 1.5rem;

  @include sm {
    padding-right: 0.5rem;
    margin-bottom: 1rem;
  }

  @include md {
    padding-right: 0.75rem;
    margin-bottom: 1.25rem;
  }

  @include lg {
    padding-right: 1rem;
    margin-bottom: 1.5rem;
  }
}

.forgotp {
  color: $green;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }

  @include sm {
    font-size: 0.8rem;
  }

  @include md {
    font-size: 0.85rem;
  }

  @include lg {
    font-size: 0.9rem;
  }
}

.cont-google {
  width: 100%;
}

.google {
  padding-left: 1.3rem;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  align-items: flex-end;

  @include sm {
    padding-left: 0.8rem;
    font-size: 0.8em;
  }

  @include md {
    padding-left: 1rem;
    font-size: 0.9em;
  }

  @include lg {
    padding-left: 1.3rem;
    font-size: 1em;
  }
}
</style>
