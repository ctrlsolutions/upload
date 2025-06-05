<template>
  <div class="container">
    <!-- Sidebar -->
    <!-- TODO: deal with nav links -->
    <nav class="sidebar">
      <div class="sidebar-top-group">
        <img src="@/assets/logo.png" alt="logo" class="logo" />
      </div>
      <div class="sidebar-mid-group">
        <router-link :to="dashboardRoute" class="nav-link" :class="{ active: $route.path === dashboardRoute }">
          <v-icon name="md-spacedashboard-round" class="icon" scale="3" />
          <span class="icon-label">Dashboard</span>
        </router-link>
        <router-link to="/submit" class="nav-link" :class="{ active: $route.path === '/submit' }">
          <v-icon name="fa-folder-open" class="icon" />
          <span class="icon-label">Submit Report</span>
        </router-link>
        <router-link to="/generate" class="nav-link" :class="{ active: $route.path === '/generate' }">
          <v-icon name="fa-clipboard-list" class="icon" />
          <span class="icon-label">Generate Report</span>
        </router-link>
        <router-link to="/report" class="nav-link" :class="{ active: $route.path === '/report' }">
          <v-icon name="fa-history" class="icon" />
          <span class="icon-label">Report History</span>
        </router-link>
        <router-link
          to="/report"
          class="nav-link"
          :class="{ active: $route.path === '/members' }"
          v-if="
            userStore.getUserProfile?.role.code == 'AD' ||
            userStore.getUserProfile?.role.code == 'CD' ||
            userStore.getUserProfile?.role.code == 'DH'
          "
        >
          <v-icon name="io-people" class="icon" />
          <span class="icon-label">Members</span>
        </router-link>
        <router-link
          :to="adminRoute"
          class="nav-link"
          :class="{ active: $route.path === adminRoute }"
          v-if="userStore.getUserProfile?.role.code == 'AD'"
        >
          <v-icon name="md-adminpanelsettings-round" class="icon" />
          <span class="icon-label">Admin Panel</span>
        </router-link>
      </div>
      <div class="sidebar-bottom-group">
        <router-link :to="profileRoute" class="profile-link" :class="{ active: $route.path === profileRoute }">
          <v-icon name="io-person" class="icon" />
        </router-link>
        <router-link :to="settingsRoute" class="profile-link" :class="{ active: $route.path === settingsRoute }">
          <v-icon name="bi-gear-fill" class="icon" />
        </router-link>
        <router-link :to="settingsRoute" class="profile-link" @click="logout">
          <v-icon name="fa-sign-out-alt" class="icon" />
        </router-link>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()

const username = ref<string | undefined>('')

const dashboardRoute = computed(() => (username.value ? `/${username.value}` : '/login'))
const profileRoute = computed(() => (username.value ? `/${username.value}/profile` : '/login'))
const settingsRoute = computed(() => (username.value ? `/${username.value}/settings` : '/login'))
const adminRoute = computed(() => (username.value ? `/${username.value}/admin` : '/login'))

onMounted(async () => {
  if (!userStore.initialized) {
    await userStore.fetchUserProfile()
  }
  username.value = userStore.getUserProfile?.username
})

const logout = async () => {
  //  await userStore.logout
}
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 0.1fr 4.5fr;
  grid-template-areas: 'sidebar main';
  box-sizing: border-box;
  margin: 0 auto;
  background-size: cover;
  background: linear-gradient(to bottom right, #f6ddde, #ddf6e9);
  padding: 0.75em;
  width: 100vw;
  height: 100vh;
}

.sidebar {
  display: flex;
  position: sticky;
  grid-area: sidebar;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  box-sizing: border-box;
  margin: 0.5em 0.5em 0.5em 0em;
  margin-top: 0.05em;
  margin-bottom: 0.02em;
  border-radius: 10px;
  background-color: $red;
  padding: 1em;
  width: 5em;
}

.nav-link,
.profile-link,
.settings-link {
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    background-color 0.15s ease-in-out,
    transform 0.15s ease-in-out;
  border-radius: 5px;
  padding: 10px;
  color: white;
  text-decoration: none;
}

.nav-link.active,
.profile-link.active {
  border-radius: 4px;
  background-color: #a04747;
}

.logo {
  position: relative;
  width: 40px;
  height: 40px;
}
.icon {
  position: relative;
  width: 35px;
  height: 35px;
}
.icon-label {
  display: none;
  position: absolute;
  top: 50%;
  left: 75%; // show to the right of the icon
  transform: translateY(-50%);
  z-index: 10;
  margin-left: 0.5em;
  border-radius: 5px;
  background-color: #a04747;
  padding: 27% 10px;
  height: 100%;
  color: white;
  white-space: nowrap;
}
.nav-link:hover > .icon-label {
  display: block;
}

.nav-link {
  position: relative; // allow absolute children
}

.nav-link:hover {
  transform: translateX(15px);
  background-color: #a04747;
}
.nav-link:not(:hover) {
  transform: none;
  transition: none;
}

.nav-link:hover > .icon-label {
  display: inline;
  width: fit-content;
}

.profile-link:hover,
.settings-link:hover {
  background-color: #a04747;
}

.sidebar-mid-group,
.sidebar-bottom-group {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.content {
  grid-area: 'main';
  justify-content: start;
  align-items: start;
  z-index: 0;
  width: 100%;
}
</style>
