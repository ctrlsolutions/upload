<template>
  <div class="dashboard-page">
    <GreetingCard />
  </div>
</template>

<script>
import GreetingCard from "@/components/Dashboard/GreetingCard.vue";

export default {
  name: "DashboardPage",
  components: {
    GreetingCard,
  },
};
</script>

<style scoped>
.dashboard-page {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
