<template>
  <Field :name="name" v-slot="{ field, errors }" validate-on-input validate-on-blur>
    <div>
      <label v-if="label" class="label">{{ label }}</label>
      <div class="input-wrapper">
        <input ref="inputRef" type="date" class="date-input" v-bind="$attrs" @input="handleInput" />
        <div class="dropdown-toggle">
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

const props = withDefaults(
  defineProps<{
    name: string
    width?: string
    label?: string
  }>(),
  {
    width: '100%',
  },
)

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
  border: $base-bt solid $red;
  border-radius: $base-br;
  padding: $component-padding;
  width: 100%;
  text-overflow: ellipsis;
}

.date-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: text;
  border: 0;
  border-radius: $base-br;
  width: 100%;
  height: 100%;
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
  align-self: center;
  transition: opacity 0.3s ease;
  cursor: pointer;
  background-color: yellow;
  color: $red;
  &:hover {
    opacity: 1;
  }
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
