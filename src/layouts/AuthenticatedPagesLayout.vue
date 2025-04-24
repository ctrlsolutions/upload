<template>
  <div class="container">
    <!-- Sidebar -->
    <!-- TODO: deal with nav links -->
    <nav class="sidebar">
      <div class="sidebar-top-group">
        <img src="@/assets/logo.png" alt="logo" class="logo" />
      </div>
      <div class="sidebar-mid-group">
        <router-link :to="dashboardRoute" class="nav-link">
          <v-icon name="md-spacedashboard-round" class="icon" scale="3" />
          <span class="icon-label">Dashboard</span>
        </router-link>
        <router-link to="/submit" class="nav-link">
          <v-icon name="fa-folder-open" class="icon" />
          <span class="icon-label">Submit Report</span>
        </router-link>
        <router-link to="/generate" class="nav-link">
          <v-icon name="fa-clipboard-list" class="icon" />
          <span class="icon-label">Generate Report</span>
        </router-link>
        <router-link to="/report" class="nav-link">
          <v-icon name="fa-history" class="icon" />
          <span class="icon-label">Report History</span>
        </router-link>
        <router-link to="/report" class="nav-link">
          <v-icon name="io-people" class="icon" />
          <span class="icon-label">Members</span>
        </router-link>
        <router-link :to="adminRoute" class="nav-link">
          <v-icon name="md-adminpanelsettings-round" class="icon" />
          <span class="icon-label">Admin Panel</span>
        </router-link>
      </div>
      <div class="sidebar-bottom-group">
        <router-link :to="profileRoute" class="profile-link">
          <v-icon name="io-person" class="icon" />
        </router-link>
        <router-link :to="settingsRoute" class="settings-link">
          <v-icon name="bi-gear-fill" class="icon" />
        </router-link>
        <router-link :to="settingsRoute" class="settings-link">
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

<script setup>
import { computed } from 'vue'

const username = sessionStorage.getItem('username') || ''

const dashboardRoute = computed(() => (username ? `/${username}` : '/login'))
const profileRoute = computed(() => (username ? `/${username}/profile` : '/login'))
const settingsRoute = computed(() => (username ? `/${username}/settings` : '/login'))
const adminRoute = computed(() => (username ? `/${username}/admin` : '/login'))
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 0.5fr 4.5fr;
  grid-template-rows: 1fr;
  padding: 0.5em 0em;
  grid-template-areas: 'sidebar main';
  width: 100vw;
  height: 100vh;
  // background: url('@/assets/DashboardBG.png') no-repeat center center fixed;
  background-size: cover;
  background: linear-gradient(to bottom right, #f6ddde, #ddf6e9);
  box-sizing: border-box;
  margin: 0 auto;
}

.sidebar {
  grid-area: sidebar;
  width: 5em;
  background-color: $red;
  padding: 2em;
  margin: 1em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  box-sizing: border-box;
  margin-top: 0.05em;
  margin-bottom: 0.02em;
}

.nav-link,
.profile-link,
.settings-link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  transition:
    background-color 0.15s ease-in-out,
    transform 0.15s ease-in-out;
}
.logo {
  width: 40px;
  height: 40px;
  position: relative;
}
.icon {
  width: 35px;
  height: 35px;
  position: relative;
}
.icon-label {
  display: none;
  height: 30px;
  position: relative;
  padding-left: 5px;
}
.nav-link:hover {
  background-color: #a04747;
  transform: translateX(50px);
}
.nav-link:not(:hover) {
  transform: none;
  transition: none;
}
.nav-link:hover > .icon-label {
  display: inline;
  width: 130px;
}
.profile-link:hover,
.settings-link:hover {
  background-color: #a04747;
}
.content {
  grid-area: 'main';
  width: 100%;
  z-index: 0;
  justify-content: start;
  align-items: start;
  margin-left: -2rem;
}
</style>
