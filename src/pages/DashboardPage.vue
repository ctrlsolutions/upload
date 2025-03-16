<template>
  <div class="dashboard-page">
    <div class="left-section">
      <GreetingCard class="left-header" :lastName="user?.last_name" />
      <StatisticReport class="left-content" />
      <LastReport class="left-content" />
    </div>
    <div class="right-section">
      <SearchBar class="right-header" />
      <MyProfile class="right-content" :user="user" />
      <MyCalendar class="right-content" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"; // For Vue 3
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
    const user = ref(null); // Reactive user data

    onMounted(async () => {
      try {
        const data = await DashboardServices.getDashboardData();
        if (data) user.value = data.user; // Store fetched user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });

    return { user };
  },
};
</script>

<style scoped>
.dashboard-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  min-height: 100vh;
  width: 100vw;
  background: url("@/assets/backgroundImages/HomepageBG.png") no-repeat center center fixed;
  background-size: cover;
  padding: 1rem;
}

.left-section {
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 1rem;
  width: 100%;
  padding-top: 1.5rem;
}

.left-header {
  grid-row: 1 / 2;
}

.left-content {
  grid-row: auto;
}

.right-section {
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 1rem;
  width: 100%;
  padding-top: 0.5rem;
}

.right-header {
  grid-row: 1 / 2;
}

.right-content {
  grid-row: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-page {
    grid-template-columns: 1fr;
  }
}
</style>
