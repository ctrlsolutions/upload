<template>
  <Field :name="name" v-slot="{ field, errors }" validate-on-input validate-on-blur>
    <div>
      <div class="input-container" :style="boxStyle">
        <input
          v-bind="field"
          :type="type"
          :class="['input-box', variantClass]"
          :style="boxStyle"
          :placeholder="placeholder"
          @input="handleInput"
        />
        <label :for="name" :class="['input-label', labelClass]">{{ placeholder }}</label>
      </div>
      <p v-if="errors" class="input-error">{{ errors[0] }}</p>
    </div>
  </Field>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  type?: string
  placeholder?: string
  variant?: string
  width?: string
}>()

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    emit('update:modelValue', target.value)
  }
}

const variantClass = computed(() => `input-box--${props.variant ?? 'default'}`)
const labelClass = computed(() => `input-label--${props.variant ?? 'red'}`)

const boxStyle = computed(() => ({
  width: props.width ?? undefined,
}))
</script>

<style lang="scss" scoped>
.input-container {
  display: inline-block;
  position: relative;
  width: 100%;
}

.input-box {
  border-radius: $base-br;
  padding: $component-padding;
  height: $base-height;
  font-weight: $base-fw;
  font-size: $base-fs;
  font-family: 'Inter', serif;

  &--red {
    outline: none;
    border: $base-bt solid $red;
    color: $red;

    &::placeholder {
      color: transparent;
    }

    &:focus {
      border: 2.5px solid $red;
    }
  }

  &--green {
    outline: none;
    border: $base-bt solid $green;
    color: $green;

    &::placeholder {
      color: transparent;
    }
    &:focus {
      outline-offset: 0.125rem;
      border: 4px $green;
    }
  }
}

.input-label {
  position: absolute;
  top: 50%;
  left: 0.6rem;
  transform: translateY(-50%);
  z-index: 2;
  transition: all 0.2s ease;
  background-color: white;
  padding: 0 0.4rem;
  pointer-events: none;
  font-weight: $base-fw;
  font-size: $base-fs;
  font-family: 'Inter', serif;

  &--red {
    color: $red;
  }

  &--green {
    color: $green;
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

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
}

.input-box:focus + .input-label,
.input-box:not(:placeholder-shown) + .input-label {
  top: 0;
  transform: translateY(-50%);
  font-size: 0.8em;
}
</style>
