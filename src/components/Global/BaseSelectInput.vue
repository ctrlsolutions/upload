<template>
  <div>
    <label v-if="label" class="dropdown-label">{{ label }}</label>
    <div class="dropdown-container">
      <select v-model="selectedValue" class="dropdown" :style="dropdownStyle" @change="handleChange">
        <slot></slot>
      </select>
      <v-icon name="bi-caret-down-fill" class="dropdown-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  placeholder?: string
  width?: string | null
  label?: string
}>()

const selectedValue = ref('')

function handleChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
}

const dropdownStyle = computed(() => ({
  ...(props.width ? { width: props.width } : {}),
}))
</script>

<style lang="scss" scoped>
@use 'sass:color';
.dropdown-label {
  display: block;
  box-sizing: border-box;
  margin-left: 0.3rem;
  width: 100%;
  color: color.scale($black, $lightness: 40%);
  font-weight: $base-fw;
  font-size: $base-fs;
  text-align: left;
}

.dropdown-container {
  display: inline-block;
  position: relative;
  width: 100%;
}

.dropdown {
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  border: $base-bt solid $red;
  border-radius: $base-br;
  background-color: transparent;
  padding: $component-padding;
  overflow: hidden;
  color: $red;
  font-weight: $base-fw;
  font-size: $base-fs;
  font-family: 'Inter', serif;
  text-overflow: ellipsis;

  &:not([value='']) {
    color: $red;
    font-weight: $base-fw;
  }
  &:focus {
    outline: none;
  }
}

.placeholder {
  &:disabled {
    color: gray;
    font-style: italic;
  }
}

.dropdown option {
  color: $red;
  font-family: inherit !important;
}

// TODO: Spin icon when pressed
.dropdown-icon {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  font-size: 1.25em;
  fill: $red;
  pointer-events: none;
}
</style>
