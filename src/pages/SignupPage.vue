<template>
  <div class="signup-container">
    <h1 class="title">Sign up</h1>
    <p class="subtitle">New here? Create a new account below.</p>

    <div class="form-wrapper">
      <form class="signup-form">
        <InputField id="email" type="text" placeholder="Email" variant = "red" width ="100%" />
        <InputField id="password" type="text" placeholder="Password" variant="red" width="100%" />
        <InputField id="re-password" type="text" placeholder="Re-enter password" variant="red" width="100%" />

        <div class="separator"></div>

        <div class="name-fields">
          <InputField id="first-name" type="text" placeholder="First name" variant = "red" width ="100%" />
          <InputField id="middle-name" type="text" placeholder="Middle name" variant="red" width="100%" />

        </div>
        <InputField id="last-name" type="text" placeholder="Last name" variant="red" width="100%" />

        <div class="radio-group">
          <label class="label">Sex</label>
          <FormRadio id="male" label="Male" v-model="selectedSex" />
          <FormRadio id="female" label="Female" v-model="selectedSex" />
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
      </form>
    </div>

    <div class="button-group">
      <FormButton variant="black" width="12rem">CANCEL</FormButton>
      <FormButton variant="red" width="12rem">SUBMIT</FormButton>
    </div>

    <p class="or-text">OR</p>
    <FormButton variant="red" width="25rem">CONTINUE WITH GOOGLE</FormButton>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import FormRadio from '@/components/Global/BaseFormRadio.vue';
import InputField from '@/components/Global/BaseTextInput.vue';
import FormButton from '@/components/Global/BaseFormButton.vue';
import BaseDateInput from "@/components/Global/BaseDateInput.vue";

const selectedDate = ref('')

const selectedSex = ref('male');
</script>


<style lang="scss" scoped>

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
  gap:1.2rem;
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
  opacity:80%;
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

.subtitle{
  font-weight:800;
  color:#6f6f6f;
}

</style>
