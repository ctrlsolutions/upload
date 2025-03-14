<template>
  <div class="dashboard-page">
    <SearchBar />
    <GreetingCard />
  </div>
</template>

<script>
import GreetingCard from "@/components/Dashboard/GreetingCard.vue";
import SearchBar from "@/components/Dashboard/SearchBar.vue"; // Import SearchBar

export default {
  name: "DashboardPage",
  components: {
    GreetingCard,
    SearchBar, // Register SearchBar
  },
};
</script>

<style scoped>
.dashboard-page {
  padding: 20px;
  display: flex;
  flex-direction: column; /* Ensure vertical stacking */
  align-items: center;
  gap: 20px; /* Add spacing between components */
}
</style>
