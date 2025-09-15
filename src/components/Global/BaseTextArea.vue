<template>
  <div class="textarea-container">
    <textarea
      :id="id"
      :class="['textarea-box', variantClass]"
      :style="boxStyle"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      :rows="rows"
    ></textarea>
    <label :for="id" class="textarea-label">{{ placeholder }}</label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
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
    rows: {
      type: [String, Number],
      default: 4,
    },
  },
  computed: {
    variantClass() {
      return `textarea-box--${this.variant}`
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

<style lang="scss" scoped>
.textarea-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.textarea-box {
  font-family: 'Inter', serif;
  border-radius: 0.6rem;
  resize: vertical;
  min-height: 6rem;
  padding: 1rem;
  line-height: 1.5;
  
  @include sm {
    width: 15rem;
    padding: 0.8rem;
    font-size: 1em;
  }
  @include md {
    width: 18rem;
    padding: 1rem;
    font-size: 1em;
  }
  @include lg {
    width: 20rem;
    padding: 1.2rem;
    font-size: 1.1em;
  }

  &::placeholder {
    color: #999;
    opacity: 0.7;
  }

  &--red {
    font-size: 0.9rem;
    border: 0.15px solid $red;
    outline: none;
    font-weight: 850;
    color: $red;

    &::placeholder {
      color: transparent;
    }
  }

  &--green {
    border: 0.15px solid $green;
    outline: none;
    font-weight: bold;
    color: $green;

    &::placeholder {
      color: transparent;
    }
  }
}

.textarea-label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 1em;
  color: #999;
  pointer-events: none;
  transition: all 0.2s ease;
  background-color: white;
  padding: 0 0.4rem;
  z-index: 1000;

  &--red {
    color: $red;
  }

  &--green {
    color: $green;
  }
}

.textarea-box:focus + .textarea-label,
.textarea-box:not(:placeholder-shown) + .textarea-label {
  top: -0.5rem;
  font-size: 0.8em;
  transform: translateY(0);
}
</style>