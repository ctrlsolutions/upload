<template>
  <div class="custom-search-bar-wrapper">
    <label v-if="label" :for="inputId" class="search-bar-label">{{ label }}</label>
    <div class="search-input-container">
      <input
        :id="inputId"
        type="text"
        :value="modelValue"
        @input="onInput"
        :placeholder="placeholder"
        class="search-input"
        aria-label="Search input"
      />
      <OhVueIcon name="co-magnifying-glass" class="search-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { CoMagnifyingGlass } from 'oh-vue-icons/icons';

// Add the icon for this component.
// It's okay if it's also added in the parent; oh-vue-icons handles duplicates.
addIcons(CoMagnifyingGlass);

interface Props {
  modelValue: string; // For v-model
  label?: string;
  placeholder?: string;
  id?: string;
}

// Define props with defaults
const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: 'Search...',
  // id: `search-input-${Math.random().toString(36).substring(7)}` // Default ID if not provided
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

// Use provided ID or generate one for label accessibility
const inputId = computed(() => props.id || `search-input-${crypto.randomUUID()}`);

</script>

<style lang="scss" scoped>
// Assuming you have $grey, $primary-color, etc. defined globally, or use specific values.
// $grey-dark: #6f6f6f;
// $grey-light: #ccc;
// $primary-focus-color: #5c67f2; // Example

.custom-search-bar-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.search-bar-label {
  font-size: 0.875rem;
  font-weight: bold;
  color: #6f6f6f; // Matches BaseSelectInput label
  display: block;
  text-align: left;
  margin-bottom: 0.3rem;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-input {
  font-family: 'Inter', sans-serif; // Consistent font
  padding: 0.5rem 2.8rem 0.5rem 0.8rem; // Space for icon on the right
  border: 2px solid $red; // Matches commented BaseTextInput borderColor
  border-radius: 0.6rem; // Consistent border-radius
  color: black; // Matches commented BaseTextInput textColor
  width: 100%;
  height: 2.4rem; // Consistent height
  box-sizing: border-box;
  line-height: normal; // Ensures text is vertically centered better

  &:focus {
    outline: none;
    border-color: $red; // Example focus color, adjust as needed
    box-shadow: none; // Softer focus shadow
  }

  &::placeholder {
    color: $red; // Lighter placeholder text
  }
}

.search-icon {
  position: absolute;
  right: 0.8rem; // Position inside the input padding area
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.25rem; // Adjust as needed
  color: $red; // Neutral icon color
  pointer-events: none; // Allow clicks to pass through to the input
}
</style>