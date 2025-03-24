<template>
  <div class="container">
    <h1 class="title">Account Settings</h1>
    <CardComponent title="My Profile" height="100%" width="100%" :header="true">
      <CardComponent width="100%" height="100%" class="user-card">
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
      </CardComponent>
      <CardComponent
        width="100%"
        height="100%"
        title="Personal Information"
        :header="true"
      >
        <div class="edit-container">
          <BaseFormButton variant="black" width="6rem" height="2rem">
            Edit
          </BaseFormButton>
        </div>
        <div class="info-grid">
          <div class="input-group">
            <label>First Name</label>
            <BaseTextInput
              id="firstName"
              v-model="firstName"
              variant="red"
              disabled
            />
          </div>
          <div class="input-group">
            <label>Middle Name</label>
            <BaseTextInput
              id="middleName"
              v-model="middleName"
              variant="red"
              disabled
            />
          </div>
          <div class="input-group">
            <label>Last Name</label>
            <BaseTextInput
              id="lastName"
              v-model="lastName"
              variant="red"
              disabled
            />
          </div>
          <div class="input-group">
            <label>Email</label>
            <BaseTextInput
              id="email"
              v-model="email"
              type="email"
              variant="red"
              disabled
            />
          </div>
          <div class="input-group">
            <label>Bio</label>
            <BaseTextInput
              id="bio"
              v-model="bio"
              variant="red"
              disabled
            />
          </div>
        </div>
      </CardComponent>
    </CardComponent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import CardComponent from '@/components/Global/CardComponent.vue'

const firstName = ref('Chraine Paul')
const middleName = ref('Tiger')
const lastName = ref('Tuazon')
const email = ref('cttuazon@up.edu.ph')
const bio = ref('College Dean')
const contact = ref('+09 987 645 32')
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
  background: #F7F6F6;
  padding: 1.5rem;
  display: flex;
  grid-template-columns: auto 1fr;
  align-items: flex-end;
  gap: 1.5rem;
  margin: 1rem;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .user-image {
    width: 100px;
    height: 100px;
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
    }

    .role,
    .college {
      font-size: 0.9rem;
      color: #666;
      margin: 2px 0;
    }
  }

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
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