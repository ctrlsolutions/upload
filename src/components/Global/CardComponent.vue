<template>
  <div
    v-bind="$attrs"
    :style="{
      width: width,
      height: height,
      backgroundColor: bgColor,
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
    }"
    class="card-container"
  >
    <header v-if="header" class="card-header">
      <slot name="header">
        <h2 class="card-title">{{ title }}</h2>
      </slot>
    </header>

    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: 'auto' },
  bgColor: { type: String, default: 'white' },
  header: { type: Boolean, default: false },
  title: { type: String, default: '' },
})
</script>

<style lang="scss" scoped>
.card-header {
  padding: .75rem 1rem;
  background: #014421;
  color: white;
  font-size: .8rem;
  font-weight: 900;
  border-radius: 15px 15px 0px 0px;
  width: 100%;  /* Ensures header width matches the card width */
  box-sizing: border-box; /* Includes padding in the width calculation */
}

.card-title {
  margin: 0;
  font-weight: bold;
}

.card-content {
  padding: 1rem;
}
</style>
