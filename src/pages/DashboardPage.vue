<template>
  <div class="dashboard-page">
    <div class="left-section">
      <div class="greeting-card"><GreetingCard :lastName="user?.last_name ?? ''" /></div>
      <div class="statistic-report"><MyCalendar /></div>
    </div>
    <div class="right-section">
      <div class="search-bar"><SearchBar /></div>
      <div class="my-profile"><MyProfile :user="user" /></div>
      <div class="my-calendar"><StatisticReport /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import GreetingCard from '@/components/Dashboard/GreetingCard.vue'
import SearchBar from '@/components/Dashboard/SearchBar.vue'
import StatisticReport from '@/components/Dashboard/StatisticReport.vue'
import LastReport from '@/components/Dashboard/LastReport.vue'
import MyProfile from '@/components/Dashboard/MyProfile.vue'
import MyCalendar from '@/components/Dashboard/MyCalendar.vue'
import { useUserStore } from '@/stores/UserStore'
import type { User } from '@/types/CommonInterface'

const userStore = useUserStore()
const user = ref<User | null>(null)

onMounted(async () => {
  if (!userStore.profile) {
    await userStore.fetchUserProfile()
  }

  user.value = userStore.getUserProfile
})
</script>

<style lang="scss" scoped>
.dashboard-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 1%;
  grid-template-areas: 'left-section right-section';
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.left-section {
  grid-area: left-section;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.38fr 1fr;
  grid-auto-columns: 1fr;
  gap: 2% 0%;
  grid-auto-flow: row;
  grid-template-areas:
    'greeting-card'
    'statistic-report'
    'last-report';
}

.greeting-card {
  grid-area: greeting-card;
}

.statistic-report {
  grid-area: statistic-report;
}

.last-report {
  grid-area: last-report;
}

.right-section {
  grid-area: right-section;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 0.4fr 1fr;
  gap: 2% 0px;
  grid-template-areas:
    'search-bar'
    'my-profile'
    'my-calendar';
}

.search-bar {
  grid-area: search-bar;
}

.my-profile {
  grid-area: my-profile;
}

.my-calendar {
  grid-area: my-calendar;
}
</style>
