<template>
  <div class="registration-container">
    <div class="registration-modal">
      <header class="registration-header">
        <!-- <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a9e4e2d3601b6a2e449ba033449a9a393f64134d26a03425103d950035f25c2?apiKey=b97adb845ad745fdabf283f95e3c166e&" alt="Logo" class="registration-logo" /> -->
      </header>
      <div class="registration-content">
        <h2 class="registration-title">Before you proceed...</h2>
        <p class="registration-subtitle">We need a few more info from you.</p>
        <form @submit.prevent="handleSubmit" class="registration-form">
          <div class="registration-form-row">
            <div class="registration-form-group">
              <label for="birthdate" class="registration-label">Birthdate:</label>
              <input
                type="text"
                id="birthdate"
                v-model="birthdate"
                placeholder="dd/mm/yyyy"
                class="registration-input"
              />
            </div>
            <fieldset class="registration-fieldset">
              <legend class="registration-label">Sex:</legend>
              <div class="registration-radio-group">
                <input
                  type="radio"
                  id="male"
                  v-model="sex"
                  value="male"
                  class="registration-radio-input"
                />
                <label for="male" class="registration-radio-label">Male</label>
              </div>
              <div class="registration-radio-group">
                <input
                  type="radio"
                  id="female"
                  v-model="sex"
                  value="female"
                  class="registration-radio-input"
                />
                <label for="female" class="registration-radio-label">Female</label>
              </div>
            </fieldset>
          </div>
          <div class="registration-form-group">
            <label for="password" class="registration-label">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="registration-input"
            />
          </div>
          <div class="registration-form-group">
            <label for="confirmPassword" class="registration-label">Re-enter password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              class="registration-input"
            />
          </div>
          <p class="registration-info-text">
            Please fill up the required fields and click proceed to continue.
          </p>
          <div class="registration-button-container">
            <button
              type="button"
              @click="handleCancel"
              class="registration-button registration-button-cancel"
            >
              CANCEL
            </button>
            <button
              type="submit"
              class="registration-button registration-button-proceed"
            >
              PROCEED
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistrationModal',
  data() {
    return {
      birthdate: '',
      sex: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    handleSubmit() {
      // Handle form submission
    },
    handleCancel() {
      // Handle cancel action
    },
  },
};
</script>

<style scoped>
.registration-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto -5px;
  padding: 40px;
}

.registration-modal {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
}

.registration-header {
  background-color: #166534;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.registration-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.registration-content {
  padding: 24px;
}

.registration-title {
  color: #111827;
  margin-bottom: 8px;
  font: 600 24px "Inter", sans-serif;
}

.registration-subtitle {
  color: #6b7280;
  margin-bottom: 24px;
  font: 14px "Inter", sans-serif;
}

.registration-form-row {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
}

.registration-form-group {
  flex: 1;
  margin-bottom: 16px;
}

.registration-label {
  color: #6b7280;
  margin-bottom: 8px;
  font: 14px "Inter", sans-serif;
  display: block;
}

.registration-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  color: #111827;
  font: 14px "Inter", sans-serif;
}

.registration-fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.registration-radio-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.registration-radio-input {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: #166534;
}

.registration-radio-label {
  color: #374151;
  font: 14px "Inter", sans-serif;
}

.registration-info-text {
  color: #6b7280;
  margin-top: 16px;
  font: 12px "Inter", sans-serif;
}

.registration-button-container {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.registration-button {
  padding: 10px 24px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;
  font: 500 14px "Inter", sans-serif;
}

.registration-button-cancel {
  background-color: #1f2937;
  color: #ffffff;
}

.registration-button-proceed {
  background-color: #991b1b;
  color: #ffffff;
}

@media (max-width: 991px) {
  .registration-container {
    padding: 24px;
  }

  .registration-modal {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .registration-container {
    padding: 16px;
  }

  .registration-content {
    padding: 16px;
  }

  .registration-form-row {
    flex-direction: column;
    gap: 16px;
  }

  .registration-button-container {
    flex-direction: column;
  }

  .registration-button {
    width: 100%;
  }
}
</style>
