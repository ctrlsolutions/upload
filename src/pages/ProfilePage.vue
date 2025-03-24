<template>
  <div class="container">
    <div class="upper-part">
      <div class="profile-card">
        <div class="header">My Profile</div>
        <div class="content">
          <img 
            src="https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg" 
            alt="Profile Picture" 
            class="profile-image"
          />
          <div class="profile-container">
            <h4 class="name">
              {{ dashboardData?.user.first_name }} {{ dashboardData?.user.middle_name }} {{ dashboardData?.user.last_name }}
            </h4>
            <h6  class="role">{{ formattedRole }}</h6>
            <p class="college">College of Science</p>
          </div>
        </div>
      </div>
      <div class="green-container">
        <div class="num-reports">{{ 0 }}</div>
        <div class="desc-container">
          <p class="desc">Record of Report Submissions</p>
          <p class="year">2024 - 2025</p>
        </div>
      </div>
    </div>
    <div class="lower-part">
      <div class="header">Personal Information</div>
      <div class="content">
        <div class="info-grid">
          <div class="info-container" id="left-info">
            <div class="info-group">
              <p class="info-type">First Name</p>
              <p class="info">Chraine</p>
            </div>
            <div class="info-group">
              <p class="info-type">Last Name</p>
              <p class="info">Tuazon</p>
            </div>
            <div class="info-group">
              <p class="info-type">Bio</p>
              <p class="info">College Dean</p>
            </div>
          </div>
          <div class="info-container" id="right-info">
            <div class="info-group">
              <p class="info-type">Middle Name</p>
              <p class="info">Tiger</p>
            </div>
            <div class="info-group">
              <p class="info-type">Email</p>
              <p class="info">cttuazon@up.edu.ph</p>
            </div>
            <div class="info-group">
              <p class="info-type">Contact</p>
              <p class="info">+09 987 645 32</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { getDashboardData } from "@/services/DashboardService";
import { DashboardData } from "@/types/DashboardInterface";

const dashboardData = ref<DashboardData | null>(null);

onMounted(async () => {
  dashboardData.value = await getDashboardData();
});

const formattedRole = computed(() => {
  if (!dashboardData.value?.user.role) return "";
  const role = dashboardData.value.user.role.toLowerCase(); 
  if (role === "cd") return "College Dean";
  if (role === "f") return "Faculty";
  if (role === "c") return "Chancellor";
  if (role === "dc") return "Department Chair";
  return dashboardData.value.user.role;
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0;
  padding: 2rem 2rem 2rem 1rem;
  display: grid;
  gap: 1.5rem;
}

.header {
  background: #006837;
  color: white;
  padding: 1rem 2rem;
  border-radius: 18px;
  font-weight: 500;
  font-size: 1.1rem;
}

.content {
  padding: 2rem;
}

.upper-part {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;  
  width: 100%;
}

.profile-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  width: 46.5rem;

  .content {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;

  }

  .profile-image {
    width: 11rem;
    height: 11rem;
    border-radius: 100%;
    object-fit: cover;
    margin-left: 2rem;
  }
}

.profile-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 3rem;
  padding-top: 1rem;

  .name {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    color: #333;
  }

  .role {
    font-size: 1.1rem;
    color: #666;
    margin: 0.5rem 0;
    font-weight: normal;
  }

  .college {
    font-size: 1rem;
    color: #888;
    margin: 0;
  }
}

.green-container {
    background: linear-gradient(135deg, #014421, #036632, #007C3B);
    border-radius: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 46.5rem;
    height: 100%;

    .num-reports {
        font-size: 13.5rem;
        font-weight: bold;
        margin-bottom: -3.5rem;
        margin-top: -3rem;
        color: rgba(255, 255, 255, 0.7);
    }

    .desc-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start; 
        padding-left: 2rem; 
        
        .desc {
            font-size: 1.4rem;
            margin: 0;
            line-height: 1.5;
        }

        .year {
            font-size: 1rem;
            margin: 0.5rem 0 0;
            opacity: 0.9;
        }
    }
}

.lower-part {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;  
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding-left: 4rem;
}

.info-container {
  .info-group {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .info-type {
    color: #666;
    font-size: 1rem;
    margin: 0 0 0.25rem;
  }

  .info {
    color: #333;
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
  }
}
</style>