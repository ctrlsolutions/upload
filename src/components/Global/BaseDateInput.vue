<template>
  <div class="date-picker" :style="{ width: width }">
    <div class="input-wrapper">
      <input
        ref="inputRef"
        type="date"
        class="date-input"
        placeholder=""
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
  modelValue: String,
  placeholder: String // Placeholder prop defined but not used by input type="date"
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
/* Assuming $red is defined globally or replace with a specific color value */
$red: #e53e3e; // Example definition

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
  padding-left: 0.8rem;
  padding-right: 2.5rem; /* Adjusted padding for icon */
  margin-right: 0.1rem;
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
  border-color: $red; /* Consider darkening on focus: darken($red, 10%) */
}

/* Hide the default webkit calendar picker */
.date-input::-webkit-calendar-picker-indicator {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  right: 0;
  width: 100%; /* Make the whole input clickable for the picker */
  height: 100%;
  background: transparent; /* Ensure it's truly invisible */
  border: none;
}

/* Hide the default moz calendar picker */
.date-input::-moz-calendar-picker-indicator {
  display: none;
}

.dropdown-toggle {
  position: absolute;
  top: 50%;
  right: 0.5rem; /* Adjusted position */
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: auto; /* Allow clicks on the icon */
  z-index: 1; /* Position above input */
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  color: $red;
}

.dropdown-toggle:hover {
  opacity: 1;
}

/* Original @supports blocks - may conflict with appearance:none and custom icon */
/*
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
    // display: block; // This would show the native Firefox picker if not hidden above
  }
}
*/
</style>
