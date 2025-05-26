<template>
  <div
    v-bind="$attrs"
    :style="{
      width: width,
      height: height,
      backgroundColor: bgColor,
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
      borderRadius: '25px',
    }"
    class="card-container"
  >
    <header v-if="header" class="card-header" :style="{ background: headerColor }">
      <div name="header-content">
        <slot name="icon"></slot>
        <h2 class="card-title">{{ title }}</h2>
      </div>
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
  headerColor: { type: String, default: '#014421' },
})
</script>

<style lang="scss" scoped>
.card-header {
  padding: 0.7rem 1rem;
  background: #014421;
  color: white;
  font-size: .8rem;
  font-weight: 900;
  border-radius: 15px 15px 0px 0px;
  width: 100%;  
  box-sizing: border-box;
  height: fit-content;
  display: flex;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* Space between icon and title */
}

.card-title {
  margin-left: 1rem;
  font-weight: bold;
  height: 100%;
  font-size: medium;
}

.card-content {
  padding: 1rem;
}
</style>
