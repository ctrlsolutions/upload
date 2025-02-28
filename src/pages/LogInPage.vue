<template>
  <form class="login-container" v-on:submit.prevent="loginUser">
    <div class="login-header">
      <h1>Log in</h1>
    </div>
    <p>Welcome! Log in to access your dashboard.</p>
    <div class="input-group">
      <BaseTextInput :value="userData.email" @input="updateEmail" id="email" type="email" placeholder="Email" variant="green" width="100%" height="3.5rem"/>
      <BaseTextInput :value="userData.password" @input="updatePassword" id="password" type="password" placeholder="Password" v-model="password" variant="green" width="100%" height="3.5rem"/>
    </div>
    <div class="forgot-password">
      <a href="#" class="forgotp">Forgot Password?</a>
    </div>
    <div class="login-button">
      <BaseFormButton variant="green" width="100%" :click="loginUser">LOG IN</BaseFormButton>
    </div>
    <div class="or-text">
      <p>OR</p>
    </div>
    <div class="cont-google">
      <BaseFormButton variant="red" width="100%"><v-icon name="fc-google" scale="1.2"></v-icon><span class="google">CONTINUE WITH GOOGLE</span></BaseFormButton>
    </div>
  </form>
</template>

<script setup>
import BaseTextInput from "@/components/Global/BaseTextInput.vue";
import BaseFormButton from "@/components/Global/BaseFormButton.vue";
import { ref } from "vue";
import axios from 'axios';

const userData = ref({
  email: "",
  password: "",
});

const updateEmail = (e) => {
  userData.value.email = e.target.value;
};
const updatePassword = (e) => {
  userData.value.password = e.target.value;
};

const loginUser = async () => {
  console.log(userData.value.email);
  console.log(userData.value.password);

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/user/login/', userData.value,);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

  
</script>

<style lang="scss" scoped>
.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 25rem;
  margin: auto;
  padding: 2rem;
  background-color: transparent;

  @include sm {
    width: 12rem;
    padding: 1rem;
  }

  @include md {
    width: 15rem;
    padding: 1.5rem;

  }

  @include lg {
    width: 25rem;
    padding: 2rem;
  }
}

.login-header {
  text-align: center;
  font-size: 2rem;
  font-weight: 800;

  @include sm {
    font-size: 1.5rem;
  }

  @include md {
    font-size: 1.75rem;
  }

  @include lg {
    font-size: 2rem;
  }

  h1 {
    font-weight: 800;
  }
}

.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
  margin-bottom: 2rem;

  @include sm {
    gap: 1rem;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  @include md {
    gap: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  @include lg {
    gap: 2rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
}

.login-button {
  width: 100%;
}

.or-text {
  margin-bottom: 1rem;

  @include sm {
    margin-bottom: 0.5rem;
    font-size: 0.9em;
  }

  @include md {
    margin-bottom: 0.75rem;
    font-size: 1em;
  }

  @include lg {
    margin-bottom: 1rem;
    font-size: 1em;
  }
}

.forgot-password {
  width: 100%;     
  text-align: right;   
  margin-top: -0.5rem; 
  padding-right: 1rem;
  margin-bottom: 1.5rem;

  @include sm {
    padding-right: 0.5rem;
    margin-bottom: 1rem;
  }

  @include md {
    padding-right: 0.75rem;
    margin-bottom: 1.25rem;
  }

  @include lg {
    padding-right: 1rem;
    margin-bottom: 1.5rem;
  }
}

.forgotp {
    color: $green;
    text-decoration: none;
    font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }

  @include sm {
    font-size: 0.8rem;
  }

  @include md {
    font-size: 0.85rem;
  }

  @include lg {
    font-size: 0.9rem;
  }
}

.cont-google {
  width: 100%;
}

.google {
  padding-left: 1.3rem;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  align-items: flex-end;

  @include sm {
    padding-left: 0.8rem;
    font-size: 0.8em;
  }

  @include md {
    padding-left: 1rem;
    font-size: 0.9em;
  }

  @include lg {
    padding-left: 1.3rem;
    font-size: 1em;
  }
}
</style>