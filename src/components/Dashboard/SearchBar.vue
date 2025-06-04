<template>
  <div class="search-bar-wrapper">
    <div class="search-bar-container">
      <input type="text" placeholder="Search for reports" class="search-input" />
      <img src="@/assets/searchLogo.png" alt="Search" class="search-icon" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.search-bar-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  @include sm {
    width: 100%;
  }
}

.search-bar-container {
  display: flex;
  align-items: center;
  box-shadow: 0 0.125rem 0.313rem rgba(0, 0, 0, 0.1);
  border: 0.063rem solid #ccc;
  border-radius: 1.5rem;
  background: white;
  padding: 0.625rem 0.938rem;
  width: 100%;
  @include sm {
  }
}

.search-input {
  flex: 1;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
}

.search-icon {
  cursor: pointer;
  margin-left: 0.625;
  width: 1.25rem;
  height: 1.25rem;
}

// .notification-icon {
//   cursor: pointer;
//   width: 2.5rem;
//   height: 2.5rem;
// }

/* Responsive Design */
@media (max-width: 768px) {
  .search-bar-wrapper {
    width: 100%;
  }
}
</style>
