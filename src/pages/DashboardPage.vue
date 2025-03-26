<template>
  <div class="dashboard-page">
    <div class="left-section">
      <GreetingCard class="greeting-card" :lastName="user?.last_name ?? ''" />
      <StatisticReport class="statistic-report" />
      <LastReport class="last-report" />
    </div>
    <div class="right-section">
      <SearchBar class="search-bar" />
      <MyProfile class="my-profile" :user="user" />
      <MyCalendar class="my-calendar" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getProfileData } from '@/services/ProfileService'
import GreetingCard from '@/components/Dashboard/GreetingCard.vue'
import SearchBar from '@/components/Dashboard/SearchBar.vue'
import StatisticReport from '@/components/Dashboard/StatisticReport.vue'
import LastReport from '@/components/Dashboard/LastReport.vue'
import MyProfile from '@/components/Dashboard/MyProfile.vue'
import MyCalendar from '@/components/Dashboard/MyCalendar.vue'

interface User {
  last_name?: string
}

const user = ref<User | null>(null)

onMounted(async () => {
  try {
    const username = sessionStorage.getItem('username')
    const response = await getProfileData(username)
    if (response && response.data.user) {
      user.value = response.data.user
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
})
</script>

<style lang="scss" scoped>
.dashboard-page {
  display: grid;
  gap: 2vh;
  padding: 4vh 0 0 1vw;
  width: 88vw;
  min-height: 88vh;
  // background: url('@/assets/DashboardBG.png') no-repeat center center fixed;
  background-size: cover;
  background: linear-gradient(to bottom right, #f6ddde, #ddf6e9);
  box-sizing: border-box;
  justify-content: space-between;

  @media (max-width: 600px) {
    // Equivalent to mixins.sm
    grid-template-columns: 97%;
    padding: 2vh 2vw 0vh 0;
  }

  @media (max-width: 900px) {
    // Equivalent to mixins.md
    grid-template-columns: 51% 58%;
    padding: 0vh;
  }

  @media (max-width: 1200px) {
    // Equivalent to mixins.lg
    grid-template-columns: 47% 47%;
    padding: 0vh 0vw 0vh 2vh;
  }

  @media (min-width: 1201px) {
    // Equivalent to mixins.xl
    grid-template-columns: 48% 50%;
    padding: 0vh 0vw 0vh 2vh;
  }
}

.left-section {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 25vw;
  justify-content: space-between;
}

.right-section {
  padding: 3vh 0vw 0vh 0;
}

.left-section,
.right-section {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 25vw;
  justify-content: space-between;
}

/* Component Breakpoints with vw/vh units */
.greeting-card,
.statistic-report,
.last-report,
.search-bar,
.my-profile,
.my-calendar {
  @media (max-width: 600px) {
    // Equivalent to mixins.sm
    min-height: 24vh;
    width: 85vw;
  }

  @media (max-width: 900px) {
    // Equivalent to mixins.md
    min-height: 24vh;
    width: 45vw;
  }

  @media (max-width: 1200px) {
    // Equivalent to mixins.lg
    min-height: 24vh;
    width: 42vw;
  }

  @media (min-width: 1201px) {
    // Equivalent to mixins.xl
    min-height: 25vh;
    width: 42vw;
  }
}

.statistic-report {
  @media (max-width: 600px) {
    min-height: 30vh;
    width: 85vw;
  }

  @media (max-width: 900px) {
    min-height: 33vh;
    width: 45vw;
  }

  @media (max-width: 1200px) {
    min-height: 34vh;
    width: 42vw;
  }

  @media (min-width: 1201px) {
    min-height: 32vh;
    width: 42vw;
  }
}

.last-report {
  @media (max-width: 600px) {
    min-height: 30vh;
    width: 85vw;
  }

  @media (max-width: 900px) {
    min-height: 34vh;
    width: 45vw;
  }

  @media (max-width: 1200px) {
    min-height: 34vh;
    width: 42vw;
  }

  @media (min-width: 1201px) {
    min-height: 32vh;
    width: 42vw;
  }
}

.search-bar {
  @media (max-width: 600px) {
    min-height: 6vh;
    width: 85vw;
  }

  @media (max-width: 900px) {
    min-height: 6vh;
    width: 50vw;
  }

  @media (max-width: 1200px) {
    min-height: 6vh;
    width: 42vw;
  }

  @media (min-width: 1201px) {
    min-height: 6vh;
    width: 46vw;
  }
}

.my-profile {
  @media (max-width: 600px) {
    min-height: 24vh;
    width: 85vw;
  }

  @media (max-width: 900px) {
    min-height: 24vh;
    width: 44vw;
  }

  @media (max-width: 1200px) {
    min-height: 24vh;
    width: 42vw;
  }

  @media (min-width: 1201px) {
    min-height: 32vh;
    width: 46vw;
  }
}

.my-calendar {
  @media (max-width: 600px) {
    min-height: 38vh;
    width: 85vw;
  }

  @media (max-width: 900px) {
    min-height: 32vh;
    width: 44vw;
  }

  @media (max-width: 1200px) {
    min-height: 54vh;
    width: 42vw;
  }

  @media (min-width: 1201px) {
    min-height: 42vh;
    width: 46vw;
  }
}
</style>
