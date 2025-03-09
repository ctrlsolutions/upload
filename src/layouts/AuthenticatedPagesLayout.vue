<template>
    <div class="container">
    <!-- Sidebar -->
     <!-- TODO: deal with nav links -->
      <nav class="sidebar">
        <div class="sidebar-top-group">
            <img src="@/assets/navbar/logo.png" alt="logo" class="logo" />
        </div>
        <div class="sidebar-mid-group">
            <router-link to="/" class="nav-link">
                <img src="@/assets/navbar/dashboard.png" alt="dashboard" class="icon" />
                <span class="icon-label">Dashboard</span>         
            </router-link>
            <router-link to="/" class="nav-link">
                <img src="@/assets/navbar/submit_report.png" alt="submit-report" class="icon" />
                <span class="icon-label">Submit Report</span>  
            </router-link>
            <router-link to="/" class="nav-link">
                <img src="@/assets/navbar/report_history.png" alt="report-history" class="icon" />
                <span class="icon-label">Report History</span>  
            </router-link>
            <router-link to="/" class="nav-link">
                <img src="@/assets/navbar/members.png" alt="members" class="icon" />
                <span class="icon-label">Members</span>  
            </router-link>
            <router-link to="/" class="nav-link">
                <img src="@/assets/navbar/report_summary.png" alt="report-summary" class="icon" />
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
  export default {};
  </script>
  
  <style scoped>
  .container {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 75px;
    background-color: #7B1113;
    padding: 20px;
    margin: 2vw;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
  }
  
  .nav-link, .profile-link, .settings-link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    text-decoration: none;
    color: white;
    border-radius: 5px;
    transition: background-color 0.15s ease-in-out, transform 0.15s ease-in-out;
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
    width: 0px;
    height: 30px;
    position: relative;
    z-index: -1;
    padding-left: 5px;
  }
  .nav-link:hover {
    background-color: #A04747;
    transform: translateX(50px) ;
  }
  .nav-link:not(:hover) {
    transform: none; /* Instantly resets position */
    transition: none; /* Removes animation on unhover */
  }
  .nav-link:hover > .icon-label {
    width: 130px;
    z-index: 2;
  }
  .profile-link:hover, .settings-link:hover {
    background-color: #A04747;
  }
  </style>
  