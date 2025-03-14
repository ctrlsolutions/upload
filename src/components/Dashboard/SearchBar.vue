<template>
  <div class="search-bar-container">
    <input 
      type="text" 
      placeholder="Search for reports" 
      class="search-input"
    />
    <img src="@/assets/searchLogo.png" alt="Search" class="search-icon" />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
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
  flex-grow: 1; /* Makes it responsive */
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

/* Responsive Design */
@media (max-width: 768px) {
  .search-bar-container {
    width: 90%; /* Adjust width for smaller screens */
  }
}
</style>
