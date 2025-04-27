<template>
  <div class="date-picker" :style="{ width: width }">
    <div class="input-wrapper" :data-placeholder="placeholder">
      <input
        ref="inputRef"
        type="date"
        :class="['date-input', { 'is-empty': !modelValue }]"
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
  placeholder: {
    type: String,
    default: 'Select a date' 
  }
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

  &::before {
    content: attr(data-placeholder); /* Display text from the data-placeholder attribute */
    position: absolute;
    left: 0.8rem; /* Align with input's left padding */
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.8rem; /* Match input font size */
    font-weight: 400; /* Lighter weight for placeholder */
    color: rgba(117, 17, 19, 0.5); /* Placeholder text color */
    pointer-events: none; /* Allow clicks to go through to the input */
    z-index: 1; /* Position above the input's native text */
    opacity: 0; /* Hide by default */
    transition: opacity 0.2s ease-in-out; /* Smooth fade */
    font-family: 'Inter', sans-serif; /* Ensure font matches */
    line-height: 2rem; /* Match input line-height */
  }

  /* Show the pseudo-placeholder when the input inside has the 'is-empty' class */
  /* Requires browser support for :has() */
  &:has(.date-input.is-empty)::before {
    opacity: 1;
  }
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
  padding-right: 0.5rem;
  margin-right: 0.1rem;
  // margin-left: 0.7rem;
  font-size: 0.8rem;
  line-height: 2rem;
  color: rgba(117, 17, 19, 0.7);
  -webkit-appearance: none;
  -moz-appearance: none;  
  appearance: none;
  font-family: 'Inter', sans-serif;
  
  /* When the input is empty, hide the browser's default date format text */
  &.is-empty {
    color: transparent !important; /* Make native text invisible */
  }

  /* When focused AND empty, keep the native text transparent but show the caret */
  &.is-empty:focus {
     color: transparent !important;
     caret-color: rgba(117, 17, 19, 0.7); /* Set cursor color explicitly */
  }

  /* Style the native date picker indicator to be invisible but clickable */
  &::-webkit-calendar-picker-indicator {
    opacity: 0; /* Make it invisible */
    position: absolute;
    right: 0;
    top: 0;
    width: 100%; /* Cover the input area */
    height: 100%;
    cursor: pointer;
    background: transparent;
    border: none;
    z-index: 2; /* Ensure it's above the pseudo-element */
  }

  /* Hide the default date picker indicator in Firefox */
  &::-moz-calendar-picker-indicator {
    display: none;
  }
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