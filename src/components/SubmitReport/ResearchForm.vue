<template>
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

                <button class="submit-btn">SUBMIT</button>
            </div>
</template>

<script>
    import BaseDateInput from "@/components/Global/BaseDateInput.vue";

    export default {
        components: {
            BaseDateInput
        }
    }
</script>

<style lang="scss" scoped>
    .form {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        color: $red;
    }
    
    .form-group {
        margin-top: 30px;
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


</style>