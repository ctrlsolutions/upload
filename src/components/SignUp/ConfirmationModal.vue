<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2 class="title">One Last Thing...</h2>
      <p class="subtitle">Please make sure all the details are correct.</p>
      
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
        <div class="info-heade  transparent"></div>
        
        <div class="info-data">{{ formData.email }}</div>
        <div class="info-data">{{ formData.password }}</div>
        <div class="info-data"></div>
      </div>

      <div class="modal-buttons">
        <FormButton variant="black" width="20rem" @click="$emit('close')">
          No, I need to change something.
        </FormButton>
        <FormButton variant="red" width="20rem" @click="confirm">
          Yes, these are all correct.
        </FormButton>
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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  height: auto;
  background: url('@/assets/modalBG.png') no-repeat center center;
  background-size: contain;
  display: flex;
  justify-content: center;
  
  align-items: center;
}

.modal-content {
  width: 50rem;

  padding-top: 6rem;
  padding-left: 4rem;
  padding-bottom: 4rem;
  padding-right: 4rem;

  text-align: start;
  border-radius: 2rem;
  overflow: hidden;
  box-sizing: border-box;
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
  padding-left: .25rem;
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
  padding-left: .25rem;
  border-radius: 0.5rem;
}

.info-header.transparent {
  background: transparent;
}

.info-data {
  font-size: 1rem;
  color: black;
  padding-top: .25rem;
  padding-left: .25rem;
  border-radius: 0.5rem;
}

.modal-buttons {
  display: flex;
  padding-top: 4rem;
  justify-content: center;
  gap: 2rem;
}



/* BREAKPOINTS*/

@media (max-width: 90rem) { /* L: 1440px (Reference Breakpoint) */
  .modal-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  height: 37rem;
  display: flex;
  justify-content: center;
  align-items: center;
  }

  .modal-content {
    width: 48rem;
    padding: 6rem 3rem 4rem;

    text-align: start;
    border-radius: 2rem;
    overflow: hidden;
    box-sizing: border-box;
  }

  .modal-buttons {
    display: flex;
    padding-top: 4rem;
    justify-content: flex-start;
    gap: 2rem;
    width: 16rem;
  }

  .modal-buttons FormButton {
    width: 16rem; /* Adjust as needed */
    height: 2rem; /* Adjust height */
    font-size: 1rem; /* Adjust text size */
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
    padding-left: .25rem;
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
    padding-left: .25rem;
    border-radius: 0.5rem;
    }

  .info-data {
    font-size: 1rem;
    color: black;
    padding-top: .25rem;
    padding-left: .25rem;
    border-radius: 0.5rem;
  }

}


@media (max-width: 64rem) { /* MD: 1024px */
  .modal-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38rem;
  height: 28rem;
  display: flex;
  justify-content: center;
  align-items: center;
  }

  .modal-content {
    width: 38rem;
    height: 28rem;
    padding: 4rem 2rem 2rem 2rem;

    text-align: start;
    border-radius: 2rem;
    overflow: hidden;
    box-sizing: border-box;
  }

  .modal-buttons {
    display: flex;
    padding: 2rem 8rem 0rem 0rem;
    justify-content: flex-start;
    gap: 2rem;
    width: 18rem;
    font-size: 1rem;
  }

  .modal-buttons FormButton {
    width: 20rem;
    height: 20rem; 
    font-size: 1rem; 
    
  }
  
  .title {
    text-align: start;
    color: black;
    font-weight: bold;
    font-size: 1.75rem;
    padding: 0rem 0rem 0rem 0rem;
  }

  .subtitle {
    font-size: .8rem;
    color: #555;
    padding-left: 0.10rem;
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
    font-size: 1rem;
    font-weight: bold;
    color: maroon;
    background: #f5f5f5;
    padding-top: 1rem;
    padding-left: 0.10rem;
    border-radius: 0.5rem;
    }

  .info-data {
    font-size: .75rem;
    color: black;
    padding-left: .10rem;
    border-radius: 0.5rem;
  }


}


@media (max-width: 48rem) { /* S: 768px */
  .modal-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30rem;
  height: 22rem;
  display: flex;
  justify-content: center;
  align-items: center;
  }

  .modal-content {
    width: 30rem;
    height: 22rem;
    padding: 4rem 2rem 2rem 2rem;

    text-align: start;
    border-radius: 2rem;
    overflow: hidden;
    box-sizing: border-box;
  }

  .modal-buttons {
    display: flex;
    padding: .25rem 8rem 0rem 0rem;
    justify-content: flex-start;
    gap: 2rem;
    width: 18rem;
    font-size: 1rem;
  }

  .modal-buttons FormButton {
    width: 10rem;
    height: 1rem; 
    font-size: .5rem; 
    
  }
  
  .title {
    text-align: start;
    color: black;
    font-weight: bold;
    font-size: 1.25rem;
    padding: 0rem 0rem 0rem 0rem;
  }

  .subtitle {
    font-size: .75rem;
    color: #555;
    padding-left: 0.10rem;
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
    font-size: .9rem;
    font-weight: bold;
    color: maroon;
    background: #f5f5f5;
    padding-top: .5rem;
    padding-left: 0.10rem;
    border-radius: 0.5rem;
    }

  .info-data {
    font-size: .75rem;
    color: black;
    padding-left: .10rem;
    border-radius: 0.5rem;
  }


}

@media (max-width: 26.5625rem) { /* XS: 425px */
  .modal-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  }

  .modal-content {
    width: 20rem;
    height: 15rem;
    padding: 2rem 2rem .5rem 1rem;

    text-align: start;
    border-radius: 2rem;
    overflow: hidden;
    box-sizing: border-box;
  }

  .modal-buttons {
    display: flex;
    padding: .25rem 8rem 0rem 0rem;
    justify-content: flex-start;
    gap: 2rem;
    width: 18rem;
    font-size: 1rem;
  }

  .modal-buttons FormButton {
    width: 10rem;
    height: 1rem; 
    font-size: .5rem; 
    
  }
  
  .title {
    text-align: start;
    color: black;
    font-weight: bold;
    font-size: .75rem;
    padding: .5rem 0rem 0rem 0rem;
  }

  .subtitle {
    font-size: .5rem;
    color: #555;
    padding-left: 0.10rem;
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
    font-size: .5rem;
    font-weight: bold;
    color: maroon;
    background: #f5f5f5;
    padding-top: .1rem;
    padding-left: 0.10rem;
    border-radius: 0.5rem;
    }

  .info-data {
    font-size: .4rem;
    color: black;
    padding-left: .10rem;
    border-radius: 0.5rem;
  }
}

@media (min-width: 90.0625rem) { /* XL: 1441px and up */
  .modal-overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  height: 37rem;
  display: flex;
  justify-content: center;
  align-items: center;
  }

  .modal-content {
    width: 48rem;
    padding: 6rem 3rem 4rem;

    text-align: start;
    border-radius: 2rem;
    overflow: hidden;
    box-sizing: border-box;
  }

  .modal-buttons {
    display: flex;
    padding-top: 4rem;
    justify-content: flex-start;
    gap: 2rem;
    width: 18rem;
  }

  .modal-buttons FormButton {
    width: 2rem; /* Adjust as needed */
    height: 2rem; /* Adjust height */
    font-size: 1rem; /* Adjust text size */
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
    padding-left: .25rem;
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
    padding-left: .25rem;
    border-radius: 0.5rem;
    }

  .info-data {
    font-size: 1rem;
    color: black;
    padding-top: .25rem;
    padding-left: .25rem;
    border-radius: 0.5rem;
  }

}

</style>
