<template>
  <div v-if="visible" class="toast" :class="type">
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const type = ref('success') // Can be "success", "error", "info"

const showToast = (msg, toastType = 'success', duration = 3000) => {
  message.value = msg
  type.value = toastType
  visible.value = true

  setTimeout(() => {
    visible.value = false
  }, duration)
}

// Expose `showToast` so the parent component can call it
defineExpose({ showToast })
</script>

<style>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  opacity: 0.9;
  transition: opacity 0.3s ease-in-out;
}
.toast.success {
  background-color: #28a745;
} /* Green */
.toast.error {
  background-color: #dc3545;
} /* Red */
.toast.info {
  background-color: #007bff;
} /* Blue */
</style>
