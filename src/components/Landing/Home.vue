<template>
  <div class="container">
    <div class="header-logos">
      <img class="UPlogo" src="@/assets/UP-logo.svg" />
      <img class="UPloadlogo" src="@/assets/UPloadLogo.svg" />
    </div>
    <div class="title">THE OFFICIAL REPORT OF ACCOMPLISHMENT SUBMISSION PLATFORM FOR THE UP CEBU FACULTY</div>
    <div class="subtitle">Honor, Excellence, Service</div>
    <div class="buttons">
      <BaseNavButton route="/login" variant="red-full" width="50%"> Log in </BaseNavButton>
      <BaseNavButton route="/signup" variant="green-outline" width="50%"> Sign up </BaseNavButton>
    </div>
  </div>
</template>

<script>
import BaseNavButton from '@/components/Global/BaseNavButton.vue'
export default {
  name: 'HomePage',
  components: {
    BaseNavButton,
  },
}
</script>

<style lang="scss" scoped>
* {
  font-family: 'Inter', serif;
}

.header-logos {
  display: flex;
  gap: 0.8rem;
  padding-top: 1rem;
}

.container::before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%);
  width: 30%;
  pointer-events: none;
  content: '';
  @include ratio-portrait {
    width: 100%;
  }
}

.header-logos,
.title,
.subtitle,
.buttons {
  position: relative;
  z-index: 1;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
  padding: 1.5625rem 0 9.375rem 3.125rem;
  min-height: 100vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.title {
  max-width: 21.25rem;
  color: $red;
  font-weight: 800;
  font-size: 2.8rem;
  line-height: 3rem;
  letter-spacing: 0.05rem;
}
.subtitle {
  font-size: 1.2rem;
}
.header-logos {
  display: flex;
  align-items: start;
  align-self: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 31.1875rem;
  max-width: 100%;
}
.UPlogo {
  row-gap: 0.125rem;
  width: 15%;
  object-fit: contain;
}
.UPloadlogo {
  width: 18%;
  object-fit: contain;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-top: 2rem;
  padding-right: 8rem;
}
</style>
