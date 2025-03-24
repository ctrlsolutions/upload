<template>
  <div class="container">
    <div class="upper-part">
      <CardComponent class="profile-card" width="46.5rem" height="23rem">
        <div class="header">My Profile</div>
        <div class="content">
          <img 
            src="https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg" 
            alt="Profile Picture" 
            class="profile-image"
          />
          <div class="profile-container">
            <h4 class="name">Chraine Paul T. Tuazon</h4>
            <h6 class="role">College Dean</h6>
            <p class="college">College of Science</p>
          </div>
        </div>
      </CardComponent>
      <CardComponent class="green-container" width="46.5rem" height="23rem">
        <div class="num-reports">1269</div>
        <div class="desc-container">
          <p class="desc">Record of Report Submissions</p>
          <p class="year">2024 - 2025</p>
        </div>
      </CardComponent>
    </div>
    <CardComponent class="lower-part" width="94rem" height="28rem">
      <div class="header">Personal Information</div>
      <div class="content">
        <div class="info-grid">
          <div class="info-container" id="left-info">
            <div class="info-group">
              <p class="info-type">First Name</p>
              <p class="info">Chraine</p>
            </div>
            <div class="info-group">
              <p class="info-type">Last Name</p>
              <p class="info">Tuazon</p>
            </div>
            <div class="info-group">
              <p class="info-type">Bio</p>
              <p class="info">College Dean</p>
            </div>
          </div>
          <div class="info-container" id="right-info">
            <div class="info-group">
              <p class="info-type">Middle Name</p>
              <p class="info">Tiger</p>
            </div>
            <div class="info-group">
              <p class="info-type">Email</p>
              <p class="info">cttuazon@up.edu.ph</p>
            </div>
            <div class="info-group">
              <p class="info-type">Contact</p>
              <p class="info">+09 987 645 32</p>
            </div>
          </div>
        </div>
      </div>
    </CardComponent>
  </div>
</template>

<script lang="ts" setup>
import CardComponent from '@/components/Global/CardComponent.vue';
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0;
  padding: 0rem 0rem 4rem 2rem;
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-template-rows: auto auto; 
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header {
  background: #006837;
  color: white;
  padding: 1rem 2rem;
  font-weight: 500;
  font-size: 1.1rem;
  width: 100%;
  margin: -1rem -1rem 0;
  width: calc(100% + 2rem);
}

.content {
  padding: 2rem;
}

.upper-part {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;  
  width: 100%;
}

.profile-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  width: 46.5rem;

  .content {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
  }

  .profile-image {
    width: 11rem;
    height: 11rem;
    border-radius: 100%;
    object-fit: cover;
    margin-left: 2rem;
  }
}

.profile-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 3rem;
  padding-top: 1rem;

  .name {
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
    color: #333;
  }

  .role {
    font-size: 1.1rem;
    color: #666;
    margin: 0.5rem 0;
    font-weight: normal;
  }

  .college {
    font-size: 1rem;
    color: #888;
    margin: 0;
  }
}

.green-container {
    background: linear-gradient(135deg, #014421, #036632, #007C3B);
    border-radius: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 46.5rem;
    height: 100%;

    .num-reports {
        font-size: 13.5rem;
        font-weight: bold;
        margin-bottom: -3.5rem;
        margin-top: -3rem;
        color: rgba(255, 255, 255, 0.7);
    }

    .desc-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start; 
        padding-left: 2rem; 
        
        .desc {
            font-size: 1.4rem;
            margin: 0;
            line-height: 1.5;
        }

        .year {
            font-size: 1rem;
            margin: 0.5rem 0 0;
            opacity: 0.9;
        }
    }
}

.lower-part {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
  grid-column: span 2;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding-left: 4rem 4rem;
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 2rem;
  .info-group {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .info-type {
    color: #666;
    font-size: 1rem;
    margin: 0 0 0.25rem;
  }

  .info {
    color: #333;
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0;
    padding-left: 1rem;
  }
}
</style>