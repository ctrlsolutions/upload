<template>
  <div class="input-container">
    <input
      :id="id"
      :type="isPasswordVisible ? 'text' : type"
      :class="['input-box', variantClass]"
      :style="boxStyle"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
      v-bind="$attrs"
    />
    <label :for="id" class="input-label">{{ placeholder }}</label>
    <BiEyeSlashFill
      v-if="type === 'password' && isPasswordVisible"
      class="password-icon"
      @click="togglePasswordVisibility"
      aria-label="Hide password"
    />
    <BiEye
      v-if="type === 'password' && !isPasswordVisible"
      class="password-icon"
      @click="togglePasswordVisibility"
      aria-label="Show password"
    />
  </div>
</template>

<script>
import { BiEyeSlashFill, BiEye } from "oh-vue-icons/icons";

export default {
  components: {
    BiEyeSlashFill,
    BiEye,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "Placeholder",
    },
    variant: {
      type: String,
      default: "red",
    },
    width: {
      type: String,
      default: "null",
    },
    height: {
      type: String,
      default: "null",
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isPasswordVisible: false,
    };
  },
  computed: {
    variantClass() {
      return `input-box--${this.variant}`;
    },
    boxStyle() {
      const styles = { height: this.height };
      if (this.width) {
        styles.width = this.width;
      }
      return styles;
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

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
    color: #999;
    opacity: 0.7;
  }

  &--red {
    font-size: 0.9rem;
    border: 0.15px $red;
    border-style: solid;
    outline: none;
    font-weight: 850;
    color: $red;

    &::placeholder {
      color: transparent;
    }
  }

  &--green {
    border: 0.15px $green;
    border-style: solid;
    outline: none;
    font-weight: bold;
    color: $green;

    &::placeholder {
      color: transparent;
    }
  }
}

.input-label {
  position: absolute;
  top: 50%;
  left: 0.6rem;
  transform: translateY(-50%);
  font-size: 1em;
  color: #999;
  pointer-events: none;
  transition: all 0.2s ease;
  background-color: white;
  padding: 0 0.4rem;
  z-index: 1;

  &--red {
    color: $red;
  }

  &--green {
    color: $green;
  }
}

.input-box:focus + .input-label,
.input-box:not(:placeholder-shown) + .input-label {
  top: 0;
  font-size: 0.8em;
  transform: translateY(-50%);
}

.password-icon {
  position: absolute;
  top: 50%;
  right: 0.6rem;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2em;
  color: #999;

  &:hover {
    color: #333;
  }
}
</style>
