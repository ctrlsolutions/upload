<template>
  <button :class="['nav-button', variantClass]" @click="navigate" :style="buttonStyle">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    route: string
    variant?: string
    width?: string
    height?: string
  }>(),
  {
    variant: 'empty',
    width: 'null',
    height: 'auto',
  },
)

const router = useRouter()
const navigate = () => {
  router.push(props.route)
}

const variantClass = computed(() => `nav-button--${props.variant}`)

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

<style lang="scss" scoped>
.nav-button {
  font-family: 'Inter', serif;
  display: flex;
  border-radius: 35px;
  cursor: pointer;
  white-space: nowrap;
  font-weight: 800;
  justify-content: center;
  align-self: center;
  width: 100%;
  font-size: 1em;
  padding: 0.25em 0.5em;
}

.nav-button--red-full {
  background-color: $red;
  color: white;
  border: 0.2rem solid $red;
}

.nav-button--green-full {
  background-color: $green;
  color: white;
  border: 0.2rem solid $green;
}

.nav-button--red-outline {
  background-color: white;
  color: $red;
  border: 0.2rem solid $red;
}

.nav-button--green-outline {
  background-color: white;
  color: $green;
  border: 0.2rem solid $green;
}

.nav-button--empty {
  background-color: transparent;
  color: #1e1e1e;
  border: none;
}
</style>
