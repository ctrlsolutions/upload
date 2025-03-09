<template>
    <div class="form-radio" :class="variantClass">
        <input
            type="radio"
            :id="id"
            :value="id"
            v-model="model"
        />
        <label :for="id">
            <slot>{{ label }}</slot>
        </label>
    </div>
</template>

<script setup>
import { defineProps, computed, defineModel } from 'vue';

const props = defineProps({
    id: String,
    label: { type: String, default: '' },
    variant: { type: String, default: 'circle' },
});

const model = defineModel();

const variantClass = computed(() => `form-radio--${props.variant}`);
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.form-radio {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: 20px;

    input[type='radio'] {
        flex-shrink: 0;
        appearance: none;
        width: 1rem; 
        height: 1rem;
        cursor: pointer;
        border: 0.1rem solid $red;
        border-radius: 50%;
        position: relative;
        transition: all 0.3s ease;

        @include sm {
            width: 0.7rem;
            height: 0.7rem;
        }

        @include md {
            width: 0.8rem;
            height: 0.8rem;
        }

        @include lg {
            width: 1.0rem;
            height: 1.0rem;
        }

        @include xl {
            width: 1.2rem;
            height: 1.2rem;
        }
    }

    input[type='radio']:checked::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0.56rem;
        height: 0.56rem;
        background-color: $red;
        opacity: 50%;
        border-radius: 50%;
        transform: translate(-50%, -50%);

        @include sm {
            width: 0.4rem;
            height: 0.4rem;
        }

        @include md {
            width: 0.5rem;
            height: 0.5rem;
        }

        @include lg {
            width: 0.6rem;
            height: 0.6rem;
        }

        @include xl {
            width: 0.8rem;
            height: 0.8rem;
        }
    }

    label {
        margin-top: 0.1rem;
        margin-left: 0.5rem;
        font-weight: bold;
        color: #9e2323;
        font-family: 'Inter', sans-serif; 
    }
}
</style>
