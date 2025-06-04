<template>
  <div class="container">
    <div class="background red-bg" :style="{ opacity: isSignupRoute ? 1 : 0 }"></div>
    <div class="background green-bg" :style="{ opacity: isSignupRoute ? 0 : 1 }"></div>
    <main class="content-container">
      <div class="image-container">
        <div class="header">
          <div class="logo-container">
            <img src="@/assets/UPLogo.svg" class="logo" />
            <img src="@/assets/UPloadLogo.svg" class="logo" />
          </div>
          <div class="button-container">
            <BaseNavButton
              id="signup"
              route="/signup"
              :variant="signupVariant"
              width="5rem"
              :class="{ 'sm-hidden': isSignupRoute }"
              >Signup</BaseNavButton
            >
            <BaseNavButton
              id="login"
              route="/login"
              :variant="loginVariant"
              width="5rem"
              :class="{ 'sm-hidden': !isSignupRoute }"
              >Login</BaseNavButton
            >
          </div>
        </div>
        <img src="@/assets/backgroundImages/oble_closeup.png" class="img" />
      </div>
      <div class="content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BaseNavButton from '@/components/Global/BaseNavButton.vue'

import { ref, onMounted, onBeforeUnmount } from 'vue'

const isBelowMd = ref(false)

onMounted(() => {
  const mediaQuery = window.matchMedia('(max-width: 575px)')
  isBelowMd.value = mediaQuery.matches
  const update = (e: MediaQueryListEvent) => {
    isBelowMd.value = e.matches
  }
  mediaQuery.addEventListener('change', update)

  onBeforeUnmount(() => {
    mediaQuery.removeEventListener('change', update)
  })
})

const route = useRoute()
const isSignupRoute = computed(() => route.path === '/signup')

const loginVariant = computed(() => {
  if (isBelowMd.value) return 'green-full'
  return !isSignupRoute.value ? 'green-full' : 'empty'
})

const signupVariant = computed(() => {
  if (isBelowMd.value) return 'red-full'
  return isSignupRoute.value ? 'red-full' : 'empty'
})
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
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  z-index: 2;
  border-radius: 2.5rem;
  background-color: white;
  width: 80%;
  height: 90%;
  overflow-y: auto;

  @include ratio-portrait {
    flex-direction: column;
    width: 90%;
    height: 95%;
  }
}

.content {
  width: 55%;
  height: 100%;
  @include ratio-portrait {
    flex: 1 0 auto;
    width: 100%;
    height: auto;
  }
}

.image-container {
  display: flex;
  position: relative;
  flex: 1;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;
  height: 100%;
  @include lg {
    max-width: 45%;
  }
  @include ratio-portrait {
    width: 100%;
    max-width: 100%;
    max-height: 25vh;
  }
}

.img {
  border-radius: 2rem;
  width: 100%;
  height: 100%;
  max-height: 100%;
  object-fit: cover;
  @include ratio-portrait {
    object-position: 50% 2.5%;
  }
}

.header {
  display: flex;
  position: absolute;
  top: 1.5rem;
  left: 0;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 2rem 0 2rem;
  width: 100%;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: auto;
  height: 2em;
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

.button-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0rem;
}

.red-bg {
  background-image: url('@/assets/backgroundImages/bgee.png');
  background-position: left center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: $red;
  background-blend-mode: multiply;
}

.green-bg {
  background-image: url('@/assets/backgroundImages/bgee.png');
  background-position: left center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: $green;
  background-blend-mode: multiply;
}

.red-bg,
.green-bg {
  position: absolute;
  top: 0;
  left: 0;
  visibility: visible;
  z-index: 1;
  transition:
    opacity 0.45s ease,
    visibility 0.5s ease;
  width: 100%;
  height: 100%;
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
