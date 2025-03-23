<template>
  <div 
    v-bind="$attrs" 
    :style="{ 
      width: width || '100%', 
      height: height || 'auto',
    }"
    class="card-container"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { CardComponent } from '@/types/ComponentInterface';

defineProps<CardComponent>();
</script>

<style lang="scss" scoped>
.card-container {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin: 1rem;
  transition: all 0.3s ease;
  background: $white;

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
</style>