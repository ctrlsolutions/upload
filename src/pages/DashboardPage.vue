<template>
  <div class="dashboard-page">
    <div class="top-section">
      <GreetingCard />
      <SearchBar />
    </div>
  </div>
</template>

<script>
import GreetingCard from "@/components/Dashboard/GreetingCard.vue";
import SearchBar from "@/components/Dashboard/SearchBar.vue";

export default {
  name: "DashboardPage",
  components: {
    GreetingCard,
    SearchBar,
  },
};
</script>

<style scoped>
.dashboard-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-section {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Ensures proper spacing */
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap; /* Ensures responsiveness */
  gap: 20px; /* Adds spacing between components */
}

@media (max-width: 768px) {
  .top-section {
    flex-direction: column; /* Stack components on smaller screens */
    align-items: center;
  }
}
</style>
