<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.stop="closeModal">
        <div class="modal-content" @click.stop>
          <div class="colored-header">
            <img src="@/assets/backgroundImages/Black-UP-Logo.svg" alt="logo" class="header-logo" />
          </div>
          <div class="modal-body">
            <h2>Logging in using Google?</h2>
            <p>Let's verify your account first</p>
            <form @submit.prevent="handleSubmit">
              <div class="input-group">
                <BaseTextInput
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  variant="green"
                  width="100%"
                  height="3.5rem"
                />
                <BaseTextInput
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Re-enter password"
                  variant="green"
                  width="100%"
                  height="3.5rem"
                />
              </div>
              <div class="button-group">
                <BaseFormButton
                  type="button"
                  variant="black"
                  width="100%"
                >
                  CANCEL
                </BaseFormButton>
                <BaseFormButton
                  type="submit"
                  variant="green"
                  width="100%"
                >
                  PROCEED
                </BaseFormButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseTextInput from "@/components/Global/BaseTextInput.vue";
import BaseFormButton from "@/components/Global/BaseFormButton.vue";

const props = defineProps<{
  isOpen: boolean
}>();

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'proceed', password: string): void
}>();

const password = ref('');
const confirmPassword = ref('');

const closeModal = () => {
  emit('close');
  password.value = '';
  confirmPassword.value = '';
};

const handleSubmit = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }
  emit('proceed', password.value);
  closeModal();
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  width: 95%; 
  max-width: 40rem; 
  box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
}

.colored-header {
  background: linear-gradient(90deg, $red, #821315, #8E1517, #A8181B, #D01C20);
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

.header-logo {
  height: 10rem;
  width: auto;
  margin-top: 5.7rem;
  margin-right: 1rem;
  overflow: hidden;
}

.modal-body {
  padding: 1.5rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 800;
    color: $black;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
  }
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 1.5rem;
  margin-top: 3rem;
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9rem;
  margin-top: 3rem;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>