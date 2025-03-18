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
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
  gap: 9px 16px; 
  grid-template-areas: 
    ". ."
    "GreetingCard SearchBar"
    "GreetingCard MyProfile"
    "GreetingCard MyProfile"
    "GreetingCard MyProfile"
    "ReportStatistics MyProfile"
    "ReportStatistics MyProfile"
    "ReportStatistics MyCalendar"
    "ReportStatistics MyCalendar"
    "ReportStatistics MyCalendar"
    "ReportStatistics MyCalendar"
    "ReportStatistics MyCalendar"
    "LastReport MyCalendar"
    "LastReport MyCalendar"
    "LastReport MyCalendar"
    "LastReport MyCalendar"
    "LastReport MyCalendar"
    "LastReport MyCalendar"
    "LastReport MyCalendar"
    ". ."; 

  width: 100vw;
  height: 100vh;
  background: url("@/assets/backgroundImages/HomepageBG.png") no-repeat center center fixed;
  background-size: cover;
  padding: 2rem 0rem 0rem 0rem;
}

/* Assigning grid areas */
.GreetingCard { grid-area: GreetingCard; }
.SearchBar { grid-area: SearchBar; }

.MyProfile {
  grid-area: MyProfile;
  padding-top: 0rem; /* Increased padding on top */
}

.ReportStatistics { grid-area: ReportStatistics; }
.LastReport { grid-area: LastReport; }
.MyCalendar { grid-area: MyCalendar; }

/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-page {
    grid-template-columns: 1fr;
    grid-template-areas:
      "GreetingCard"
      "SearchBar"
      "MyProfile"
      "ReportStatistics"
      "MyCalendar"
      "LastReport";
  }

  .MyProfile {
    padding-top: 1rem; /* Adjusted for smaller screens */
  }
}
</style>