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
    const user = ref(null);

    onMounted(async () => {
      try {
        const data = await DashboardServices.getDashboardData();
        if (data) user.value = data.user;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });

    return { user };
  },
};
</script>

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

</style>
