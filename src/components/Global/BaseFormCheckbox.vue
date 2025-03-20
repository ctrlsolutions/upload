<template>
    <div class="form-checkbox" :class="variantClass">
        <input
            type="checkbox"
            :id="id"
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
    variant: { type: String, default: 'square' },
});

const model = defineModel();

const variantClass = computed(() => `form-checkbox--${props.variant}`);
</script>

<style lang="scss" scoped>
* {
    box-sizing: border-box;
}

.form-checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    gap:0.5rem;

    input[type='checkbox'] {
        flex-shrink: 0;
        appearance: none;
        width: 1rem;
        height: 1rem;
        border: 0.125rem solid $red;
        border-radius: 0.25rem;
        position: relative;
        transition: all 0.3s ease;
        vertical-align: top;
        margin-top: 0.4rem;

        @include sm {
            width: 0.9rem;
            height: 0.9rem;
        }

        @include md {
            width: 1rem;
            height: 1rem;
        }

        @include lg {
            width: 1.1rem;
            height: 1.1rem;
        }

        @include xl {
            width: 1.2rem;
            height: 1.2rem;
        }
    }

    input[type='checkbox']:checked {
        background-color: $red;
    }

    input[type='checkbox']:checked::after {
        content: '';
        position: absolute;
        top: 44%;
        left: 50%;
        width: 0.25rem;
        height: 0.5rem;
        border: solid white;
        border-width: 0 0.125rem 0.125rem 0;
        transform: translate(-50%, -50%) rotate(45deg);


        @include sm {
            width: 0.23rem;
            height: 0.45rem;
        }

        @include md {
            width: 0.25rem;
            height: 0.50rem;
        }

        @include lg {
            width: 0.3rem;
            height: 0.60rem;
        }

        @include xl {
            width: 0.30rem;
            height: 0.75rem;
        }

    }

    label {
        margin-top: 2rem;
        font-weight: bold;
        color: #9e2323;
        line-height: 1.5;
        font-family: 'Inter', sans-serif;

        @include sm {
            font-size: 0.7 rem;
        }

        @include md {
            font-size: 0.8rem;
        }

        @include lg {
            font-size: 0.9rem;
        }

        @include xl {
            font-size: 1rem;
        }

    }
}
</style>
