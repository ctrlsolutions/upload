<template>
  <div class="container">
    <div class="background red-bg" :style="{ opacity: isSignupRoute ? 1 : 0 }"></div>
    <div class="background green-bg" :style="{ opacity: isSignupRoute ? 0 : 1 }"></div>
    <main class="content-container">
      <div class="imageContainer">
        <div class="header">
          <div class="logoContainer">
            <img src="@/assets/UPLogo.svg" class="logo" />
            <img src="@/assets/UPloadLogo.svg" class="logo" />
          </div>
          <div class="buttonContainer">
            <BaseNavButton
              id="signup"
              route="/signup"
              :variant="isSignupRoute ? 'red-full' : 'empty'"
              width="7rem"
              :class="{ 'sm-hidden': isSignupRoute }"
              >Signup</BaseNavButton
            >
            <BaseNavButton
              id="login"
              route="/login"
              :variant="isSignupRoute ? 'empty' : 'green-full'"
              width="7rem"
              :class="{ 'sm-hidden': !isSignupRoute }"
              >Login</BaseNavButton
            >
          </div>
        </div>
        <img src="@/assets/backgroundImages/oble_closeup.png" class="img" />
      </div>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseNavButton from '@/components/Global/BaseNavButton.vue'

const route = useRoute()
const isSignupRoute = computed(() => route.path === '/signup')
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.content-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 80%;
  height: 90%;
  background-color: white;
  border-radius: 2.5rem;
  z-index: 2;
  flex-direction: row;
  overflow-y: auto;

  @include ratio-portrait {
    flex-direction: column;
    width: 90%;
    height: 95%;
  }
}

.imageContainer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem;
  @include lg {
    max-width: 40%;
  }
  @include ratio-portrait {
    max-height: 25vh;
    width: 100%;
    max-width: 100%;
  }
}

.img {
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 2rem;
  @include ratio-portrait {
    object-position: 50% 2.5%;
  }
}

.header {
  position: absolute;
  top: 1.5rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  flex-wrap: wrap;
  padding: 0 2rem 0 2rem;
}

.logoContainer {
  display: flex;
  align-items: center;
}

.logo {
  height: 2em;
  width: auto;
  @include sm {
    height: 2.2em;
  }
  @include md {
    height: 2.5em;
  }
  @include lg {
    height: 3.4em;
  }
}

.buttonContainer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0rem;
}

.red-bg {
  background-image: url('@/assets/backgroundImages/bgee.png');
  background-blend-mode: multiply;
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
  background-color: $red;
}

.green-bg {
  background-image: url('@/assets/backgroundImages/bgee.png');
  background-blend-mode: multiply;
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
  background-color: $green;
}

.red-bg,
.green-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition:
    opacity 0.45s ease,
    visibility 0.5s ease;
  visibility: visible;
  z-index: 1;
}

.red-bg[style*='opacity: 0'],
.green-bg[style*='opacity: 0'] {
  visibility: hidden;
}

.sm-hidden {
  @include sm {
    display: none;
  }
  @include md {
    display: inline;
  }
}
</style>
