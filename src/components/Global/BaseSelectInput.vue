<template>
  <label v-if="label" class="dropdown-label">{{ label }}</label>
  <div class="dropdown-container">
    <select
      v-model="selectedValue"
      :class="dropdownComputedClasses"
      :style="dropdownStyle"
      @change="handleChange"
    >
      <slot></slot>
    </select>
    <v-icon name="bi-caret-down-fill" class="dropdown-icon" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

interface Props {
  placeholder?: string
  width?: string | null
  label?: string
  modelValue?: string
  variant?: 'filled' | 'outline'
  color?: 'red' | 'green'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  color: 'red',
});

const dropdownComputedClasses = computed(() => {
  return [
    'dropdown', // Keep the base class
    `dropdown--variant-${props.variant}`,
    `dropdown--color-${props.color}`,
  ]
})

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

$text-on-red: #ffffff;
$text-on-green: #ffffff;
$neutral-text-color: #333333;

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
  // background-color: transparent;

  &:not([value='']) {
    color: $red;
    font-weight: bold;
  }

  border: 0.15px solid transparent; // Base border, color will be overridden

  &:focus {
    outline: none;
  }

  // --- Filled Variant ---
  &--variant-filled {
    &.dropdown--color-red {
      background-color: $red;
      border-color: $red;
      color: $text-on-red;

      & + .dropdown-icon { // Target sibling icon
        fill: $text-on-red;
      }
      option {
        color: $neutral-text-color; // Or $red if on light option background
        background-color: white;
      }
    }
    &.dropdown--color-green {
      background-color: $green;
      border-color: $green;
      color: $text-on-green;

      & + .dropdown-icon {
        fill: $text-on-green;
      }
      option {
        color: $neutral-text-color; // Or $green if on light option background
        background-color: white;
      }
    }
  }

  // --- Outline Variant ---
  &--variant-outline {
    background-color: transparent; // Or white

    &.dropdown--color-red {
      border-color: $red;
      color: $red;

      & + .dropdown-icon {
        fill: $red;
      }
      option {
        color: $red;
        background-color: white;
      }
    }
    &.dropdown--color-green {
      border-color: $green;
      color: $green;

      & + .dropdown-icon {
        fill: $green;
      }
      option {
        color: $green;
        background-color: white;
      }
    }
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

.dropdown option {
  font-family: inherit !important; // Keep this from original
  // Specific color/background handled by variant/color combo above
}

.dropdown-icon {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem;
  // fill: $red;
  pointer-events: none;
}

.placeholder {
  &:disabled {
    font-style: italic;
    color: gray; // This is browser-like default for disabled options
  }
}
</style>
