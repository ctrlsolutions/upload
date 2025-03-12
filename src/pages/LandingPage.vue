<template>
  <LandingLayout>
    <section class="page"><Home /></section>
    <section class="page"><About /></section>
    <section class="page"><Summary /></section>
  </LandingLayout>
</template>

<script setup lang="ts">
import LandingLayout from '@/layouts/LandingPageLayout.vue'
import Home from '@/components/Landing/Home.vue'
import About from '@/components/Landing/About.vue'
import Summary from '@/components/Landing/Summary.vue'
</script>

<style lang="scss" scoped>
.page {
  scroll-snap-align: start;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: left;
}
</style>
