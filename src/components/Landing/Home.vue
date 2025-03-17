<template>
  <div class="container">
    <div class="header-logos">
      <img class="UPlogo" src="@/assets/UP-logo.svg" />
      <img class="UPloadlogo" src="@/assets/UPloadLogo.svg" />
    </div>
    <div class="title">
      THE OFFICIAL REPORT OF ACCOMPLISHMENT SUBMISSION PLATFORM FOR THE UP CEBU
      FACULTY
    </div>
    <div class="subtitle">Honor, Excellence, Service</div>
    <div class="buttons">
      <BaseNavButton route="/auth/login" variant="red-full">
        Log in
      </BaseNavButton>
      <BaseNavButton route="/auth/signup" variant="green-outline">
        Sign up
      </BaseNavButton>
    </div>
  </div>
</template>

<script>
import BaseNavButton from '@/components/Global/BaseNavButton.vue';
export default {
  name: 'HomePage',
  components: {
    BaseNavButton,
  },
};
</script>

<style lang="scss" scoped>

* {
  font-family: 'Inter', serif;
}

.header-logos {
  display: flex;
  padding-top: 1rem;
  gap: 0.8rem;
}
.container {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-width: none;
  padding: 1.5625rem 0 9.375rem 3.125rem;
  gap: 1.25rem;
}
.title {
  font-weight: 800;
  color: $red;
  font-size: 2.8rem;
  max-width: 21.25rem;
  line-height: 3rem;
  letter-spacing: 0.05rem;
}
.subtitle {
  font-size: 1.2rem;
}
.header-logos {
  align-self: center;
  display: flex;
  width: 31.1875rem;
  max-width: 100%;
  align-items: start;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.UPlogo {
  object-fit: contain;
  width: 15%;
  row-gap: 0.125rem;
}
.UPloadlogo {
  object-fit: contain;
  width: 18%;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1.875rem;
}
</style>
