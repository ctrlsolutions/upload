<template>
  <div class="date-picker" :style="{ width: width }">
    <div class="input-wrapper">
      <input
        ref="inputRef"
        type="date"
        class="date-input"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div class="dropdown-toggle">
        <v-icon name="bi-calendar" class="dropdown-toggle" @click="openDatePicker"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputRef = ref(null)

const props = defineProps({
  width: {
    type: String,
    default: '12.5rem'
  },
  modelValue: String
})

defineEmits(['update:modelValue'])

const openDatePicker = () => {
  inputRef.value?.showPicker?.() || inputRef.value?.focus()
}
</script>

<style lang="scss" scoped>
.date-picker {
  margin: 0 auto;
  padding: 0.9375rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
}

.date-input {
  width: 100%;
  font-weight: 900;
  height: 2.4rem;
  // text-align: left;
  border: 0.1111rem solid $red;
  background: transparent;
  cursor: text;
  border-radius: 0.625rem;
  padding: 0.75rem;
  padding-left: 2.7rem;
  color: rgba(117, 17, 19, 0.7);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-family: 'Inter', sans-serif;
}

.date-input:focus {
  outline: none;
  border-color: $red;
}

.date-input::-webkit-calendar-picker-indicator {
  display: none;
}

.dropdown-toggle {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: auto;
  z-index: 100;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  color: $red;
}

.dropdown-toggle:hover {
  opacity: 1;
}
</style>