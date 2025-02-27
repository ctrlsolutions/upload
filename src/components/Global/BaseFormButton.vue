<template>
  <div class="button-container">
    <button
      :class="['form-button', variantClass]"
      @click="handleClick"
      :style="buttonStyle"
    >
      <slot></slot>
    </button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  props: {
    route: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'empty',
    },
    width: {
      type: String,
      default: 'null',
    },
    height: {
      type: String,
      default: 'auto',
    },
    type: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter()

    const handleClick = () => {
      emit('click')

      if (props.route) {
        router.push(props.route)
      }
    }

    return { handleClick }
  },
  computed: {
    variantClass() {
      return this.variant ? `form-button--${this.variant}` : ''
    },
    buttonStyle() {
      const styles = {
        height: this.height,
      }

      if (this.width) {
        styles.width = this.width
      }

      return styles
    },
  },
}
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
  margin-top:0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  @include sm {
    width: 8rem;
    height: 0.5rem;
  }

  @include md {
    width: 10rem;
    height: 1rem;
  }

  @include lg {
    width: 15rem;
    height: 2rem;
  }

  @include xl {
    width: 16rem;
    height: 3.5rem;
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

.form-button:hover {
  opacity: 0.9;
}

.form-button:focus {
  outline: 0.125rem solid $white;
  outline-offset: 0.125rem;
}
</style>
