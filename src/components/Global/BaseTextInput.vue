<template>
  <div class="input-container">
    <input
      :id="id"
      :type="type"
      :class="['input-box', variantClass]"
      :style="boxStyle"
      placeholder=" "
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      v-bind="$attrs"
    />
    <label :class="['input-label', variantClass]" :for="id">{{ placeholder }}</label>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: 'Placeholder',
    },
    variant: {
      type: String,
      default: 'red',
    },
    width: {
      type: String,
      default: 'null',
    },
    height: {
      type: String,
      default: 'null',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  computed: {
    variantClass() {
      return `input-box--${this.variant}`
    },
    boxStyle() {
      const styles = { height: this.height }
      if (this.width) {
        styles.width = this.width
      }
      return styles
    },
  },
}
</script>

<style scoped>
.input-container {
  position: relative;
  width: 100%;
  border: black 2px solid;
  border-radius: 0.6rem;
}

.input-box {
  font-family: 'Inter', serif;
  height: fit-content;
  border-radius: 0.6rem;
  background: transparent;
  width: 20rem;
  padding: 1rem 1rem 0.4rem;
  font-size: 1em;
  border: 1px solid black;
  background: white;
}

.input-box--red {
  font-size: 0.9rem;
  border: 1px solid var(--red);
  outline: none;
  font-weight: 600;
  color: var(--red);
}

.input-box--green {
  border: 1px solid var(--green);
  outline: none;
  font-weight: 600;
  color: var(--green);
}

.input-label {
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1em;
  transition: all 0.2s ease-out;
  pointer-events: none;
  padding: 0 0.4rem;
  background-color: white;
}

.input-box:focus ~ .input-label,
.input-box:not(:placeholder-shown) ~ .input-label {
  top: 0;
  font-size: 0.8em;
  transform: translateY(-50%);
  border: 2px solid var(--green);
}

.input-box--red ~ .input-label {
  color: var(--red);
}

.input-box--green ~ .input-label {
  color: var(--green);
}

:root {
  --red: #ff4444;
  --green: #4CAF50;
  --background-color: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #242424;
  }
}
</style>