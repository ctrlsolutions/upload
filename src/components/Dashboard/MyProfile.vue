<template>
  <div class="my-profile">
    <div class="profile-header">MY PROFILE</div>
    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else class="profile-content">
      <img :src="profileImage" alt="Profile Picture" />
      <div class="user-info">
        <p class="name"> Prof. {{ user.fullName }}</p>
        <p class="role">{{ formattedRole }}</p>
        <p class="email">{{ user.email }}</p>
      </div>
      <div class="reports">
        <p class="ReportsSubmitted">Reports Submitted</p>
        <p class="ReportsNumber">{{ user.reportsSubmitted }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getDashboardData } from "@/services/DashboardService";

export default {
  name: "MyProfile",
  data() {
    return {
      user: {
        profilePicture: "",
        fullName: "",
        role: "",
        email: "",
        reportsSubmitted: 0,
      },
      isLoading: true,
      error: null as string | null,
      defaultProfilePicture: new URL('@/assets/DefaultProfile.png', import.meta.url).href
    };
  },
  computed: {
    profileImage() {
      return this.user.profilePicture || this.defaultProfilePicture;
    },
    formattedRole(): string {
      if (!this.user.role) return ""; // Handle empty or undefined role
      const role = this.user.role.toLowerCase(); // Normalize casing
      if (role === "cd") return "College Dean";
      if (role === "f") return "Faculty";
      if (role === "c") return "Chancellor";
      if (role === "dc") return "Department Chair";
      return this.user.role; // Default fallback
    }
  },
  async created() {
    await this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const dashboardData = await getDashboardData();
        if (dashboardData && dashboardData.user) {
          this.user = {
            profilePicture: dashboardData.user.profile_picture || this.defaultProfilePicture,
            fullName: this.formatFullName(
              dashboardData.user.first_name,
              dashboardData.user.middle_name,
              dashboardData.user.last_name
            ),
            role: dashboardData.user.role,
            email: dashboardData.user.email,
            reportsSubmitted: 0, // Ensure backend has this field
          };
        } else {
          throw new Error("Failed to load user data.");
        }
      } catch (error) {
        this.error = "Error fetching profile. Please try again.";
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    formatFullName(firstName: string, lastName: string, middleName?: string): string {
      return `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();
    }
  }
};
</script>

<style scoped>
.my-profile {
  width: 100vw;
  height: 32vh;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 0rem 0rem 0rem;
}

.profile-header {
  width: 100%;
  background: #1a3d21;
  color: white;
  text-align: left;
  padding: 1rem 1rem 1rem 1.5rem;
  font-weight: bold;
  border-radius: 0%;
}

.profile-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; 
  padding: 0rem 2rem 0rem 2rem;
}

.profile-pic {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex-grow: 1;
  margin-left: 1rem;
}

.name{
  font-size: 1.25rem;
  font-weight: bold;
  color: #000;
}

.role{
  font-size: 0.9rem;
  font-weight: bold;
  color: #555;
}

.email, .contact {
  font-size: 0.9rem;
  color: #555;
}

.reports {
  text-align: center;
  padding: 0rem 0rem 0rem 0rem;
  align-items: center;
  justify-content: center;
}

.ReportsNumber{
  font-size: 2rem;
  font-weight: bold;
  color: black;
  padding: 0rem 0rem 0rem 0rem;
}

.ReportsSubmitted{
  font-size: .9rem;
  font-weight: bold;
  color: #555;
  padding: 2rem 0rem 0rem 0rem;
}
</style>