<template>
  <div class="custom-checkbox-wrapper" :class="{ 'disabled': disabled, 'checked': modelValue }" @click="handleClick">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="handleChange"
      :disabled="disabled"
      class="custom-checkbox-input"
    />
    <label :for="id" class="custom-checkbox-label-container">
      <span class="custom-checkbox-box">
        <span v-if="modelValue" class="custom-checkbox-checkmark"></span>
        </span>
      <span v-if="label" class="custom-checkbox-text">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';

interface Props {
  modelValue: boolean; // For v-model, expecting a boolean
  id: string;          // Required for label association and uniqueness
  label?: string;       // Optional text label next to the checkbox
  disabled?: boolean;   // Optional to disable the checkbox
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  disabled: false,
});

const emit = defineEmits(['update:modelValue']);

const handleChange = (event: Event) => {
  if (!props.disabled) {
    emit('update:modelValue', (event.target as HTMLInputElement).checked);
  }
};

// Allow clicking on the wrapper/label to toggle, if not disabled
const handleClick = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue);
  }
};
</script>

<style lang="scss" scoped>
// Define your theme colors or use direct values
$primary-color: $red; // Example: Bootstrap Blue
$border-color: $red;
$disabled-bg-color: #e9ecef;
$disabled-border-color: #ced4da;
$text-color: #212529;
$checkmark-color: white;
$focus-outline-color: $red;

.custom-checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  position: relative; // For focus outline on the hidden input

  &.disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
}

.custom-checkbox-input {
  // Hide the default browser checkbox but keep it accessible
  opacity: 0;
  position: absolute;
  width: 1.25em; // Match the visual box size
  height: 1.25em;
  margin: 0;
  padding: 0;
  cursor: pointer; // Ensure it's still clickable

  &:disabled {
    cursor: not-allowed;
  }

  // Focus styling on the hidden input, shown on the custom box via sibling selector
  &:focus-visible + .custom-checkbox-label-container .custom-checkbox-box {
    outline: 2px solid $primary-color;
    outline-offset: 2px;
    box-shadow: 0 0 0 0.2rem $focus-outline-color;
  }
}

.custom-checkbox-label-container {
  display: flex;
  align-items: center;
  pointer-events: none; // Clicks are handled by the wrapper and the actual input
}

.custom-checkbox-box {
  width: 1.25em; // Approx 20px if base font-size is 16px
  height: 1.25em;
  border: 2px solid $border-color;
  border-radius: 0.25em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
  background-color: #fff;
  flex-shrink: 0; // Prevent shrinking if label text is long
}

.custom-checkbox-wrapper.checked .custom-checkbox-box {
  background-color: $primary-color;
  border-color: $primary-color;
}

.custom-checkbox-wrapper.disabled .custom-checkbox-box {
  background-color: $disabled-bg-color;
  border-color: $disabled-border-color;
}

// Simple CSS Checkmark (Unicode or border-based checkmark might be more common)
.custom-checkbox-checkmark {
  // This creates a checkmark using borders
  display: inline-block;
  transform: rotate(45deg) translateY(-1px) translateX(-1px); // Adjust for centering
  height: 0.65em;  // Approx 10px
  width: 0.35em;   // Approx 5px
  border-bottom: 0.125em solid $checkmark-color; // Approx 2px thick, color white
  border-right: 0.125em solid $checkmark-color;
  flex-shrink: 0;
}

/* Example using an SVG icon (if you had an icon component):
.custom-checkbox-checkmark-icon {
  color: $checkmark-color;
  width: 1em;
  height: 1em;
}
*/

.custom-checkbox-text {
  font-size: 1rem;
  color: $text-color;
  margin-left: 0.5em; // Space between checkbox and label text
  line-height: 1.25em; // Align with box height
}

.custom-checkbox-wrapper.disabled .custom-checkbox-text {
  color: $border-color;
}
</style>