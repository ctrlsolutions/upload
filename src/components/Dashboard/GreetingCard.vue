<template>
  <div class="greeting-card">
    <CardComponent 
      title="My Profile" 
      height="100%" 
      width="100%" 
      :header="false" 
      class="transparent-card"
    >
      <div class="date-time">
        <span>📅 {{ currentDate }} &nbsp; {{ currentTime }}</span>
      </div>
      <div class="greeting-text">
        <h2 v-if="lastName"> Good Day, Prof. {{ lastName }}</h2>
        <p>Have a great day!</p>
      </div>
      <img src="@/assets/UPSystemLogo.png" alt="UP Logo" class="up-logo" />
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from "vue";
import CardComponent from '@/components/Global/CardComponent.vue';

const props = defineProps<{ lastName: string }>();
const currentDate = ref("");
const currentTime = ref("");
let timer: ReturnType<typeof setInterval> | null = null;

const updateTime = () => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  currentTime.value = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.greeting-card {
  background: linear-gradient(to right, #1a3d21, #2f6035);
  border-radius: 15px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  color: white;
  overflow: hidden;
  height: 100%;
}

/* Remove the white background from CardComponent */
::v-deep(.card) {
  background: transparent !important;
  box-shadow: none !important;
}

.transparent-card {
  background: transparent !important;
  box-shadow: none !important;
}

.date-time {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  border-radius: 12px;
  width: fit-content;
  font-size: 14px;
}

.greeting-text h2 {
  padding: 0rem 0rem 1.75rem 0.25rem;
  margin: 10px 0 5px;
  font-size: 24px;
  font-weight: bold;
}

.greeting-text p {
  font-size: 1.125rem;
  margin: 0;
  position: absolute;
  left: 1.3rem;
  top: 9rem;
  bottom: 0rem;
}

.up-logo {
  position: absolute;
  right: 14rem;
  left: 28rem;
  top: -2rem;
  width: 16rem;
  opacity: 0.3;
}
</style>
