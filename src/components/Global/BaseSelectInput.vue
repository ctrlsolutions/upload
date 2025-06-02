<template>
  <Field :name="name" v-slot="{ field, errors }" validate-on-input validate-on-blur>
    <div>
      <label v-if="label" class="label">{{ label }}</label>
      <div class="wrapper">
        <select id="" ref="inputRef" v-model="selectedValue" class="dropdown" :style="dropdownStyle" @change="handleChange">
          <slot></slot>
        </select>
        <div class="icon-toggle">
          <v-icon name="bi-caret-down-fill" @click="openDropdown" />
        </div>
      </div>
      <p v-if="errors" class="input-error">{{ errors[0] }}</p>
    </div>
  </Field>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate'
import { ref, defineProps, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  name: string
  width?: string | null
  label?: string
}>()

const selectedValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

function handleChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  emit('update:modelValue', value)
}

function openDropdown(event: Event) {
  if (inputRef.value?.showPicker) {
    inputRef.value.showPicker()
  } else {
    inputRef.value?.click()
  }
}

const dropdownStyle = computed(() => ({
  ...(props.width ? { width: props.width } : {}),
}))
</script>

<style lang="scss" scoped>
@use 'sass:color';
.label {
  display: block;
  box-sizing: border-box;
  margin-left: 0.3rem;
  width: 100%;
  color: color.scale($black, $lightness: 40%);
  font-weight: $base-fw;
  font-size: $base-fs;
  text-align: left;
}

.wrapper {
  // display: flex;
  display: grid; 
  grid-template-columns: 6fr 1fr; 
  grid-template-rows: 1fr; 
  gap: 0px 0px; 
  cursor: pointer;
  border: $base-bt solid $red;
  border-radius: $base-br;
  background-color: transparent;
  width: 100%;
  height: 100%;
  &:has(select:focus) {
    border: 2.5px solid $red;
  }
  margin: 0;
}

.dropdown {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: flex;
  justify-content: start;
  all: unset;
  cursor: pointer;
  border: 0;
  border-radius: $base-br;
  background-color: transparent;
  padding: $component-padding;
  // height: 100%;
  color: $red;
  font-weight: $base-fw;
  font-size: $base-fs;
  font-family: 'Inter', sans-serif;
  text-overflow: ellipsis;
  // background-color: blue;
  &:not([value='']) {
    color: $red;
  }
  &:focus {
    outline: none;
  }
}

.dropdown option {
  color: $red;
  font-family: inherit !important;
}

.input-error {
  margin: 0;
  padding: 0rem 0rem 0rem 0.5rem;
  color: $red;
  font-style: italic;
  font-weight: normal;
  font-size: small;
  text-align: left;
}

// TODO: Spin icon when pressed
.icon-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  // background-color: yellow;
  padding: 0em 0.25em;
  color: $red;
}
</style>
