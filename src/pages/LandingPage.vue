<template>
  <div class="static-page">
    <div class="scroll-container">
      <section class="page"><Home></Home></section>
      <section class="page"><About></About></section>
      <section class="page"><Summary></Summary></section>
    </div>

    <div class="background">
      <img src="@/assets/Oble.png" class="bg-image" />
    </div>
  </div>
</template>

<script>
import Home from '@/components/Landing/Home.vue'
import About from '@/components/Landing/About.vue'
import Summary from '@/components/Landing/Summary.vue'

export default {
  components: {
    Home,
    About,
    Summary,
  },
}
</script>

<style>
.static-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
}
.scroll-container {
  display: flex;
  flex-direction: column;
  scroll-snap-type: y mandatory;
  scroll-snap-points-y: repeat(300px);
  overflow-y: scroll;
  width: 50vw;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.page {
  background-color: white;
  scroll-snap-align: start;
  background-color: transparent;
  display: flex;
  height: 100vh;
}
.background {
  z-index: 1;
  display: flex;
  justify-content: right;
  align-items: center;
  width: 50vw;
  height: 100vh;
  pointer-events: auto;
}
.bg-image {
  width: auto;
  height: 100vh;
  object-fit: contain;
}
</style>
