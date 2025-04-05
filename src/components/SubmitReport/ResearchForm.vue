<template>
    <div class="info-container" v-if="infoVisible">
        <v-icon name="bi-book" scale="2" />
        <div class="info-text">
            hahahahahahas hsiachihac hiahsichaischas
        </div>      
    </div>
    <div class="form-container">
        <div class="form">
            <div class="form-group">
                <label>Title</label>
                <input type="text" placeholder="Title">
            </div>

            <div class="form-group">
                <label>Number of Months in Original Timeframe</label>
                <input type="text" placeholder="Months">
            </div>

            <div class="form-group">
                <label>Start Date</label>
                <BaseDateInput width="100%"/>
            </div>

            <div class="form-group">
                <label>End Date</label>
                <BaseDateInput width="100%"/>
            </div>

            <div class="form-group">
                <label>Names of Researcher/s</label>
                <input type="text" placeholder="Names">
            </div>
        </div>
        <button class="submit-btn">SUBMIT</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseDateInput from '@/components/Global/BaseDateInput.vue'

// Props
const props = defineProps({
  infoVisible: {
    type: Boolean,
    default: false
  }
})

// Form data
const title = ref('')
const months = ref('')
const startDate = ref(null)
const endDate = ref(null)
const researchers = ref('')

// Submit handler
function handleSubmit() {
  console.log('Submitted:', {
    title: title.value,
    months: months.value,
    startDate: startDate.value,
    endDate: endDate.value,
    researchers: researchers.value
  })
}
</script>

<style lang="scss" scoped>
    .form-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }
    .form {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        margin-top: 2rem;

        border-radius: 10px;
        background: #FCFCFC;
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.25) inset;
        padding: 1.5rem;
        padding-left: 2rem;
        padding-right: 2rem;
    }
    
    .form-group {
        margin-bottom: 30px;
        display: flex;
        flex-direction: column;
    }

    .form-group label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .submit-btn {
        width: 100%;
        background: $red;
        color: white;
        padding: 10px;
        font-weight: bold;
        border: none;
        border-radius: 5px;
        margin-top: auto;
        cursor: pointer;
        margin-top: 2rem;
    }

    .form-group input {
        padding: 8px;
        padding-left: 2.7rem;
        border: 0.15px solid $red;
        border-radius: 10px;
        outline: none;
        color: $red;
    }

    .form-group input::placeholder {
        color: $red;
        font-weight: 900;
    }

    .info-container {
        margin-top: 1rem;
        border: 2px solid rgba(251, 255, 0, 0.58);
        background: rgba(255, 238, 0, 0.12);
        padding: 1rem;
        color: rgba(0, 0, 0, 0.648);

        display: flex;
        align-items: center;
    }

    .info-text {
        margin-left: 1rem;
    }
</style>