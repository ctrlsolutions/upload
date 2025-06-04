<template>
  <div class="login-container">
    <header class="login-header">
      <h1 id="title" class="title">Log in</h1>
      <p id="subtitle">Welcome! Log in to access your dashboard.</p>
    </header>

    <Form :validation-schema="loginSchema" v-slot="{ errors, handleSubmit }" class="input-group">
      <form @submit.prevent="handleSubmit(submitForm)">
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
        </div>

        <a href="#" class="forgotp">Forgot Password?</a>
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
import { reactive } from 'vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
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
  console.log('FORM VALUE', form)
  await userStore.login(form.value)
  if (!userStore.success) {
    toast.value?.showToast(userStore.message, 'error')
    form.value = { ...initialFormState }
  } else {
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
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  display: grid;
  grid-template-rows: 1fr 6fr 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    'title'
    'form'
    'submission';
  grid-auto-columns: 1fr;
  gap: 0em 1%;
  box-sizing: border-box;
  margin: auto;
  background-color: transparent;
  padding: 2rem;
  width: 100%;
  height: 100%;
  max-height: 40rem;
  // background-color: yellow;
  // @include sm {
  //   width: 12rem;
  //   padding: 1rem;
  // }
  // @include md {
  //   width: 15rem;
  //   padding: 1.5rem;
  // }
  // @include lg {
  //   width: 25rem;
  //   padding: 2rem;
  // }
}

.login-header {
  grid-area: title;
  margin-bottom: 2rem;
  font-weight: 900;
  font-size: 2rem;
  text-align: center;
}

#title {
  font-weight: 900;
  font-size: 4rem;
}

#subtitle {
  font-size: 1rem;
}

.input-group {
  display: flex;
  grid-area: form;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  overflow-y: auto;

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

.submit-group {
  grid-area: submission;
}

.login-button {
  width: 100%;
}

.or-text {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;

  @include sm {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9em;
  }

  @include md {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 1em;
  }

  @include lg {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1em;
  }
}

.forgot-password {
  margin-top: -0.5rem;
  padding-right: 1rem;
  width: 100%;
  text-align: right;

  @include sm {
    margin-bottom: 0.1rem;
    padding-right: 0.5rem;
  }

  @include md {
    margin-bottom: 0.2rem;
    padding-right: 0.75rem;
  }

  @include lg {
    margin-bottom: 0.3rem;
    padding-right: 1rem;
  }
}

.forgotp {
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
  // margin-top: -0.75rem;
  width: 100%;
}
</style>
