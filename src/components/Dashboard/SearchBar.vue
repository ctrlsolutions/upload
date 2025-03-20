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
  gap: 1rem; /* Space between search bar and notification bell */
}

.search-bar-container {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 44.5rem;
  height: 3.188rem;
  background: white;
  border-radius: 1.5rem;
  padding: .625rem .938rem;
  box-shadow: 0 .125rem .313rem rgba(0, 0, 0, 0.1);
  border: .063rem solid #ccc;
  flex-grow: 1;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: .5rem;
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  margin-left: .625;
}

.notification-icon {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-bar-wrapper {
    width: 90%;
  }
}
</style>