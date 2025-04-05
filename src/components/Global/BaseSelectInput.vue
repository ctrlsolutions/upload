<template>
  <label v-if="label" class="dropdown-label">{{ label }}</label>
  <div class="dropdown-container">
    <select v-model="selectedValue" class="dropdown" :style="dropdownStyle" @change="handleChange">
      <slot></slot>
    </select>
    <v-icon name="bi-caret-down-fill" class="dropdown-icon" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  placeholder?: string
  width?: string | null
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])

function handleChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
}

const dropdownStyle = computed(() => ({
  ...(props.width ? { width: props.width } : {}),
}))
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
  margin-bottom: 0.3rem;
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

.dropdown {
  display: flex;
  background-color: transparent;
  text-overflow: ellipsis;
  font-family: 'Inter', serif;
  font-weight: bold;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 0.5rem 0rem 0.5rem 0.8rem;
  border: 0.15px solid $red;
  border-radius: 0.6rem 0 0 0.6rem;
  cursor: pointer;
  color: $red;
  flex-grow: 1;
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
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  fill: $red;
  pointer-events: none;
  border: 0.15px solid $red;
  border-left: none;
  border-radius: 0 0.6rem 0.6rem 0;
  height: 100%;
  padding: 2%;
  width: auto;
}
</style>
