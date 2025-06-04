<template>
  <Field :name="name" v-slot="{ field, errors }" validate-on-input validate-on-blur>
    <div>
      <label v-if="label" class="label">{{ label }}</label>
      <div class="wrapper" :class="dynamicWrapperClasses" :style="boxStyle">
        <select 
          ref="inputRef" 
          v-model="selectedValue" 
          class="dropdown" 
          :class="dynamicDropdownClasses"
          @change="handleInput"
        >
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
import { ref, defineProps, computed, withDefaults } from 'vue'

interface Props {
  name: string
  width?: string | null
  label?: string
  variant?: 'filled' | 'outline'
  color?: 'red' | 'green'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline', // Default variant
  color: 'red',       // Default color
})

const emit = defineEmits(['update:modelValue'])

const dynamicWrapperClasses = computed(() => {
  return [
    `variant-${props.variant}`, // e.g., 'variant-filled'
    `color-${props.color}`,     // e.g., 'color-red'
  ];
});

const dynamicDropdownClasses = computed(() => {
  return [
    `variant-${props.variant}`,
    `color-${props.color}`,
  ];
});

const selectedValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

function handleInput(event: Event) {
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

const boxStyle = computed(() => ({
  ...(props.width ? { width: props.width } : {}),
}))
</script>

<style lang="scss" scoped>
@use 'sass:color';

.label {
  display: block;
  box-sizing: border-box;
  margin-left: 0.3rem;
  color: color.scale($black, $lightness: 40%);
  font-weight: $base-fw;
  font-size: $base-fs;
  text-align: left;
}

.wrapper {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 6fr 1fr;
  gap: 0px 0px;
  cursor: pointer;
  margin: 0;
  border-radius: $base-br;
  height: 100%;
  background-color: transparent;
  border: $base-bt transparent;

  &.variant-outline {
    background-color: transparent;
    &.color-red {
      border: $base-bt solid $red;
      // &:has(select:focus) { border: 2.5px solid $red; }
    }
    &.color-green {
      border: $base-bt solid $green;
      // &:has(select:focus) { border: 2.5px solid $green; }
    }
  }

  &.variant-filled {
    &.color-red {
      background-color: $red;
      border: $base-bt solid $red;
      // &:has(select:focus) { border: 2.5px solid color.scale($red, $lightness: -20%); }
    }
    &.color-green {
      background-color: $green;
      border: $base-bt solid $green;
      // &:has(select:focus) { border: 2.5px solid color.scale($green, $lightness: -20%); }
    }
  }
}

.dropdown {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  border: 0;
  border-radius: $base-br;
  background-color: transparent;
  padding: $component-padding;
  max-width: 100%;
  height: $base-height;
  overflow: hidden;
  font-weight: $base-fw;
  font-size: $base-fs;
  font-family: 'Inter', sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:focus {
    outline: none;
  }

  &.variant-outline {
    &.color-red {
      color: $red;
      &:not([value='']) { color: $red; }
    }
    &.color-green {
      color: $green;
      &:not([value='']) { color: $green; }
    }
  }

  &.variant-filled {
    &.color-red {
      color: $white;
      &:not([value='']) { color: $white; }
    }
    &.color-green {
      color: $white;
      &:not([value='']) { color: $white; }
    }
  }
}

.dropdown option {
  font-family: inherit !important;
  // background-color: $white;
  // color: $black;

  // Styling for outline variant options
  .dropdown.variant-outline.color-red & {
    color: $red;
    // background-color: $white; // Explicitly white if needed, or inherit
  }
  .dropdown.variant-outline.color-green & {
    color: $green;
    // background-color: $white; // Explicitly white if needed, or inherit
  }

  // Styling for filled variant options
  .dropdown.variant-filled.color-red & {
    // background-color: $red;
    color: $white; // Ensure contrast
  }
  .dropdown.variant-filled.color-green & {
    // background-color: $green;
    color: $white; // Ensure contrast
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

.icon-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0em 0.25em;
}

.wrapper.variant-outline.color-red .icon-toggle { color: $red; }
.wrapper.variant-outline.color-green .icon-toggle { color: $green; }

.wrapper.variant-filled.color-red .icon-toggle { color: $white; }
.wrapper.variant-filled.color-green .icon-toggle { color: $white; }

</style>