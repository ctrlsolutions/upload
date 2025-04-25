<template>
    <div class="role-container">
      <CardComponent title="Assign" height="100%" width="100%" :header="true">
        <slot></slot>
      </CardComponent>
    </div>
  </template>
  
  <script setup lang="ts">
  import CardComponent from '@/components/Global/CardComponent.vue';
  </script>
  
  <style lang="scss" scoped>  
 .role-container {
  height: 100%; 
  width: 100%;
}
  </style>