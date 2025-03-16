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
import axios from 'axios';

export default {
  name: "GreetingCard",
  data() {
    return {
      currentDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      currentTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      lastName: "", 
    };
  },
  methods: {
    async fetchUserData() {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error("No auth token found");
          return;
        }

        // Set token in Axios headers
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;

        // Fetch user data from the API
        const response = await axios.get('https://your-api.com/user/profile');
        this.lastName = response.data.lastName; // Adjust according to API response
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
  },
  mounted() {
    this.fetchUserData(); // Fetch data when the component loads
  }
};
</script>

<style scoped>
.greeting-card {
  width: 658px;
  height: 206px;
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
  font-size: 16px;
  margin: 0;
}

.up-logo {
  position: absolute;
  right: 9rem;
  left: 28rem;
  top: -1.5rem;
  bottom: 0rem;
  width: 16rem;
  opacity: 0.3;
}
</style>
