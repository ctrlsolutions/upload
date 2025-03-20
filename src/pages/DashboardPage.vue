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
  grid-template-columns: 1fr 2fr; 
  gap: 1rem;
  width: 100vw;
  min-height: 100vh;
  background: url("@/assets/DashboardBG.png") no-repeat center center fixed;
  background-size: cover;
  padding: 2rem 0 3rem 0;
  box-sizing: border-box;
}

.left-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1; 
}

.right-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1; 
}

.GreetingCard,
.SearchBar,
.StatisticReport,
.LastReport,
.MyProfile,
.MyCalendar {
  flex: 1; 
  min-height: 18.75rem; /* 300px -> 18.75rem */
  background: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1); /* 4px -> 0.25rem, 8px -> 0.5rem */
  border-radius: 0.5rem; /* 8px -> 0.5rem */
  padding: 1rem;
  transition: transform 0.3s;
}

.GreetingCard:hover,
.SearchBar:hover,
.StatisticReport:hover,
.LastReport:hover,
.MyProfile:hover,
.MyCalendar:hover {
  transform: translateY(-0.3125rem); /* 5px -> 0.3125rem */
}
</style>
