<template>
  <Field :name="name" v-slot="{ field, errors }" validate-on-input validate-on-blur>
    <div>
      <label v-if="label" class="label">{{ label }}</label>
      <div class="wrapper">
        <input ref="inputRef" type="date" class="date-input" v-bind="$attrs" @input="handleInput" />
        <div class="icon-toggle">
          <v-icon name="bi-calendar" @click="openDatePicker" />
        </div>
      </div>
    </div>
    <p v-if="errors" class="input-error" @blur="console.log(errors)">{{ errors[0] }}</p>
  </Field>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate'
import { computed, ref } from 'vue'
const inputRef = ref<HTMLInputElement | null>(null)

const props = defineProps<{
  name: string
  width?: string | null
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    emit('update:modelValue', target.value)
  }
}

const openDatePicker = () => {
  if (inputRef.value?.showPicker) {
    inputRef.value.showPicker()
  } else {
    inputRef.value?.click()
  }
}

const boxStyle = computed(() => ({
  width: props.width ?? undefined,
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
  // position: relative;
  // justify-content: space-between;
  // align-items: center;
  cursor: pointer;
  border: $base-bt solid $red;
  border-radius: $base-br;
  // padding: $component-padding;
  // background-color: yellow;
  width: 100%;
  height: 100%;
  // text-overflow: ellipsis;
  &:has(input:focus) {
    border: 2.5px solid $red;
  }
}

.date-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  all: unset;
  cursor: text;
  border: 0;
  border-radius: $base-br;
  background-color: transparent;
  // width: 100%;
  padding: $component-padding;
  // height: 100%;
  color: $red;
  font-weight: $base-fw;
  font-size: $base-fs;
  font-family: 'Inter', sans-serif;
  text-overflow: ellipsis;
  // background-color: red;
  text-align: left;
  &:focus {
    outline: none;
    border-color: $red;
  }
  &::-moz-calendar-picker-indicator {
    display: none;
  }
  &::-webkit-calendar-picker-indicator {
    display: none;
  }
  &:focus {
    outline: none;
  }
}

.icon-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
  cursor: pointer;
  // background-color: yellow;
  padding: 0em 0.25em;
  color: $red;
  margin: 0;
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

@supports (-moz-appearance: none) {
  .icon-toggle {
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
