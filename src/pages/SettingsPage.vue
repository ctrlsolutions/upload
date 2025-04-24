<template>
  <div class="settings-container">
    <!-- <h1 class="title">Account Settings</h1> -->
    <div class="inner-cont">
      <CardComponent title="Account Settings" height="100%" width="100%" :header="true">
        <div class="user-card">
          <CardComponent width="100%" height="100%">
            <div class="user">
              <div class="user-profile">
                <img
                  src="https://i.pinimg.com/736x/93/dd/a6/93dda651f941477847f7f74835f67288.jpg"
                  alt="User profile"
                  class="user-image"
                />
                <div class="user-info">
                  <p class="name">
                    {{ userProfile.first_name }} {{ userProfile.middle_name }}
                    {{ userProfile.last_name }}
                  </p>
                  <p class="role">Faculty</p>
                  <p class="college">College of Science</p>
                </div>
              </div>
              <div class="button-container">
                <BaseFormButton variant="red">Delete Account</BaseFormButton>
                <BaseFormButton variant="green" @click.once="handleLogout"
                  >Log out</BaseFormButton
                >
              </div>
          </div>
        </CardComponent>
        
        <CardComponent width="100%" height="100%" title="Personal Information" :header="true">
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
              @click="submitForm"
            >
            Save
            </BaseFormButton>
          </div>
          <div class="info-grid">
            <div class="input-group">
              <BaseTextInput
                placeholder="First Name"
                id="firstName"
                :model-value="userProfile.first_name"
                variant="red"
                :disabled="!isEditing"
                @update:model-value="
                  value => handleInputChange('first_name', value)
                  "
              />
            </div>
            <div class="input-group">
              <BaseTextInput
                placeholder="Middle Name"
                id="middleName"
                :model-value="userProfile.middle_name"
                variant="red"
                :disabled="!isEditing"
                @update:model-value="
                  value => handleInputChange('middle_name', value)
                "
              />
            </div>
            <div class="input-group">
              <BaseTextInput
              placeholder="Last Name"
                id="lastName"
                :model-value="userProfile.last_name"
                variant="red"
                :disabled="!isEditing"
                @update:model-value="
                  value => handleInputChange('last_name', value)
                "
              />
            </div>
            <div class="input-group">
              <BaseTextInput
              placeholder="Email"
                id="email"
                :model-value="userProfile.email"
                type="email"
                variant="red"
                :disabled="!isEditing"
                @update:model-value="value => handleInputChange('email', value)"
                />
            </div>
            <div class="input-group">
              <BaseTextInput
                placeholder="Role"
                id="role"
                :model-value="userProfile.role"
                variant="red"
                :disabled="!isEditing"
                @update:model-value="value => handleInputChange('role', value)"
              />
            </div>
            <div class="input-group">
              <BaseTextInput
                placeholder="College"
                id="role"
                :model-value="userProfile.role"
                variant="red"
                :disabled="!isEditing"
                @update:model-value="value => handleInputChange('role', value)"
              />
            </div>
            <div class="input-group">
              <BaseTextInput
                placeholder="Department"
                id="role"
                :model-value="userProfile.role"
                variant="red"
                :disabled="!isEditing"
                @update:model-value="value => handleInputChange('role', value)"
              />
            </div>
          </div>
        </CardComponent>
      </div>
      </CardComponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import CardComponent from '@/components/Global/CardComponent.vue'
import { getProfileData, updateProfile } from '@/services/ProfileService'
import { useRouter } from 'vue-router'
import { logout } from '@/services/AuthService'

const router = useRouter()

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

const editedProfile = ref<Partial<UserProfile>>({})

const isEditing = ref(false)

onMounted(async () => {
  try {
    const username = sessionStorage.getItem('username')
    const response = await getProfileData(username)
    if (response && response.data.user) {
      userProfile.value = response.data.user
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
})

const handleLogout = async () => {
  try {
    await logout()
    sessionStorage.clear()
    router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const handleInputChange = (field: keyof UserProfile, value: string) => {
  if (userProfile.value[field] !== value) {
    editedProfile.value[field] = value
  } else {
    delete editedProfile.value[field]
  }
}

const submitForm = async () => {
  if (Object.keys(editedProfile.value).length === 0) {
    alert('No changes made.')
    return
  }

  try {
    await updateProfile(editedProfile.value)
    Object.assign(userProfile.value, editedProfile.value)
    editedProfile.value = {}
    isEditing.value = false
    alert('Profile updated successfully')
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}
</script>

<style lang="scss" scoped>
.settings-container {
  box-sizing: border-box;
  background: white;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  padding-left: 3rem;
  padding-right: 3rem;
  // padding-bottom: 2rem;
  justify-content: center;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 1rem;
  margin: 0.2rem;

}

.inner-cont {
  display: flex;
  height: 95%;
  gap: 1rem;
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
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  // margin-bottom: 1.2rem;
}

.user {
  background: transparent;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  margin: 0.5rem;
  grid-template-areas: 'user-profile button';
  // justify-content: space-between;

  .user-profile {
    grid-area: user-profile;
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
    grid-area: button;
    display: flex;
    flex-direction: column;
    width: 9rem;
    justify-items: center;
    gap: 2rem;
    justify-content: center;
    justify-self: end;
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
  margin-bottom: 0.7rem;
  margin-left: 2rem;

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;

    label {
      font-size: 0.9rem;
      font-weight: 500;
      color: #444;
    }
  }
}
</style>
