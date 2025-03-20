<template>
  <input
    :id="id"
    :type="type"
    class="input-box"
    :style="boxStyle"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
  />
</template>


<script>
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
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: 'inherit',
    },
    borderColor: {
      type: String,
      default: 'inherit',
    },
  },
  computed: {
    boxStyle() {
      return {
        width: this.width || 'auto',
        height: this.height || 'auto',
        color: this.textColor,
        borderColor: this.borderColor,
        borderStyle: 'solid',
        '--placeholder-color': this.textColor,
      };
    },
  }
}
</script>

<style lang="scss" scoped>
.input-box {
  font-family: 'Inter', serif;
  height: fit-content;
  border-radius: 0.6rem;

  @include sm {
    width: 15rem;
    padding: 0.6rem 0.6rem;
    font-size: 1em;
  }
  @include md {
    width: 18rem;
    padding: 0.6rem 0.8rem;
    font-size: 1em;
  }
  @include lg {
    width: 20rem;
    padding: 0.6rem 1rem;
    font-size: 1.3em;
  }

  &::placeholder {
    color: var(--placeholder-color, #999); // Use the variable for dynamic color
    opacity: 0.7;
  }
}
</style>
