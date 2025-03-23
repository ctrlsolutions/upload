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
  width: 88vw;
  min-height: 88vh;
  background: url("@/assets/DashboardBG.png") no-repeat center center fixed;
  background-size: cover;
  box-sizing: border-box;
  justify-content: flex-start;

  @include mixins.sm {
    grid-template-columns: 97%;
    padding: 2vh 2vw 0vh 0;
  }

  @include mixins.md {
    grid-template-columns: 51% 58%;
    padding: 2vh 0vw 0vh 0;
  }

  @include mixins.lg {
    grid-template-columns: 47% 47%;
    padding: 2vh 0vw 0vh 0;
  }

  @include mixins.xl {
    grid-template-columns: 48% 50%;
    padding: 3vh 0vw 0vh 0vh;
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
    width: 85vw;
  }

  @include mixins.md {
    min-height: 24vh;
    width: 45vw;
  }

  @include mixins.lg {
    min-height: 24vh;
    width: 42vw;
  }

  @include mixins.xl {
    min-height: 25vh;
    width: 42vw;
  }
}

.statistic-report {
  @include mixins.sm {
    min-height: 30vh;
    width: 85vw;
  }

  @include mixins.md {
    min-height: 33vh;
    width: 45vw;
  }

  @include mixins.lg {
    min-height: 34vh;
    width: 42vw;
  }

  @include mixins.xl {
    min-height: 32vh;
    width: 42vw;
  }
}

.last-report {
  @include mixins.sm {
    min-height: 30vh;
    width: 85vw;
  }

  @include mixins.md {
    min-height: 34vh;
    width: 45vw;
  }

  @include mixins.lg {
    min-height: 34vh;
    width: 42vw;
  }

  @include mixins.xl {
    min-height: 32vh;
    width: 42vw;
  }
}

.search-bar {

  @include mixins.sm {
    min-height: 6vh;
    width: 85vw;
  }

  @include mixins.md {
    min-height: 6vh;
    width: 50vw;
  }

  @include mixins.lg {
    min-height: 6vh;
    width: 42vw;
  }

  @include mixins.xl {
    min-height: 6vh;
    width: 46vw;
  }
}

.my-profile {

  @include mixins.sm {
    min-height: 24vh;
    width: 85vw;
  }

  @include mixins.md {
    min-height: 24vh;
    width: 44vw;
  }

  @include mixins.lg {
    min-height: 24vh;
    width: 42vw;
  }

  @include mixins.xl {
    min-height: 32vh;
    width: 46vw;
  }
}

.my-calendar {
  @include mixins.sm {
    min-height: 38vh;
    width: 85vw;
  }

  @include mixins.md {
    min-height: 32vh;
    width: 44vw
  }

  @include mixins.lg {
    min-height: 54vh;
    width: 42vw;
  }

  @include mixins.xl {
    min-height: 42vh;
    width: 46vw;
  }
}

</style>
