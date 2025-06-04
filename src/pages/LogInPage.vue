<template>
  <div class="login-container">
    <header class="login-header">
      <h1 class="title">Log in</h1>
      <p class="subtitle">Welcome! Log in to access your dashboard.</p>
    </header>

    <Form :validation-schema="loginSchema" v-slot="{ errors, handleSubmit }" class="outer-input">
      <form @submit.prevent="handleSubmit(submitForm)" class="input-group">
        <div class="fields">
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            variant="green"
            width="100%"
            v-model="form.email"
          />

          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            variant="green"
            width="100%"
            v-model="form.password"
          />
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>

        <FormButton variant="green" width="100%" type="submit"> LOG IN </FormButton>
      </form>
    </Form>

    <div class="submit-group">
      <p class="or-text">OR</p>

      <div id="google-login">
        <GoogleLogin :callback="handleGoogleLogin">
          <FormButton class="google-button" variant="red" width="100%" type="button"
            ><v-icon name="fc-google" scale="1" /> CONTINUE WITH GOOGLE
          </FormButton>
        </GoogleLogin>
      </div>
    </div>
  </div>

  <Toast ref="toast" />
</template>

<script setup lang="ts">
import FormButton from '@/components/Global/BaseFormButton.vue'
import { LoginPayload, ErrorState } from '@/types/AuthInterface'
import { getLoginSchema } from '@/composables/useAuthSchema'
import { useRouter } from 'vue-router'
import { onMounted, ref, onBeforeUnmount, Ref } from 'vue'
import { Form } from 'vee-validate'
import { login, googleLogin, logout } from '@/services/AuthService'
import { useUserStore } from '@/stores/UserStore'
import { User } from '@/types/CommonInterface'
import Toast from '@/components/Global/Toast.vue'
import { InputField } from '@/components/Global'

const loginSchema = getLoginSchema()
const userStore = useUserStore()

const initialFormState: LoginPayload = {
  email: '',
  password: '',
}

const form: Ref<LoginPayload> = ref({ ...initialFormState })

const router = useRouter()

const toast = ref<InstanceType<typeof Toast> | null>(null)

const user = ref<User | null>(null)

const submitForm = async () => {
  await userStore.login(form.value)
  if (!userStore.success) {
    toast.value?.showToast(userStore.message, 'error')
    form.value = { ...initialFormState }
  } else {
    await userStore.fetchUserProfile()
    console.log('USERNAME', userStore.getUserProfile?.username)
    toast.value?.showToast(userStore.message, 'success')
    form.value = { ...initialFormState }
    setTimeout(() => (window.location.href = `/${userStore.getUserProfile?.username}`), 2000)
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
  if (userStore.isLoggedIn) {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed', error)
    }
  }
})
</script>

<style lang="scss" scoped>
.error-message {
  margin: -0.9rem;
  color: $red;
  font-size: 0.75rem;
}

.google-button {
  display: flex;
  gap: 1em;
}

.fields {
  display: flex;
  grid-area: fields;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  padding: 1rem 0.5rem;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.3rem;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background: rgba($green, 0.5);
  }
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0em 1%;
  box-sizing: border-box;
  padding: 2rem 2.5rem;
  width: 100%;
  height: 100%;
  text-align: center;
  @include ratio-portrait {
    justify-content: start;
    height: fit-content;
  }
}

.login-header {
  grid-area: title;
}

.title {
  font-weight: $base-fw;
  @include sm {
    font-size: 3em;
  }
  @include lg {
    font-size: 4em;
  }
}

.subtitle {
  color: #6f6f6f;
  font-weight: $base-fw;
}

.outer-input {
  grid-area: form;
  min-height: 0;
  max-height: 60%;
}

.input-group {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    'fields'
    'sub-btns';
  grid-auto-columns: 1fr;
  justify-content: center;
  align-items: center;
  gap: 0em 1%;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
}

.submit-group {
  grid-area: submission;
  justify-content: start;
}

.login-button {
  width: 100%;
}

.or-text {
  padding: 1em 0em;
  font-weight: bold;
}

.forgot-password {
  color: $green;
  text-align: right;
  text-decoration: none;

  &:hover {
    background-color: transparent;
    text-decoration: underline;
  }

  &:focus {
    outline: none;
    background-color: transparent;
  }
}

#google-login {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
