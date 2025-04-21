<template>
  <div class="container">
    <div class="upper-area">
      <CardComponent
        class="profile-card"
        width="100%"
        height="100%"
        :header="true"
        title="My Profile"
      >
        <div class="content">
          <img
            :src="
              dashboardData?.user.profile_picture ||
              'https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg'
            "
            alt="Profile Picture"
            class="profile-image"
          />
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

    <CardComponent
      class="lower-area"
      width="100%"
      height="100%"
      :header="true"
      title="Personal Information"
    >
      <div class="content">
        <div class="info-grid">
          <div class="info-container" id="left-info">
            <div class="info-group">
              <p class="info-type">First Name</p>
              <p class="info">{{ dashboardData?.user.first_name || 'N/A' }}</p>
              <p class="info">{{ dashboardData?.user.first_name || 'N/A' }}</p>
            </div>
            <div class="info-group">
              <p class="info-type">Last Name</p>
              <p class="info">{{ dashboardData?.user.last_name || 'N/A' }}</p>
              <p class="info">{{ dashboardData?.user.last_name || 'N/A' }}</p>
            </div>
            <div class="info-group">
              <p class="info-type">Bio</p>
              <p class="info">{{ formattedRole }}</p>
              <p class="info">{{ formattedRole }}</p>
            </div>
          </div>
          <div class="info-container" id="right-info">
            <div class="info-group">
              <p class="info-type">Middle Name</p>
              <p class="info">{{ dashboardData?.user.middle_name || 'N/A' }}</p>
              <p class="info">{{ dashboardData?.user.middle_name || 'N/A' }}</p>
            </div>
            <div class="info-group">
              <p class="info-type">Email</p>
              <p class="info">{{ dashboardData?.user.email || 'N/A' }}</p>
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
.container {
  padding: 0;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 2fr 2.5fr;
  gap: 1em 0%;
  grid-template-areas:
    'upper-area'
    'lower-area';
}

.upper-area {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 3.5fr 3fr;
  gap: 0px 1em;
  grid-area: upper-area;
}

.lower-area {
  grid-area: lower-area;
}

.header {
  background: #006837;
  color: white;
  padding: 1rem 2rem;
  font-weight: 500;
  font-size: 1.1rem;
  width: 100%;
  margin: -1rem -1rem 0;
  width: calc(100% + 2rem);
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
  width: 100%;

  .content {
    padding: 2rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
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
    font-size: 1.5rem;
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
  width: 100%;
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

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 3rem;
  padding: 0rem;
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1rem;
  .info-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .info-type {
    color: #666;
    font-size: 0.8rem;
    margin: 0 0 0.25rem;
  }

  .info {
    color: #333;
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    padding-left: 1rem;
  }
}
</style>
