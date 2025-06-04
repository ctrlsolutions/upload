<template>
  <button :class="['form-button', variantClass]" :style="buttonStyle" v-bind="$attrs" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    route?: string
    variant?: string
    width?: string
    height?: string
    type?: string
  }>(),
  {
    variant: 'red',
    width: 'null',
    height: 'auto',
  },
)

const emit = defineEmits<{
  (e: 'click'): void
}>()

const router = useRouter()

const handleClick = () => {
  emit('click')

  if (props.route) {
    router.push(props.route)
  }
}

const variantClass = computed(() => (props.variant ? `form-button--${props.variant}` : ''))

const buttonStyle = computed(() => {
  const styles: Record<string, string> = {
    height: props.height,
  }

  if (props.width) {
    styles.width = props.width
  }

  return styles
})
</script>

<style lang="scss">
@use 'sass:color';

.form-button {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  border-radius: $base-br;
  padding: 0.7em 5em;
  color: $white;
  font-weight: 800;
  font-size: 0.8rem;
  font-family: 'Inter', sans-serif;
  text-align: center;
}

.form-button--red {
  background-color: $red;
  &:hover {
    background-color: color.scale($red, $lightness: 10%);
  }
}

.form-button--green {
  background-color: $green;
  &:hover {
    background-color: color.scale($green, $lightness: 5%);
  }
}

.form-button--black {
  background-color: $black;
  &:hover {
    background-color: color.scale($black, $lightness: 10%);
  }
}

.form-button:focus {
  outline: 0.125rem solid $black;
  outline-offset: 0.125rem;
}
</style>
