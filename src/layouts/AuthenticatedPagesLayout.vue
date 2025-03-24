<template>
  <div class="container">
    <!-- Sidebar -->
    <!-- TODO: deal with nav links -->
    <nav class="sidebar">
      <div class="sidebar-top-group">
        <img src="@/assets/navbar/logo.png" alt="logo" class="logo" />
      </div>
      <div class="sidebar-mid-group">
        <router-link to="/authenticated/dashboard" class="nav-link">
          <img
            src="@/assets/navbar/dashboard.png"
            alt="dashboard"
            class="icon"
          />
          <span class="icon-label">Dashboard</span>
        </router-link>
        <router-link to="/" class="nav-link">
          <img
            src="@/assets/navbar/submit_report.png"
            alt="submit-report"
            class="icon"
          />
          <span class="icon-label">Submit Report</span>
        </router-link>
        <router-link to="/" class="nav-link">
          <img
            src="@/assets/navbar/report_history.png"
            alt="report-history"
            class="icon"
          />
          <span class="icon-label">Report History</span>
        </router-link>
        <router-link to="/" class="nav-link">
          <img src="@/assets/navbar/members.png" alt="members" class="icon" />
          <span class="icon-label">Members</span>
        </router-link>
        <router-link to="/" class="nav-link">
          <img
            src="@/assets/navbar/report_summary.png"
            alt="report-summary"
            class="icon"
          />
          <span class="icon-label">Report Summary</span>
        </router-link>
      </div>
      <div class="sidebar-bottom-group">
        <router-link to="/" class="profile-link">
          <img src="@/assets/navbar/profile.png" alt="profile" class="icon" />
        </router-link>
        <router-link to="/" class="settings-link">
          <img src="@/assets/navbar/settings.png" alt="settings" class="icon" />
        </router-link>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: 0.5fr 4.5fr;
  grid-template-rows: 1fr;
  padding: 2em;
  grid-template-areas: 'sidebar main';
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

.sidebar {
  grid-area: sidebar;
  width: 5em;
  background-color: $red;
  padding: 2em;
  // margin: 2em 0em 2em 2em;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  width: 0px;
  height: 30px;
  position: relative;
  z-index: 2;
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
  grid-area: main;
  width: calc((100vw - 2em - 1%) * (4 / 4.5));
  background-color: red;
  // margin: 2em 2em 2em 0em;
}
</style>
