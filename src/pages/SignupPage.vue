<template>
  <form class="signup-container" v-on:submit.prevent="submitForm">
    <h1 class="title">Sign up</h1>
    <p class="subtitle">New here? Create a new account below.</p>

    <div class="form-wrapper">
      <form class="signup-form">
        <InputField
          id="email"
          type="text"
          placeholder="Email"
          variant="red"
          width="100%"
        />
        <p v-if="signupError" class="text-red-600 text-sm mt-1">{{ signupError }}</p>
        <InputField
          id="password"
          type="password"
          placeholder="Password"
          variant="red"
          width="100%"
        />
        <InputField
          id="re-password"
          type="password"
          placeholder="Re-enter password"
          variant="red"
          width="100%"
        />

        <p v-if="passwordError" class="text-red-600 text-sm mt-1">{{ passwordError }}</p>

        <div class="separator"></div>

        <div class="name-fields">
          <InputField
            id="first-name"
            type="text"
            placeholder="First name"
            variant="red"
            width="100%"
          />
          <InputField
            id="middle-name"
            type="text"
            placeholder="Middle name"
            variant="red"
            width="100%"
          />
        </div>
        <InputField
          id="last-name"
          type="text"
          placeholder="Last name"
          variant="red"
          width="100%"
        />

        <div class="radio-group">
          <label class="label">Sex</label>
          <FormRadio id="M" label="Male" v-model="userData.sex" value="M" />
          <FormRadio id="F" label="Female" v-model="userData.sex" value="F" />
        </div>

        <div class="dob-group">
          <label class="label">Date of Birth</label>
          <BaseDateInput
            v-model="selectedDate"
            width="15rem"
            :min="'2000-01-01'"
            :max="'2020-12-31'"
          />
        </div>
        
        <p v-if="signupSuccess" class="text-green-600 text-sm mt-2">{{ signupSuccess }}</p>
      
      </div>
    </div>
    
    
    <div class="button-group">
      <FormButton variant="black" width="12rem">CANCEL</FormButton>
      <FormButton variant="red" width="12rem" @click="submitForm">SUBMIT</FormButton>
    </div>


    <p class="or-text">OR</p>
    <GoogleLogin :callback="googleSignUp" prompt popup-type="TOKEN"
      ><FormButton variant="red" width="25rem" type="button"
        >CONTINUE WITH GOOGLE</FormButton
      ></GoogleLogin
    >
    <ExtraInfoModal
      v-if="showModal"
      :profile="googleProfile"
      @submit="submitToBackend"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FormRadio from '@/components/Global/BaseFormRadio.vue'
import InputField from '@/components/Global/BaseTextInput.vue'
import FormButton from '@/components/Global/BaseFormButton.vue'
import BaseDateInput from '@/components/Global/BaseDateInput.vue'
import ExtraInfoModal from '@/components/SignUp/ExtraInfoModal.vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const googleProfile = ref(null)
const accessToken = ref(null)
const showModal = ref(false)

const router = useRouter()

const googleSignUp = response => {
  console.log('GOOGLE LOGIN RESPONSE', response)

  accessToken.value = response.access_token

  showModal.value = true
}
// const extraInfo = ref(null)
const submitToBackend = async extraInfo => {
  console.log(extraInfo)
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_BASE_URL + '/user/google/signup/',
      {
        access_token: accessToken.value, // Send the Google token
        extra_info: extraInfo, // Include the extra user data
      },
    )

    console.log('Signup successful:', response.data)
    showModal.value = false // Close modal
  } catch (error) {
    console.error(
      'Error submitting form:',
      error.response?.data || error.message,
    )
  }
}

const userData = ref({
  email: '',
  password: '',
  password2: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  sex: '',
  birthdate: ''
});

const passwordError = ref(""); // Define passwordError as a reactive reference
const signupSuccess = ref("");  // Success message
const signupError = ref("");    // General error message
// Update functions for each input field
const updateEmail = (event) => {
  userData.value.email = event.target.value;
};
const updatePassword = (event) => {
  userData.value.password = event.target.value;
  validatePasswordMatch();
};
const updatePassword2 = (event) => {
  userData.value.password2 = event.target.value;
  validatePasswordMatch();
};
const updateFirstName = (event) => {
  userData.value.first_name = event.target.value;
};
const updateMiddleName = (event) => {
  userData.value.middle_name = event.target.value;
};
const updateLastName = (event) => {
  userData.value.last_name = event.target.value;
};
const sex = (event) => {
  userData.value.sex = event.target.value;
};
const birthdate = (event) => {
  userData.value.birthdate = event.target.value;
};

// Validate password match
const validatePasswordMatch = () => {
  passwordError.value = userData.value.password !== userData.value.password2 ? "Passwords do not match." : "";
};

const submitForm = async () => {
  signupSuccess.value = "";
  signupError.value = ""; 

  if (userData.value.password !== userData.value.password2) {
    passwordError.value = "Passwords do not match.";
    return;
  }

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/user/signup/',
      userData.value,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    signupSuccess.value = "Sign-up successful! Redirecting...";
    signupError.value = "";

    // Clear input fields
    userData.value = {
      email: '', password: '', password2: '',
      first_name: '', middle_name: '',
      last_name: '', sex: '', birthdate: ''
    };

    setTimeout(() => {
      window.location.href = "http://localhost:5173/auth/login";
    }, 2000);
  } catch (error) {
    if (error.response?.data) {
      // Check if there are field-specific errors
      const errors = error.response.data;
      
      if (errors.email) {
        signupError.value = errors.email[0]; // Show email error
      } else {
        signupError.value = "Sign-up failed. Please try again.";
      }
    } else {
      signupError.value = "Sign-up failed. Please try again.";
    }
  }
};

const selectedSex = ref('male')
</script>

<style lang="scss" scoped>
.text-red-600 {
  color: $red;
  margin-bottom: -1rem;
  margin-top: -0.5rem;
  margin-right: 2rem;
}
.BaseDateInput {
  margin-left: 100rem;
}

.radio-group {
  display: flex;
  align-items: center;
  gap: -0.5rem;
  margin: -0.5rem 0;
}

.signup-container {
  max-width: 25rem;
  margin: auto;
  text-align: center;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: -0.5rem 0rem;
}

.form-wrapper {
  max-height: 19.5rem;
  overflow-y: auto;
  padding-right: 1rem;
  margin-bottom: -2rem;
  margin-top: 2rem;
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

.form-wrapper::-webkit-scrollbar {
  width: 0.5rem;
}

.form-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.form-wrapper::-webkit-scrollbar-thumb {
  background: rgba($red, 0.5);
  border-radius: 1rem;
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.label {
  text-align: left;
  margin: 0.5rem 1rem;
  color: #6f6f6f;
  font-weight: bold;
}

.separator {
  align-self: center;
  width: 95%;
  height: 0.1rem;
  background-color: $red;
  margin: 0.5rem 0;
  opacity: 80%;
}

.name-fields {
  display: flex;
  gap: 0.5rem;
}

.dob-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: -1.5rem 0;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  position: sticky;
  bottom: 0;
  background: white;
  padding: -1rem 0;
}

.or-text {
  margin: -0.2rem 0;
  font-weight: bold;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}

.subtitle {
  font-weight: 800;
  color: #6f6f6f;
}
</style>
