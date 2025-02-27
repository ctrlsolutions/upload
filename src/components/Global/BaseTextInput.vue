<template>
  <input
    :id="name"
    :name="name"
    :type="type"
    :class="['input-box', variantClass]"
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
    name: {
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
    modelValue: String,
  },
  computed: {
    variantClass() {
      return `input-box--${this.variant}`;
    },
    boxStyle() {
      const styles = {
        height: this.height,
      };
      if (this.width) {
        styles.width = this.width;
      }
      return styles;
    },
  },
};
</script>


<style lang="scss" scoped>
  .input-box {
    font-family: "Inter", serif;
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
      color: #999;
      opacity: 0.7;
    }

    &--red {
      font-size:0.9rem;
      border: 0.08rem $red;
      border-style: solid;
      outline: none;
      font-weight: 850;
      color: $red;

      &::placeholder {
        color: $red;
      }
    }

    &--green {
      border: 0.15rem $green;
      border-style: solid;
      outline: none;
      font-weight: bold;
      color: $green;

      &::placeholder {
        color: $green;
      }
    }
  }

</style>
