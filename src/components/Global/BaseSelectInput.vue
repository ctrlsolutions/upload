<template>
  <div class="dropdown-container">
    <label v-if="label" class="dropdown-label">{{ label }}</label>
    <select v-model="selectedValue" class="dropdown" :style="dropdownStyle">
      <option value="" disabled class="placeholder">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="dropdown-option"
      >
        {{ option.label }}
      </option>
    </select>
    <v-icon name="bi-caret-down-fill" class="dropdown-icon" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';

const props = defineProps<{
  options: { value: string; label: string }[];
  placeholder?: string;
  width?: string | null;
  label?: string; // Add a label prop
}>();

const selectedValue = ref('');

const dropdownStyle = computed(() => ({
  ...(props.width ? { width: props.width } : {}),
}));
</script>

<style lang="scss" scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdown-label {
  font-size: small;
  font-weight: bold;
  color: #6f6f6f;
  display: block;
  text-align: left;
  margin-bottom: 0.3rem; /* Match the styling from SignUpPage.vue */
}

.dropdown {
  font-family: 'Inter', serif;
  font-weight: bold;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0.5rem 2.5rem 0.5rem 0.8rem;
  border: 0.15px solid $red;
  border-radius: 0.6rem;
  cursor: pointer;
  color: $red;
  width: 100%;
  height: 2.4rem;
  position: relative;
  background-color: transparent;

  &:not([value='']) {
    color: $red;
    font-weight: bold;
  }
}

.dropdown:focus {
  outline: none;
}

.placeholder {
  &:disabled {
    font-style: italic;
    color: gray;
  }
}

.dropdown option {
  color: $red;
  font-family: inherit !important;
}

.dropdown-icon {
  position: absolute;
  right: 0.5rem;
  top:72%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  fill: $red;
  pointer-events: none;
}
</style>