<template>
  <div class="greeting-card">
    <div class="date-time">
      <span>📅 {{ currentDate }} &nbsp; {{ currentTime }}</span>
    </div>
    <div class="greeting-text">
      <h2 v-if="lastName">Good Day, Prof. {{ lastName }}</h2>
      <p>Have a great day!</p>
    </div>
    <img src="@/assets/UPSystemLogo.png" alt="UP Logo" class="up-logo" />
  </div>
</template>

<script>
export default {
  name: "GreetingCard",
  props: {
    lastName: String, 
  },
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      currentTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'}),
      timer: null,
    };
  },
  methods: {
    updateTime() {
      this.currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      this.currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
  },
  mounted() {
    this.updateTime();
    this.timer = setInterval(this.updateTime, 1000); // Update time every second
  },
  beforeUnmount() {
    clearInterval(this.timer); // Cleanup interval on component destroy
  }
};
</script>

<style scoped>
.greeting-card {
  width: 48rem;
  height: 12.875rem;
  background: linear-gradient(to right, #1a3d21, #2f6035);
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  color: white;
  overflow: hidden; 
}

.date-time {
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  border-radius: 12px;
  width: fit-content;
  font-size: 14px;
}

.greeting-text h2 {
  margin: 10px 0 5px;
  font-size: 24px;
  font-weight: bold;
}

.greeting-text p {
  font-size: 1.125rem;
  margin: 0;
  position: absolute;
  right: 0rem;
  left: 1.5rem;
  top: 10rem;
  bottom: 0rem;

}

.up-logo {
  position: absolute;
  right: 9rem;
  left: 34rem;
  top: -1.5rem;
  bottom: 0rem;
  width: 16rem;
  opacity: 0.3;
}
</style>