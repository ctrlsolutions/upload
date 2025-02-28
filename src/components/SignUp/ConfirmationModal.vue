<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="header">
        <img src="@/assets/up-logo.png" alt="uplogo" class="image-logo" />
      </div>

      <div class="modal-content">
        <h2 class="title">One Last Thing...</h2>
        <h5 class="subtitle">Please make sure all the details are correct.</h5>

        <div class="info-grid">
          <div class="info-header transparent">First Name</div>
          <div class="info-header transparent">Middle Name</div>
          <div class="info-header transparent">Last Name</div>

          <div class="info-data">{{ formData.firstName }}</div>
          <div class="info-data">{{ formData.middleName }}</div>
          <div class="info-data">{{ formData.lastName }}</div>

          <div class="info-header transparent">Sex</div>
          <div class="info-header transparent">Date of Birth</div>
          <div class="info-header transparent"></div>

          <div class="info-data">{{ formData.sex }}</div>
          <div class="info-data">{{ formData.dob }}</div>
          <div class="info-data"></div>

          <div class="info-header transparent">Email</div>
          <div class="info-header transparent">Password</div>
          <div class="info-header transparent"></div>

          <div class="info-data">{{ formData.email }}</div>
          <div class="info-data">{{ formData.password }}</div>
          <div class="info-data"></div>
        </div>

        <div class="modal-buttons">
          <FormButton variant="black" @click="$emit('close')">
            No, I need to change something.
          </FormButton>
          <FormButton variant="red" @click="confirm">
            Yes, these are all correct.
          </FormButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FormButton from "@/components/Global/BaseFormButton.vue";

const props = defineProps({
  formData: Object,
});

const confirm = () => {
  console.log("User confirmed details:", props.formData);
  alert("Information confirmed!");
};
</script>

<style scoped lang="scss">
.header {
  background: linear-gradient(90deg, #008000, #014421, #036A34, #036934, #058E46);
  height: 3.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
  position: relative;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  overflow: hidden;
}

.image-logo {
  width: 25%;
  margin-right: 1rem;
  overflow: hidden;
}

.modal-overlay {
  font-family: "Inter", sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background: white;
  border-radius: 1.1rem;
  width: 40rem;
  height: 32rem;
  text-align: center;
}

.modal-content {
  margin-top: 0.8rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  text-align: left;
}

.title {
  text-align: start;
  color: black;
  font-weight: bold;
  font-size: 2.25rem;
}

.subtitle {
  font-size: 1rem;
  color: #555;
  padding-left: 0.25rem;
  margin-bottom: 1rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  text-align: start;
  margin-top: 1rem;
}

.info-header {
  font-size: 1.25rem;
  font-weight: bold;
  color: maroon;
  background: #f5f5f5;
  padding-top: 1rem;
  padding-left: 0.25rem;
  border-radius: 0.5rem;
}

.info-header.transparent {
  background: transparent;
}

.info-data {
  font-size: 1rem;
  color: black;
  padding-top: 0.25rem;
  padding-left: 0.25rem;
  border-radius: 0.5rem;
}

.modal-buttons {
  display: flex;
  padding-top: 4rem;
  justify-content: center;
  gap: 2rem;
}








/* Responsive Design */

/* LG: 1440px and below */
@media (max-width: 1440px) {
  .modal-container {
    width: 40rem;
  }
}

/* MD: 1024px and below */
@media (max-width: 1024px) {
  .modal-container {
    width: 38rem;
    height: 30rem;
  }

  .title {
    text-align: start;
    font-size: 2rem;   
  }

  .subtitle {
    font-size: .75rem;
    padding-left: 0.2rem;
    margin-bottom: 1rem;
  }

  .info-header {
    font-size: 1rem;
    padding-top: 1rem;
    padding-left: 0.25rem;
    border-radius: 0.5rem;
  }

  .info-data {
    font-size: 1rem;
    padding-top: 0.25rem;
    padding-left: 0.25rem;
    border-radius: 0.5rem;
  }

  .modal-buttons {
    padding: 4rem 0rem 0rem 16rem;
    width: 8rem;
  }

}

/* SM: 768px and below */
@media (max-width: 768px) {
  .modal-container {
    width: 32rem;
    height: 28rem;
  }

  .modal-content {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .title {
    font-size: 1.5rem;
    padding: .25rem 0rem 0rem 1rem;
  }

  .subtitle {
    font-size: 0.75rem;
    padding: 0rem 0rem 0rem 1rem;
  }


  .info-header {
    font-size: .9rem;
    padding-top: 1rem;
    padding-left: 1rem;
  }

  .info-data {
    font-size: .9rem;
    padding-top: 0.25rem;
    padding-left: 1rem;
  }

  .modal-buttons {
    padding: 3rem 0rem 0rem 15rem;
  }


}

/* XS: 425px and below */
@media (max-width: 425px) {
  .modal-container {
    width: 22rem;
    height: 18rem;
  }

  .title {
    font-size: .8rem;
  }

  .subtitle {
    font-size: 0.5rem;
  }

  .modal-buttons {
    gap: 1rem;
  }

  .info-header {
    font-size: .6rem;
    padding-top: .25rem;
    padding-left: 1rem;
  }

  .info-data {
    font-size: .6rem;
    padding-top: 0.25rem;
    padding-left: 1rem;
  }

  .modal-buttons {
    padding: .5rem 0rem 0rem 10rem;
  }



}


</style>
