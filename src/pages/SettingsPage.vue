<template>
  <!-- USE CARD WITH HEADER: WHOLE CONTAINER -->
  <div class="container">
    <div class="header">
      <h1>Account Settings</h1>
    </div>
    
    <div class="card">
      <div class="card-header">
        <h2>My Profile</h2>
      </div>
      
      <!-- USE NORMAL CARD: USER INFO -->
      <div class="user-card">
        <img 
          src="https://i.pinimg.com/736x/93/dd/a6/93dda651f941477847f7f74835f67288.jpg" 
          alt="User profile" 
          class="user-image" 
        />
        <div class="user-info">
          <p class="name">Chraine Paul T. Tuazon</p>
          <p class="role">College Dean</p>
          <p class="college">College of Science</p>
        </div>
        <div class="button-container">
          <BaseFormButton variant="red">Delete Account</BaseFormButton>
          <BaseFormButton variant="green">Log out</BaseFormButton>
        </div>
      </div>

      <!-- USE FOLDER COMPONENT -->
      <div class="folder">
        <div class="folder-header">
          <h2>Personal Information</h2>
          <BaseFormButton variant="black">
            <span>✎</span> Edit
          </BaseFormButton>
        </div>
        
        <div class="folder-content">
          <div class="first-row">
            <BaseTextInput 
              label="First Name"
              v-model="firstName"
              placeholder="Enter first name"
            />
            <BaseTextInput 
              label="Middle Name"
              v-model="middleName"
              placeholder="Enter middle name"
            />
            <BaseTextInput 
              label="Last Name"
              v-model="lastName"
              placeholder="Enter last name"
            />
          </div>
          <div class="second-row">
            <BaseTextInput 
              label="Email"
              v-model="email"
              type="email"
              placeholder="Enter email"
            />
            <BaseTextInput 
              label="Bio"
              v-model="bio"
              placeholder="Enter bio"
            />
            <BaseTextInput 
              label="Contact"
              v-model="contact"
              placeholder="Enter contact number"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'

const firstName = ref('Chraine Paul')
const middleName = ref('Tiger')
const lastName = ref('Tuazon')
const email = ref('cttuazon@up.edu.ph')
const bio = ref('College Dean')
const contact = ref('+09 987 645 32')
</script>

<style lang="scss" scoped>
.container {
  background: white;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  margin-top: 2.2rem;
  max-height: 46.7rem;
  border-radius: 25px;
}

.header {
  font-size: 0.8rem;
  width: 100%;
}

.card {
  background: #F7F6F6;
  border-radius: 8px;
  overflow: hidden;
  height: 40.5rem;
  margin-top: 3rem;
  margin-right: 5rem;
}

.card-header {
  background: #004225;
  color: white;
  padding: 1.5rem;

  h2 {
    font-size: 1.2rem;
    margin: 0;
  }
}

.user-card {
  background: white;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .user-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-info {
    flex-grow: 1;

    .name {
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0;
    }

    .role, .college {
      color: #666;
      margin: 0.2rem 0;
    }
  }

  .button-container {
    display: flex;
    gap: 1rem;
  }
}

.folder {
  margin: 1rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 23rem;

  .folder-header {
    background: #004225;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 1.2rem;
      margin: 0;
    }
  }

  .folder-content {
    padding: 2rem;

    .first-row,
    .second-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      margin-bottom: 2rem;
    }
  }
}
</style>