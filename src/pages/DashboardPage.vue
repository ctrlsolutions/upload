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
</style>
