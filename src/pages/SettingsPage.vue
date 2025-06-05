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
                    {{ User?.first_name }} {{ User?.middle_name }}
                    {{ User?.last_name }}
                  </p>
                  <p class="role">Faculty</p>
                  <p class="college">College of Science</p>
                </div>
              </div>
              <div class="button-container">
                <BaseFormButton variant="red">Delete Account</BaseFormButton>
                <BaseFormButton variant="green" @click.once="handleLogout">Log out</BaseFormButton>
              </div>
            </div>
          </CardComponent>

          <CardComponent width="100%" height="100%" title="Personal Information" :header="true">
            <div class="edit-container">
              <BaseFormButton variant="black" width="6rem" height="2rem" @click="isEditing = true" v-if="!isEditing">
                Edit
              </BaseFormButton>
              <BaseFormButton v-if="isEditing" variant="black" width="6rem" height="2rem" @click="submitForm">
                Save
              </BaseFormButton>
            </div>
            <div class="info-grid">
              <div class="input-group">
                <BaseTextInput
                  name="first_name"
                  placeholder="First Name"
                  id="firstName"
                  :model-value="User?.first_name"
                  variant="red"
                  :disabled="!isEditing"
                  @update:model-value="value => handleInputChange('first_name', value)"
                />
              </div>
              <div class="input-group">
                <BaseTextInput
                  name="middle_name"
                  placeholder="Middle Name"
                  id="middleName"
                  :model-value="User?.middle_name"
                  variant="red"
                  :disabled="!isEditing"
                  @update:model-value="value => handleInputChange('middle_name', value)"
                />
              </div>
              <div class="input-group">
                <BaseTextInput
                  name="last_name"
                  placeholder="Last Name"
                  id="lastName"
                  :model-value="User?.last_name"
                  variant="red"
                  :disabled="!isEditing"
                  @update:model-value="value => handleInputChange('last_name', value)"
                />
              </div>
              <div class="input-group">
                <BaseTextInput
                  name="email"
                  placeholder="Email"
                  id="email"
                  :model-value="User?.email"
                  type="email"
                  variant="red"
                  :disabled="!isEditing"
                  @update:model-value="value => handleInputChange('email', value)"
                />
              </div>
              <div class="input-group">
                <BaseTextInput
                  name="role"
                  placeholder="Role"
                  id="role"
                  :model-value="User?.role.name"
                  variant="red"
                  :disabled="true"
                  @update:model-value="value => handleInputChange('role', value)"
                />
              </div>
              <div class="input-group">
                <BaseTextInput
                  name="college"
                  placeholder="College"
                  id="college"
                  :model-value="User?.college?.name"
                  variant="red"
                  :disabled="true"
                  @update:model-value="value => handleInputChange('college', value)"
                />
              </div>
              <div class="input-group">
                <BaseTextInput
                  name="department"
                  placeholder="Department"
                  id="dept"
                  :model-value="User?.department?.name"
                  variant="red"
                  :disabled="true"
                  @update:model-value="value => handleInputChange('department', value)"
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
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import CardComponent from '@/components/Global/CardComponent.vue'
import { useRouter } from 'vue-router'
import { logout } from '@/services/AuthService'
import { useUserStore } from '@/stores/UserStore'
import { User } from '@/types/CommonInterface'

const router = useRouter()

const editedProfile = ref<Partial<User>>({})

const isEditing = ref(false)

const userStore = useUserStore()

const User = ref<User | null>(userStore.getUserProfile ? { ...(userStore.getUserProfile as User) } : null)
onMounted(async () => {
  if (!userStore.profile) {
    await userStore.fetchUserProfile()
  }

  User.value = userStore.getUserProfile
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

const handleInputChange = (field: keyof User, value: any) => {
  const originalValue = User.value?.[field]

  if (originalValue !== value) {
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
    console.log(editedProfile.value)
    // await userStore.updateUser(editedProfile.value)
    User.value = userStore.getUserProfile
    console.log('Updated user profile in store:', userStore.profile)
    editedProfile.value = {}
    isEditing.value = false
    // alert('Profile updated successfully')
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}
</script>

<style lang="scss" scoped>
.settings-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 25px;
  // box-sizing: border-box;
  background: transparent;
  width: 100%;
  height: 100%;
}

.title {
  margin-left: 1rem;
  margin: 0.2rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.inner-cont {
  display: flex;
  gap: 1rem;
  height: 100%;
}

.header {
  width: 100%;
  font-size: 0.8rem;
}

.card-header {
  border-radius: 25px;
  background: #004225;
  padding: 1.5rem;
  color: white;

  h2 {
    margin: 0;
    font-size: 1.2rem;
  }
}

.user-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  // margin-bottom: 1.2rem;
}

.user {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'user-profile button';
  margin: 0.5rem;
  background: transparent;
  padding: 0.5rem;
  // justify-content: space-between;

  .user-profile {
    display: flex;
    grid-area: user-profile;
    align-items: center;
    gap: 1rem;
    padding-left: 0.5rem;
  }

  .user-image {
    border-radius: 50%;
    width: 10rem;
    height: 10rem;
    object-fit: cover;
  }

  .user-info {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    .name {
      margin: 0;
      padding-left: 3rem;
      font-weight: bold;
      font-size: 2rem;
    }

    .role,
    .college {
      margin: 2px 0;
      padding-left: 3rem;
      color: #666;
      font-size: 0.9rem;
    }
  }

  .button-container {
    display: flex;
    grid-area: button;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    justify-self: end;
    gap: 2rem;
    width: 9rem;
  }
}

.edit-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
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
      color: #444;
      font-weight: 500;
      font-size: 0.9rem;
    }
  }
}
</style>
