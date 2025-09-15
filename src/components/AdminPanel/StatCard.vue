<template>
    <div class="stat-istics">
      <CardComponent 
        title="Tab Description" 
        height="100%" 
        width="100%" 
        :header="true"
        :headerColor= "headerColor"
        class="stat-card"
      >
        <template #icon>
          <v-icon name="fa-info-circle" scale="1.2" />
        </template>
        <slot></slot>
      </CardComponent>
    </div>
</template>

<script setup lang="ts">
    import CardComponent from '@/components/Global/CardComponent.vue';

    defineProps({
      headerColor: {
        type: String,
        default: 'var(--green)' // Default to green if not provided
      }
    })
</script>
<style lang="scss" scoped>  
.stat-istics {
  height: 100%;
  width: 100%;

  :deep(.card-content) {
    padding: 2rem;
  }

  // Only target the header content inside this StatCard
  :deep(.card-header .header-content) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  :deep(.card-header .card-title) {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>