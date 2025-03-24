<template>
  <div
    v-bind="$attrs"
    :style="{
      width: width || '100%',
      height: height || 'auto',
      backgroundColor: bgColor || 'white',
    }"
    class="card-container"
  >
    <header v-if="header" class="profile-header" role="banner">
      <h2 class="profile-title">{{ title }}</h2>
    </header>
    <div class="content-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: 'auto',
  },
  bgColor: {
    type: String,
    default: 'white',
  },
  header: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.card-container {
  box-sizing: border-box;
  margin: 2rem;
  border-radius: 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.profile-header {
  width: 100%;
  padding: 0 25px;
  height: 10%;
  border-radius: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #014421;
}

.profile-title {
  color: white;
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  font-size: 16px;
  font-weight: 600;
}
</style>
