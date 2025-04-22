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
        <v-icon name="bi-calendar" class="dropdown-toggle" @click="openDatePicker" />
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
  if (inputRef.value?.showPicker) {
    inputRef.value.showPicker()
  } else {
    inputRef.value.click()
  }
}
</script>

<style lang="scss" scoped>
.date-picker {
  margin-top: -0.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.date-input {
  width: 100%;
  font-weight: 900;
  height: 2.4rem;
  border: 0.15px solid $red;
  background: transparent;
  cursor: text;
  border-radius: 0.6rem;
  text-align: left;
  padding-left: 2.3rem;
  padding-right: 0.5rem;
  margin-right: 0.1rem;
  margin-left: 0.7rem;
  font-size: 0.8rem;
  line-height: 2rem;
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
  opacity: 0;
  cursor: pointer;
  position: absolute;
  right: 0;
  width: 20%;
  height: 100%;
}

.date-input::-moz-calendar-picker-indicator {
  display: none;
}

.dropdown-toggle {
  position: absolute;
  top: 50%;
  right: 0.3rem;
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

@supports (-moz-appearance: none) {
  .dropdown-toggle {
    display: none;
  }
}
@supports (-moz-appearance: none) {
  .date-input {
    position: relative;
    padding-right: 1rem;
  }

  .date-input::-moz-calendar-picker-indicator {
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    height: 1.5rem;
    width: 2rem;
    pointer-events: auto;
    cursor: pointer;
  }
}
</style>