<template>
  <div class="login-container">
    <div class="login-header">
      <h1>Log in</h1>
    </div>
    <p>Welcome! Log in to access your dashboard.</p>
    <div class="input-group">
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
    </div>

    <div class="forgot-password">
      <a href="#" class="forgotp">Forgot Password?</a>
    </div>
    <div class="login-button">
      <BaseFormButton variant="green" width="100%" @click="validateForm"
        >LOG IN</BaseFormButton
      >
    </div>
    <div class="or-text">
      <p>OR</p>
    </div>
    <form class="cont-google">
      <BaseFormButton variant="red" width="100%"
        ><v-icon name="fc-google" scale="1.2"></v-icon
        ><span class="google">CONTINUE WITH GOOGLE</span></BaseFormButton
      >
    </form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'

export default {
  components: {
    BaseTextInput,
    BaseFormButton,
  },

  setup() {
    const form = reactive({
      email: '',
      password: '',
    })

    const errors = reactive({
      email: '',
      password: '',
    })

    const hasAttemptedSubmit = ref(false)

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

    const clearError = field => {
      errors[field] = ''
    }

    return {
      form,
      errors,
      hasAttemptedSubmit,
      validateForm,
      clearError,
    }
  },
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
