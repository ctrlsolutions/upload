<template>
  <div class="dashboard-page">
    <div class="left-section">
      <GreetingCard class="greeting-card" :lastName="user?.last_name" />
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

<script>
import { ref, onMounted } from "vue";
import DashboardServices from "@/services/DashboardService";
import GreetingCard from "@/components/Dashboard/GreetingCard.vue";
import SearchBar from "@/components/Dashboard/SearchBar.vue";
import StatisticReport from "@/components/Dashboard/StatisticReport.vue";
import LastReport from "@/components/Dashboard/LastReport.vue";
import MyProfile from "@/components/Dashboard/MyProfile.vue";
import MyCalendar from "@/components/Dashboard/MyCalendar.vue";

export default {
  name: "DashboardPage",
  components: {
    GreetingCard,
    SearchBar,
    StatisticReport,
    LastReport,
    MyProfile,
    MyCalendar,
  },
  setup() {
<<<<<<< HEAD
<<<<<<< HEAD
    const user = ref(null);
=======
    const user = ref(null); // Reactive user data
>>>>>>> f86263c ([feat][lanie] dashboardpage api)
=======
    const user = ref(null);
>>>>>>> 5dfea81 ([chore][Nico] Fixes the grid display default layout. Breakpoints nlng kuwang)

    onMounted(async () => {
      try {
        const data = await DashboardServices.getDashboardData();
<<<<<<< HEAD
<<<<<<< HEAD
        if (data) user.value = data.user;
=======
        if (data) user.value = data.user; // Store fetched user data
>>>>>>> f86263c ([feat][lanie] dashboardpage api)
=======
        if (data) user.value = data.user;
>>>>>>> 5dfea81 ([chore][Nico] Fixes the grid display default layout. Breakpoints nlng kuwang)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });

    return { user };
  },
};
</script>
<<<<<<< HEAD

<style lang="scss" scoped>
@use "@/styles/mixins" as mixins;

.dashboard-page {
  display: grid;
  gap: 2vh;
  padding: 4vh 0 0 0;
  width: 100vw;
  min-height: 100vh;
  background: url("@/assets/DashboardBG.png") no-repeat center center fixed;
  background-size: cover;
  box-sizing: border-box;

  @include mixins.sm {
    grid-template-columns: 1fr;
    padding: 3vh 8vw 2vh 0;
  }

  @include mixins.md {
    grid-template-columns: 1fr 1fr;
    padding: 3vh 8vw 2vh 0;
  }

  @include mixins.lg {
    grid-template-columns: 1fr 1fr;
    padding: 3vh 10vw 20vh 0;
  }

  @include mixins.xl {
    grid-template-columns: 1fr 1fr;
    padding: 3vh 12vw 20vh 1vh;
  }
}

.left-section {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 25vw;
}

.right-section {
  display: flex;
  flex-direction: column;
  gap: 2vh;
  width: 25vw;
}

/* Component Breakpoints with vw/vh units */
.greeting-card {
  @include mixins.sm {
    min-height: 24vh;
    width: 95vw;
  }

  @include mixins.md {
    min-height: 24vh;
    width: 45vw;
  }

  @include mixins.lg {
    min-height: 50vh;
    width: 50vw;
  }

  @include mixins.xl {
    min-height: 25vh;
    width: 42vw;
  }
}

.statistic-report {
  @include mixins.sm {
    min-height: 30vh;
    width: 95vw;
  }

  @include mixins.md {
    min-height: 33vh;
    width: 45vw;
  }

  @include mixins.lg {
    min-height: 50vh;
    width: 85vw;
  }

  @include mixins.xl {
    min-height: 32vh;
    width: 42vw;
  }
}

.last-report {
  @include mixins.sm {
    min-height: 30vh;
    width: 95vw;
  }

  @include mixins.md {
    min-height: 34vh;
    width: 95vw;
  }

  @include mixins.lg {
    min-height: 50vh;
    width: 85vw;
  }

  @include mixins.xl {
    min-height: 32vh;
    width: 42vw;
  }
}

.search-bar {

  @include mixins.sm {
    min-height: 6vh;
    width: 90vw;
  }

  @include mixins.md {
    min-height: 6vh;
    width: 50vw;
  }

  @include mixins.lg {
    min-height: 50vh;
    width: 85vw;
  }

  @include mixins.xl {
    min-height: 6vh;
    width: 42vw;
  }
}

.my-profile {

  @include mixins.sm {
    min-height: 24vh;
    width: 95vw;
  }

  @include mixins.md {
    min-height: 24vh;
    width: 50vw;
  }

  @include mixins.lg {
    min-height: 50vh;
    width: 100vw;
  }

  @include mixins.xl {
    min-height: 32vh;
    width: 42vw;
  }
}

.my-calendar {
  @include mixins.sm {
    min-height: 38vh;
    width: 95vw;
  }

  @include mixins.md {
    min-height: 32vh;
    width: 50vw
  }

  @include mixins.lg {
    min-height: 50vh;
    width: 35vw;
  }

  @include mixins.xl {
    min-height: 42vh;
    width: 42vw;
  }
}

/* Hover Effects */
.greeting-card:hover,
.search-bar:hover,
.statistic-report:hover,
.last-report:hover,
.my-profile:hover,
.my-calendar:hover {
  transform: translateY(-1vh);
  transition: transform 0.3s;
}

=======
<style scoped>
.dashboard-page {
  display: grid;
  grid-template-columns: 1fr 2fr;  /* Left section (1/3) and right section (2/3) */
  gap: 1rem;
  width: 100vw;
  min-height: 100vh;
  background: url("@/assets/backgroundImages/HomepageBG.png") no-repeat center center fixed;
  background-size: cover;
  padding: 2rem 0rem 3rem 0rem;
  box-sizing: border-box;
}

/* Sections fill remaining space */
.left-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1; /* Occupy remaining space */
}

.right-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1; /* Occupy remaining space */
}

/* Component Styling */
.GreetingCard,
.SearchBar,
.StatisticReport,
.LastReport,
.MyProfile,
.MyCalendar {
  flex: 1; /* Make components expand evenly */
  min-height: 300px; /* Ensures they have a visible height */
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1rem;
  transition: transform 0.3s;
}

.GreetingCard:hover,
.SearchBar:hover,
.StatisticReport:hover,
.LastReport:hover,
.MyProfile:hover,
.MyCalendar:hover {
  transform: translateY(-5px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .dashboard-page {
    grid-template-columns: 1fr; /* Single column for smaller screens */
  }
}
>>>>>>> 5dfea81 ([chore][Nico] Fixes the grid display default layout. Breakpoints nlng kuwang)
</style>
