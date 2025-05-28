<template>
  <div :style="{ width: width }">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="input-wrapper">
      <input
        ref="inputRef"
        type="date"
        class="date-input"
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <div class="dropdown-toggle">
        <v-icon name="bi-calendar" class="dropdown-toggle" @click="openDatePicker" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputRef = ref<HTMLInputElement | null>(null)

const props = withDefaults(
  defineProps<{
    width?: string
    modelValue?: string
    label?: string
  }>(),
  {
    width: '100%',
  },
)

const openDatePicker = () => {
  if (inputRef.value?.showPicker) {
    inputRef.value.showPicker()
  } else {
    inputRef.value?.click()
  }
}
</script>

<style lang="scss" scoped>
@use 'sass:color';

.label {
  display: block;
  margin-left: 0.3rem;
  color: color.scale($black, $lightness: 40%);
  font-weight: $base-fw;
  font-size: $base-fs;
  text-align: left;
}

.input-wrapper {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  text-overflow: ellipsis;
}

.date-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: text;
  border: $base-bt solid $red;
  border-radius: $base-br;
  padding: $component-padding;
  width: 100%;
  color: $red;
  font-weight: $base-fw;
  font-size: $base-fs;
  font-family: 'Inter', sans-serif;
  text-align: left;
  &:focus {
    outline: none;
    border-color: $red;
  }
  &::-moz-calendar-picker-indicator {
    display: none;
  }
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    right: 0;
    opacity: 0;
    cursor: pointer;
    width: 20%;
    height: 100%;
  }
}

.dropdown-toggle {
  display: flex;
  position: absolute;
  top: 50%;
  right: 0.3rem;
  align-items: center;
  transform: translateY(-50%);
  opacity: 0.8;
  z-index: 100;
  transition: opacity 0.3s ease;
  cursor: pointer;
  pointer-events: auto;
  color: $red;
  &:hover {
    opacity: 1;
  }
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
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    cursor: pointer;
    width: 2rem;
    height: 1.5rem;
    pointer-events: auto;
  }
}
</style>
