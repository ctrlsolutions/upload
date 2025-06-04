<template>
  <div class="my-profile">
    <CardComponent title="MY PROFILE" height="100%" width="100%" :header="true">
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else class="profile-content">
        <img :src="profileImage" alt="Profile Picture" class="profile-pic" />
        <div class="user-info">
          <p class="name">Prof. {{ userStore.getUserProfile?.last_name }}</p>
          <p class="role">{{ userStore.getUserProfile?.role}}</p>
          <p class="email">{{ userStore.getUserProfile?.email }}</p>
        </div>
        <div class="reports">
          <p class="ReportsSubmitted">Reports Submitted</p>
          <p class="ReportsNumber">{{ user.reportsSubmitted }}</p>
        </div>
      </div>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CardComponent from '@/components/Global/CardComponent.vue'
import { useUserStore } from '@/stores/UserStore'

const user = ref({
  profilePicture: '',
  fullName: '',
  role: '',
  email: '',
  reportsSubmitted: 0,
})
const isLoading = ref(true)
const error = ref<string | null>(null)
const defaultProfilePicture = new URL('@/assets/blank.jpg', import.meta.url).href
const userStore = useUserStore()
const profileImage = computed(() => user.value.profilePicture || defaultProfilePicture)

const formattedRole = computed((): string => {
  if (!user.value.role) return ''
  const role = user.value.role.toLowerCase()
  if (role === 'cd') return 'College Dean'
  if (role === 'f') return 'Faculty'
  if (role === 'c') return 'Chancellor'
  if (role === 'dc') return 'Department Chair'
  return user.value.role
})

const fetchUserProfile = async () => {
  try {
    const username = sessionStorage.getItem('username')
    // const dashboardData = await getProfileData(username)
    // if (dashboardData && dashboardData.data.user) {
    // user.value = {
    //   profilePicture: dashboardData.data.user.profile_picture || defaultProfilePicture,
    //   fullName: formatFullName(
    //     dashboardData.data.user.first_name,
    //     dashboardData.data.user.middle_name,
    //     dashboardData.data.user.last_name,
    //   ),
    //   role: dashboardData.data.user.role,
    //   email: dashboardData.data.user.email,
    //   reportsSubmitted: 0,
    // }
    // } else {
    //   throw new Error('Failed to load user data.')
    // }
  } catch (err) {
    error.value = 'Error fetching profile. Please try again.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

// const formatFullName = (firstName: string, middleName?: string, lastName: string): string => {
//   return `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();
// };

// Lifecycle hook
onMounted(fetchUserProfile)
</script>

<style scoped>
.my-profile {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* .profile-header {
  width: 46vw;
  background: #1a3d21;
  color: white;
  text-align: left;
  padding: 1rem 1rem 1rem 1.5rem;
  font-weight: bold;
  border-radius: 0%;
} */

.profile-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1.5rem 2rem;
}

.profile-pic {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: -1rem;
}

.user-info {
  flex-grow: 1;
  margin-left: 2rem;
}

.name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #000;
}

.role {
  font-size: 0.9rem;
  font-weight: bold;
  color: #555;
}

.email,
.contact {
  font-size: 0.9rem;
  color: #555;
}

.reports {
  text-align: center;
  padding: 0rem 0rem 0rem 0rem;
  align-items: center;
  justify-content: center;
}

.ReportsNumber {
  font-size: 2rem;
  font-weight: bold;
  color: black;
  padding: 0rem 0rem 0rem 0rem;
}

.ReportsSubmitted {
  font-size: 0.9rem;
  font-weight: bold;
  color: #555;
}

/* .card-header {
  padding: 0.75rem 1rem;
  background: #014421;
  color: white;
  font-size: 0.8rem;
  font-weight: 900;
  border-radius: 15px 15px 0px 0px;
  width: 100%;
  box-sizing: border-box;
} */

.card-title {
  margin: 0;
  font-weight: bold;
}

.card-content {
  padding: 1rem;
}
</style>
