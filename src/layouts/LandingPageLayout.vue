<template>
  <div class="static-page">
    <div class="background">
      <img src="@/assets/Oble.png" class="bg-image" />
    </div>

    <div class="scroll-container">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.static-page {
  height: 100vh;
  width: 100vw;
  display: flex;
}

.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  display: flex;
  justify-content: right;
  align-items: center;
  background-color: white;
}

.bg-image {
  width: auto;
  height: 100vh;
  object-fit: cover;
}

.scroll-container {
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 100vw;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  height: 100vh;
  scrollbar-width: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}
</style>
