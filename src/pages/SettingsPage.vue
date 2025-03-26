<template>
  <div class="container">
    <h1 class="title">Account Settings</h1>
    <CardComponent title="My Profile" height="100%" width="100%" :header="true">
      <CardComponent width="99.36%" height="100%" class="user-card">
        <div class="user-profile">
          <img
            src="https://i.pinimg.com/736x/93/dd/a6/93dda651f941477847f7f74835f67288.jpg"
            alt="User profile"
            class="user-image"
          />
          <div class="user-info">
            <p class="name">
              {{
                userProfile.first_name +
                ' ' +
                userProfile.middle_name +
                ' ' +
                userProfile.last_name
              }}
            </p>
            <p class="role">{{ userProfile.role }}</p>
            <p class="college">College of Science</p>
          </div>
        </div>
        <div class="button-container">
          <BaseFormButton variant="red">Delete Account</BaseFormButton>
          <BaseFormButton variant="green">Log out</BaseFormButton>
        </div>
      </CardComponent>
      <CardComponent
        width="100%"
        height="100%"
        title="Personal Information"
        :header="true"
      >
        <div class="edit-container">
          <BaseFormButton
            variant="black"
            width="6rem"
            height="2rem"
            @click="isEditing = true"
            v-if="!isEditing"
          >
            Edit
          </BaseFormButton>
          <BaseFormButton
            v-if="isEditing"
            variant="black"
            width="6rem"
            height="2rem"
            @click="submitForm">
            Save
          </BaseFormButton>
        </div>
        <div class="info-grid">
          <div class="input-group">
            <label>First Name</label>
            <BaseTextInput
              id="firstName"
              :value="userProfile.first_name"
              variant="red"
              :disabled="!isEditing"
            />
          </div>
          <div class="input-group">
            <label>Middle Name</label>
            <BaseTextInput
              id="middleName"
              v-model="userProfile.middle_name"
              variant="red"
              :disabled="!isEditing"
            />
          </div>
          <div class="input-group">
            <label>Last Name</label>
            <BaseTextInput
              id="lastName"
              v-model="userProfile.last_name"
              variant="red"
              :disabled="!isEditing"
            />
          </div>
          <div class="input-group">
            <label>Email</label>
            <BaseTextInput
              id="email"
              v-model="userProfile.email"
              type="email"
              variant="red"
              :disabled="!isEditing"
            />
          </div>
          <div class="input-group">
            <label>Bio</label>
            <BaseTextInput
              id="bio"
              v-model="userProfile.role"
              variant="red"
              :disabled="!isEditing"
            />
          </div>
        </div>
      </CardComponent>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import CardComponent from '@/components/Global/CardComponent.vue'
import { getDashboardData } from '@/services/DashboardService'

interface UserProfile {
  first_name: string
  middle_name: string
  last_name: string
  email: string
  role: string
}

const userProfile = ref<UserProfile>({
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  role: '',
})
const isEditing = ref(false)
onMounted(async () => {
  try {
    const data = await getDashboardData()
    if (data && data.user) {
      userProfile.value = data.user
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
})

// Submit updated user data
const submitForm = async () => {
  try {
    await axios.put('/api/user/edit_profile', userProfile.value, {
      withCredentials: true,
    })
    isEditing.value = false
    alert('Profile updated successfully')
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  background: white;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
}

.header {
  font-size: 0.8rem;
  width: 100%;
}

.card-header {
  background: #004225;
  color: white;
  padding: 1.5rem;
  border-radius: 25px;

  h2 {
    font-size: 1.2rem;
    margin: 0;
  }
}

.user-card {
  background: #f7f6f6;
  padding: 1.5rem;
  display: flex;
  grid-template-columns: auto 1fr 1fr;
  align-items: flex-end;
  gap: 1.5rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  // justify-content: space-between;

  .user-profile {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: 0.5rem;
  }

  .user-image {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    flex-grow: 1;

    .name {
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0;
      padding-left: 3rem;
    }

    .role,
    .college {
      font-size: 0.9rem;
      color: #666;
      margin: 2px 0;
      padding-left: 3rem;
    }
  }

  .button-container {
  display: flex;
  flex-direction: column !important;
  gap: 5rem;
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  }
}

.edit-container {
  display: flex;
  justify-content: flex-end;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.9rem;
      font-weight: 500;
      color: #444;
    }
  }
}
</style>
