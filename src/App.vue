<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

import AuthLayout from '@/layouts/AuthPagesLayout.vue'
import MainLayout from '@/layouts/AuthenticatedPagesLayout.vue'
import LandingLayout from '@/layouts/LandingPageLayout.vue'
import { computed } from 'vue'

const route = useRoute()

const layoutComponent = computed(() => {
  switch (route.meta.layout) {
    case 'auth':
      return AuthLayout
    case 'main':
      return MainLayout
    case 'landing':
      return LandingLayout
  }
})
</script>

<style scoped></style>
