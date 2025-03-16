<template>
  <div class="search-bar-wrapper">
    <div class="search-bar-container">
      <input 
        type="text" 
        placeholder="Search for reports" 
        class="search-input"
      />
      <img src="@/assets/searchLogo.png" alt="Search" class="search-icon" />
    </div>
    <img src="@/assets/NotificationBell.png" alt="Notifications" class="notification-icon" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.search-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 15px; /* Space between search bar and notification bell */
}

.search-bar-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 540px;
  height: 51px;
  background: white;
  border-radius: 25px;
  padding: 10px 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  flex-grow: 1;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 5px;
}

.search-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 10px;
}

.notification-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-bar-wrapper {
    width: 90%;
  }
}
</style>
