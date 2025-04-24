<template>
  <div class="profile_container">
    <div class="upper-area">
      <CardComponent class="profile-card" width="100%" height="100%" :header="true" title="My Profile">
        <div class="content">
          <div class="profile-image-container">
            <img
              :src="
                dashboardData?.user.profile_picture ||
                'https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg'
              "
              alt="Profile Picture"
              class="profile-image"
            />
          </div>
          <div class="profile-container">
            <h4 class="name">
              {{ dashboardData?.user.first_name }}
              {{ dashboardData?.user.middle_name || '' }}
              {{ dashboardData?.user.last_name }}
            </h4>
            <h6 class="role">{{ formattedRole }}</h6>
            <p class="college">College of Science</p>
          </div>
        </div>
      </CardComponent>

      <CardComponent class="green-container" width="100%" height="100%">
        <div class="num-reports">1269</div>
        <div class="desc-container">
          <p class="desc">Record of Report Submissions</p>
          <p class="year">2024 - 2025</p>
        </div>
      </CardComponent>
    </div>

    <CardComponent width="100%" height="100%" :header="true" title="Personal Information">
      <div class="lower-area">
        <div class="content">
          <div class="info-grid">
            <div class="info-container" id="left-info">
              <div class="info-group">
                <p class="info-type">First Name</p>
                <p class="info">{{ dashboardData?.user.first_name || 'N/A' }}</p>
              </div>
              <div class="info-group">
                <p class="info-type">Last Name</p>
                <p class="info">{{ dashboardData?.user.last_name || 'N/A' }}</p>
              </div>
              <div class="info-group">
                <p class="info-type">Role</p>
                <p class="info">{{ formattedRole }}</p>
              </div>
              <div class="info-group">
                <p class="info-type">College</p>
                <p class="info">{{ formattedRole }}</p>
              </div>
            </div>
            <div class="info-container" id="right-info">
              <div class="info-group">
                <p class="info-type">Middle Name</p>
                <p class="info">{{ dashboardData?.user.middle_name || 'N/A' }}</p>
              </div>
              <div class="info-group">
                <p class="info-type">Email</p>
                <p class="info">{{ dashboardData?.user.email || 'N/A' }}</p>
              </div>
              <div class="info-group">
                <p class="info-type">Department</p>
                <p class="info">{{ dashboardData?.user.email || 'N/A' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardComponent>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/Global/CardComponent.vue'
import { ref, computed, onMounted } from 'vue'
import { getProfileData } from '@/services/ProfileService'
import { ProfileData } from '@/types/ProfileInterface'

const dashboardData = ref<ProfileData | null>(null)

onMounted(async () => {
  const username = sessionStorage.getItem('username')
  const response = await getProfileData(username)
  dashboardData.value = response.data
})

const formattedRole = computed(() => {
  if (!dashboardData.value?.user.role) return ''
  const role = dashboardData.value.user.role.toLowerCase()
  if (role === 'cd') return 'College Dean'
  if (role === 'f') return 'Faculty'
  if (role === 'c') return 'Chancellor'
  if (role === 'dc') return 'Department Chair'
  return dashboardData.value.user.role
})
</script>

<style lang="scss" scoped>
.profile_container {
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1fr; 
  grid-template-rows: 1fr 1fr; 
  gap: 1% 1%; 
  grid-template-areas: 
    "upper-area"
    "lower-area"; 
  overflow: hidden;
}

.upper-area {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 3.5fr 3fr;
  gap: 0px 1em;
  grid-area: upper-area;
}

.lower-area {
  height: 37vh;
  display: grid; 
  grid-template-columns: 1fr; 
  grid-template-rows: 1fr; 
  grid-template-areas: 
    "."; 
  grid-area: lower-area;
  overflow-y: auto;
  padding: 1rem;
}

.lower-area::-webkit-scrollbar {
  width: 0.5rem;
}

.lower-area::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2); 
  border-radius: 0.5rem; 
}

.lower-area::-webkit-scrollbar-track {
  background: transparent;
}

.profile-card {
  height: 50%;
  .content {
    padding: 3rem;
    justify-self: flex-start;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    text-align: center;
  }

    .profile-image-container {
    display: flex;
    justify-content: center;
    
    .profile-image {
      width: 11rem;
      height: 11rem;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #014421;
      transition: transform 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      
      &:hover {
        transform: scale(1.05);
      }
      
      @media (max-width: 992px) {
        width: 9rem;
        height: 9rem;
      }
      
      @media (max-width: 576px) {
        width: 8rem;
        height: 8rem;
      }
    }
  }
}

.profile-container {
  margin-left: 2.5rem;
  display: grid; 
  grid-template-columns: 1fr; 
  grid-template-rows: 1fr; 
  gap: 0% 0px;
  grid-area: lower-area; 

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
  background: linear-gradient(135deg, #014421, #036632, #007c3b);
  border-radius: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;

  .num-reports {
    font-size: 13rem;
    font-weight: bold;
    margin-bottom: -3.5rem;
    margin-top: -3rem;
    color: rgba(255, 255, 255, 0.7);
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .desc-container {
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

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: -1.5rem;
  padding: 1rem;
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: flex-start;

  .info-group {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #eee;
    transition: transform 0.2s ease;
    width: 100%;
    gap: 0.5rem;
    
    &:hover {
      transform: translateX(5px);
    }

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }
  }

  .info-type {
    color: #666;
    font-size: 0.8rem;
    margin: 0 0 0.25rem;
  }

  .info {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
    color: #333;
    padding-left: 1rem;
    border-left: 3px solid #014421;
  }
}
</style>