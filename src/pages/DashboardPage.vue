<template>
  <div class="dashboard-page">
    <div class="left-section">
      <GreetingCard class="left-header" />
      <StatisticReport class="left-content" />
      <LastReport class="left-content" />
    </div>
    <div class="right-section">
      <SearchBar class="right-header" />
      <MyProfile class="right-content" />
      <MyCalendar class="right-content" />
    </div>
  </div>
</template>

<script>
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
};
</script>

<style scoped>
.dashboard-page {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal halves */
  gap: 1rem;
  min-height: 100vh; /* Full viewport height */
  width: 100vw; /* Ensure it takes the full width */
  background: url("@/assets/backgroundImages/HomepageBG.png") no-repeat center center fixed;
  background-size: cover;
  padding: 1rem;
}

.left-section {
  display: grid;
  grid-template-rows: auto auto auto; /* Three rows */
  gap: 1rem;
  width: 100%;
  padding-top: 1.5rem;
}

.left-header {
  grid-row: 1 / 2; /* Ensures GreetingCard is the only header */
}

.left-content{
  grid-row: auto;
}



.right-section {
  display: grid;
  grid-template-rows: auto auto auto; /* Three rows */
  gap: 1rem;
  width: 100%;
  padding-top: .5rem;
}

.right-header {
  grid-row: 1 / 2; /* Ensures SearchBar is the only header */
}

.right-content {
  grid-row: auto;
}


/* Adjustments for responsiveness */
@media (max-width: 768px) {
  .dashboard-page {
    grid-template-columns: 1fr; /* Stack on smaller screens */
  }
}
</style>
