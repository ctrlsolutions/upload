<template>
  <div class="my-profile">
    <div class="profile-header">MY PROFILE</div>
    <div class="profile-content">
      <img :src="user.profilePicture" alt="Profile Picture" class="profile-pic" />
      <div class="user-info">
        <p class="name">{{ user.name }}</p>
        <p class="role">{{ user.role }}</p>
        <p class="email">{{ user.email }}</p>
        <p class="contact">{{ user.contact }}</p>
      </div>
      <div class="reports">
        <p class="ReportsSubmitted">Reports Submitted</p>
        <p class="ReportsNumber">{{ user.reportsSubmitted }}</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "MyProfile",
  data() {
    return {
      user: {
      profilePicture: new URL('@/assets/DefaultProfile.png', import.meta.url).href,// Default profile picture
        name: "Prof. Chraine Paul Tuazon",
        role: "College Dean",
        email: "chretuara@up.edu.ph",
        contact: "09334455667",
        reportsSubmitted: 69,
      },
    };
  },
  // Fetching functionality will be added once the backend is ready
};
</script>

<style scoped>
.my-profile {
  width: 593px;
  height: 240px;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 0rem 0rem 0rem;
}

.profile-header {
  width: 100%;
  background: #1a3d21;
  color: white;
  text-align: left;
  padding: 1rem 1rem 1rem 1.5rem;
  font-weight: bold;
}

.profile-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
 
  padding: 2rem 2rem 0rem 2rem;
}

.profile-pic {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  flex-grow: 1;
  margin-left: 1rem;
}

.name{
  font-size: 1.25rem;
  font-weight: bold;
  color: #000;
}

.role{
  font-size: 0.9rem;
  font-weight: bold;
  color: #555;
}

.email, .contact {
  font-size: 0.9rem;
  color: #555;
}

.reports {
  text-align: center;
  padding: 0rem 0rem 0rem 0rem;
  align-items: center;
  justify-content: center;
}

.ReportsNumber{
  font-size: 2rem;
  font-weight: bold;
  color: black;
  padding: 0rem 0rem 0rem 0rem;
}

.ReportsSubmitted{
  font-size: .9rem;
  font-weight: bold;
  color: #555;
  padding: 2rem 0rem 0rem 0rem;
}
</style>
