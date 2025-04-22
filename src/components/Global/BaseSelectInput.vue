<template>
  <div class="dropdown-container">
    <select
      :key="computedValue"
      :value="computedValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="dropdown"
      :style="dropdownStyle"
    >
      <option
        v-for="(option, index) in formattedOptions"
        :key="index"
        :value="option.value"
        class="dropdown-option"
      >
        {{ option.label }}
      </option>
    </select>
    <v-icon name="bi-caret-down-fill" class="dropdown-icon" />
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, computed, watch } from 'vue'

  const props = defineProps<{
    modelValue: string
    options: { value: string; label: string }[] | string[]
    width?: string | null
  }>()

  const emit = defineEmits(['update:modelValue'])

  const dropdownStyle = computed(() => ({
    ...(props.width ? { width: props.width } : {}),
  }))

  // Normalize options
  const formattedOptions = computed(() => {
    if (Array.isArray(props.options) && typeof props.options[0] === 'string') {
      return props.options.map(option => ({ value: option, label: option }))
    }
    return props.options
  })

  // Emit first value if modelValue is empty
  watch(() => props.options, () => {
    if (!props.modelValue && formattedOptions.value.length > 0) {
      emit('update:modelValue', String(formattedOptions.value[0].value))
    }
  }, { immediate: true })

  // Compute currently selected value
  const computedValue = computed(() => {
    return props.modelValue || (formattedOptions.value.length > 0 ? formattedOptions.value[0].value : '')
  })
</script>



<style lang="scss" scoped>
.dropdown-container {
  position: relative;
  display: flex;

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
