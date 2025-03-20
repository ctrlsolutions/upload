<template>
  <div class="dropdown-container">
    <select
      :value="props.modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="dropdown"
      :style="dropdownStyle"
    >
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
    <v-icon name="bi-caret-down-fill" class="dropdown-icon" :style="iconStyle" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  options: { value: string; label: string }[]
  placeholder?: string
  width?: string | null
  textColor?: string
  borderColor?: string
  modelValue: string // Add this for two-way binding
}>()

const emit = defineEmits(['update:modelValue'])

const dropdownStyle = computed(() => ({
  ...(props.width ? { width: props.width } : {}),
  color: props.textColor || 'inherit',
  borderColor: props.borderColor || 'inherit',
}))

const iconStyle = computed(() => ({
  fill: props.textColor || 'inherit',
}))
</script>

<style lang="scss" scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
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
  padding: 0.5rem 2.5rem 0.5rem 0.8rem;
  border: 0.15rem solid $red;
  border-radius: 0.8rem;
  cursor: pointer;
  color: $red;
  width: 100%;

  @include sm {
    width: 10rem;
    font-size: 1em;
  }

  @include md {
    width: 15rem;
    font-size: 1em;
  }

  @include lg {
    width: 20rem;
    font-size: 1.3em;
  }

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
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  fill: $red;
  pointer-events: none;
}
</style>
