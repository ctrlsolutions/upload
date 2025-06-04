<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="header">
        <button class="back-btn" @click="$emit('back')" aria-label="Back">
        <span class="back-content">
            <v-icon name="hi-arrow-sm-left" scale="1.3" fill="black"></v-icon>
            <!-- <span class="back-dat">Back</span> -->
        </span>
        </button>
        <img src="@/assets/up-logo.png" alt="uplogo" class="image-logo" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.modal-overlay {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  font-family: 'Inter', sans-serif;
}

.modal-container {
  border-radius: 1.1rem;
  background: white;
  width: 40rem;
  height: 32rem;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  border-top-right-radius: 1rem;
  border-top-left-radius: 1rem;
  background: linear-gradient(90deg, #198754, #014421, #036a34, #036934, #058e46);
  padding-right: 1rem;
  width: 100%;
  height: 3.5rem;
  overflow: hidden;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: absolute;
  left: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  z-index: 2;
  top: 55%;
  transform: translateY(-50%);
}

.back-content {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.back-dat {
  color: black;
  font-size: 1rem;
    position: relative;
  top: 0.5px;
}

.image-logo {
  margin-right: 1rem;
  width: 25%;
  overflow: hidden;
}
</style>