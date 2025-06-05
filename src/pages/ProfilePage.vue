<template>
  <div class="profile_containers">
    <div class="upper-area">
      <CardComponent class="profile-card" width="100%" height="100%" :header="true" title="My Profile">
        <div class="content">
          <div class="profile-image-container">
            <img
              :src="
                dashboardData?.profile_picture ||
                'https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg'
              "
              alt="Profile Picture"
              class="profile-image"
            />
          </div>
          <div class="profile-container">
            <h4 class="name">
              {{ dashboardData?.first_name }}
              {{ dashboardData?.middle_name || '' }}
              {{ dashboardData?.last_name }}
            </h4>
            <h6 class="role">{{ dashboardData?.role }}</h6>
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

    <div class="lower-area">
      <CardComponent width="100%" height="100%" :header="true" title="Personal Information">
        <div class="content">
          <div class="info-grid">
            <div class="info-container" id="left-info">
              <div class="info-group">
                <p class="info-type">First Name</p>
                <p class="info">{{ dashboardData?.first_name || 'N/A' }}</p>
              </div>
              <div class="info-group">
                <p class="info-type">Last Name</p>
                <p class="info">{{ dashboardData?.last_name || 'N/A' }}</p>
              </div>
              <div class="info-group">
                <p class="info-type">Role</p>
                <p class="info">{{ dashboardData?.role.name || 'N/A' }}</p>
              </div>
              <div class="info-group">
                <p class="info-type">College</p>
                <p class="info">{{ dashboardData?.college?.name || 'N/A' }}</p>
              </div>
            </div>
            <div class="info-container" id="right-info">
              <div class="info-group">
                <p class="info-type">Middle Name</p>
                <p class="info" :class="{ italic: dashboardData?.middle_name === 'N/A' }">
                  {{ dashboardData?.middle_name || 'N/A' }}
                </p>
              </div>
              <div class="info-group">
                <p class="info-type">Email</p>
                <p class="info" :class="{ italic: dashboardData?.email === 'N/A' }">
                  {{ dashboardData?.email || 'N/A' }}
                </p>
              </div>
              <div class="info-group">
                <p class="info-type">Department</p>
                <p class="info">{{ dashboardData?.department?.name || 'N/A' }}</p>
              </div>
            </div>
          </div>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/Global/CardComponent.vue'
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()
const dashboardData = computed(() => userStore.getUserProfile)

onMounted(async () => {
  if (!userStore.profile) {
    await userStore.fetchUserProfile()
  }
})
</script>

<style lang="scss" scoped>
.profile_containers {
  display: grid;
  grid-template-rows: 0.3fr 0.4fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    'upper-area'
    'lower-area';
  gap: 1%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  max-height: 100%;
  overflow: hidden;
}

.italic {
  font-style: italic;
}

.upper-area {
  display: grid;
  grid-template-columns: 3.5fr 3fr;
  grid-auto-columns: 1fr;
  grid-area: upper-area;
  gap: 0.5em;
  height: 100%;
}

.lower-area {
  grid-area: lower-area;
  height: 100%;
  // overflow-y: hidden;
  // padding: 1rem;
}

.lower-area::-webkit-scrollbar {
  width: 0.5rem;
}

.lower-area::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
}

.lower-area::-webkit-scrollbar-track {
  background: transparent;
}

.profile-card {
  opacity: 0.8;
  background-image: radial-gradient(#a4a4b3 0.5px, #f7f7f7 0.5px);
  background-size: 10px 10px;
  background-color: #f4f4f8;
  height: 100%;
  .content {
    display: flex;
    align-items: center;
    justify-self: flex-start;
    gap: 1rem;
    padding: 1rem 1rem;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .profile-image-container {
    display: flex;
    justify-content: center;

    .profile-image {
      transition: transform 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border: 3px solid #014421;
      border-radius: 50%;
      width: 11rem;
      height: 10.5rem;
      object-fit: cover;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

.profile-container {
  margin-left: 2.5rem;
  // grid-area: lower-area;

  .name {
    color: #333;
    font-weight: 700;
    font-size: 2rem;
  }

  .role {
    color: #666;
    font-weight: bold;
    font-size: 1rem;
    text-align: left;
  }

  .college {
    margin: 0;
    color: #888;
    font-size: 1rem;
    text-align: left;
  }
}

.green-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #014421, #036632, #007c3b);
  height: 100%;
  color: white;

  .num-reports {
    transition: transform 0.3s ease;
    margin-top: -3rem;
    margin-bottom: -3.5rem;
    height: fit-content;
    color: rgba(255, 255, 255, 0.7);
    font-weight: bold;
    font-size: 10rem;

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
      margin: 0;
      font-size: 1.4rem;
      line-height: 1.5;
    }

    .year {
      opacity: 0.9;
      margin: 0.5rem 0 0;
      font-size: 1rem;
    }
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: -1rem;
  padding: 1rem;
}

.info-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;

  .info-group {
    gap: 0.5rem;
    transition: transform 0.2s ease;
    border-bottom: 1px solid #eee;
    padding-bottom: 1.5rem;
    width: 100%;

    &:hover {
      transform: translateX(5px);
    }

    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }
  }

  .info-type {
    margin: 0 0 0.25rem;
    color: #666;
    font-size: 0.8rem;
  }

  .info {
    margin: 0;
    border-left: 3px solid #014421;
    padding-left: 1rem;
    color: #333;
    font-weight: 500;
    font-size: 1.1rem;
  }
}
</style>
