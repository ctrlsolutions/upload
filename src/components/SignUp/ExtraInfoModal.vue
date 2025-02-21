<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div className="header">
        <img src="@/assets/up-logo.png" alt="uplogo" className="image-logo"/>
      </div>
      <div class="modal-content">
        <h1 class="modal-title">Before you proceed...</h1>
        <h5 class="modal-subtitle">We need a few more info from you.</h5>
        <form @submit.prevent="handleSubmit" class="form-container">
          <div class="input-container">
            <label class="label">Birthdate:</label>
            <BaseDateInput id="date" type="date" v-model="dob" placeholder="Birthdate" />
            <div class="gender-container">
              <label class="label">Sex:</label>
              <BaseFormRadio id="male" label="Male" v-model="gender" />
              <BaseFormRadio id="female" label="Female" v-model="gender" />
            </div>
          </div>

          <BaseTextInput id="password" type="password" v-model="password" placeholder="Password" class="password" />
          <BaseTextInput id="retype" type="password" v-model="password" placeholder="Re-enter password" class="retype"/>

          <h5 class="modal-subtitle">Please fill up the required fields and click proceed to continue.</h5>

          <div class="button-container">
            <BaseFormButton type="button" variant="black" route="" @click="closeModal">Cancel</BaseFormButton>
            <BaseFormButton type="submit" variant="red" route="" @click="handleSubmit">Proceed</BaseFormButton>
          </div>
          </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import BaseTextInput from '@/components/Global/BaseTextInput.vue';
import BaseFormRadio from '@/components/Global/BaseFormRadio.vue';
import BaseDateInput from '@/components/Global/BaseDateInput.vue';
import BaseFormButton from '@/components/Global/BaseFormButton.vue';

const emit = defineEmits(["close", "submit"]);

const password = ref('');
const gender = ref('');
const dob = ref('');
const retype = ref('');

const handleSubmit = () => {
  emit('submit', { password: password.value, gender: gender.value, dob: dob.value, retype: retype.value });
};

const closeModal = () => {
  emit('close');
};
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  background: linear-gradient(90deg, $green, #014421, #036A34, #036934, #058E46);
  height: 3.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
  position: relative;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  overflow: hidden;
}

.image-logo {
  width: 25%;
  margin-right: 1rem;
  overflow: hidden;
}

.modal-overlay {
  font-family: 'Inter', sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  margin-top: 0.8rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  text-align: left;
}

.modal-title {
  text-align: left;
  font-weight: 800;
}

.modal-subtitle {
  align-self: flex-start;
  font-weight: 700;
  color: rgb(85, 84, 84);
}

.modal-container {
  background: white;
  border-radius: 1.1rem;
  width: 40rem;
  height: 32rem;
  text-align: center;
}

.label {
  font-weight: 600;
  color: rgb(85, 84, 84);
}

.input-container {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}

.password {
  margin-bottom: 2rem;
  width: 100%;
  height: 3rem;
}

.retype {
  margin-bottom: 1rem;
  width: 100%;
  height: 3rem;
}

.gender-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}
</style>
