<template>
  <!-- USE CARD WITH HEADER: WHOLE CONTAINER -->
  <div class="container">
    <h1 class="title">Account Settings</h1>
    <CardComponent title="My Profile" height="100%" width="100%" :header="true">
      <!-- USE NORMAL CARD: USER INFO -->
      <CardComponent width="90%" height="20%" class="user-card">
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
      <!-- USE FOLDER COMPONENT -->
      <CardComponent
        width="100%"
        height="100%"
        title="Personal Information"
        :header="true"
      >
        <div class="edit-container">
          <BaseFormButton variant="black" width="6rem" height="1rem">
            Edit
          </BaseFormButton>
        </div>
        <div class="grid-container">
          <div class="input-group">
            <label for="firstName">First Name</label>
            <BaseTextInput
              id="firstName"
              v-model="firstName"
              class="input-box"
              disabled
            />
          </div>
          <div class="input-group">
            <label for="middleName">Middle Name</label>
            <BaseTextInput
              id="middleName"
              v-model="middleName"
              class="input-box"
              disabled
            />
          </div>
          <div class="input-group">
            <label for="lastName">Last Name</label>
            <BaseTextInput
              id="lastName"
              v-model="lastName"
              class="input-box"
              disabled
            />
          </div>
          <div class="input-group">
            <label for="email">Email</label>
            <BaseTextInput
              id="email"
              v-model="email"
              type="email"
              class="input-box"
              disabled
            />
          </div>
          <div class="input-group">
            <label for="bio">Bio</label>
            <BaseTextInput id="bio" v-model="bio" class="input-box" disabled />
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
  background: rgb(172, 158, 158);
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
  background: white;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.5rem;
  margin: 1rem;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .user-image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

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

    .delete-button {
      background: #800000;
      color: white;
      border: none;
      border-radius: 20px;
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #a00000;
      }
    }

    .logout-button {
      background: #004225;
      color: white;
      border: none;
      border-radius: 20px;
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #006837;
      }
    }
  }
}

.folder {
  margin: 1rem;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-bottom: 1.5rem;

  .folder-header {
    background: #004225;
    color: white;
    padding: 1.2rem 1.5rem;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    h2 {
      font-size: 1.2rem;
      margin: 0;
    }
  }

  .folder-content {
    padding: 2rem;
    height: 22.3rem;

    .edit-container {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 0.3rem;

      .edit-button {
        background: black;
        color: white;
        border: none;
        border-radius: 20px;
        padding: 0.5rem 1.5rem;
        font-size: 0.9rem;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
          background: #333;
        }
      }
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;

      label {
        font-size: 0.9rem;
        font-weight: 500;
        color: #444;
        margin-bottom: 0.2rem;
      }

      .input-box {
        border: 1.5px solid #8b0000;
        padding: 0.8rem;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: bold;
      }
    }
  }
}
</style>
