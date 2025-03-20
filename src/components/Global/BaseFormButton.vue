<template>
  <div class="button-container">
    <button
      :class="['form-button', variantClass]"
      :style="buttonStyle"
      v-bind="attrs"
      @click="handleClick"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, useAttrs } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  route?: string
  variant?: string
  width?: string
  height?: string
  type?: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const router = useRouter()
const attrs = useAttrs() // Handles v-bind="$attrs"

const handleClick = () => {
  emit('click')

  if (props.route) {
    router.push(props.route)
  }
}

const variantClass = computed(() =>
  props.variant ? `form-button--${props.variant}` : '',
)

const buttonStyle = computed(() => ({
  width: props.width || 'auto',
  height: props.height || 'auto',
}))
</script>

<style lang="scss">
.form-button {
  border: none;
  border-radius: 0.8rem;
  padding: 0.9rem;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  color: $white;
  text-align: center;
  font-size: 1rem;
  margin-bottom: -0.3rem;
  margin-top: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  @include sm {
    width: 9rem;
    height: 0.5rem;
    font-size: .4rem
  }

  @include md {
    width: 13rem;
    height: 1rem;
    font-size: .7rem;
  }

  @include lg {
    width: 16.5rem;
    height: 2rem;
    font-size: .75rem;
  }

  @include xl {
    width: 16.5rem;
    height: 3.5rem;
    font-size: .75rem;
  }
}

.form-button--red {
  background-color: $red;
}

.form-button--green {
  background-color: $green;
}

.form-button--black {
  background-color: $black;
}

.form-button--gray {
  background-color: #D4D4D4;
  color: $black;
}

.form-button:hover {
  opacity: 0.9;
}

.form-button:focus {
  outline: 0.125rem solid $white;
  outline-offset: 0.125rem;
}
</style>
