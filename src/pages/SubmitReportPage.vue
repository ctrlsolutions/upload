<template>
    <div class="container">
        <div class="folder-container">
            <div class="folder-tab">
                <div class="dropdown-container">
                    <select class="dropdown">
                        <option value="submit">Submit Report</option>
                        <option value="submit">dev: placeholder</option> <!-- plavce holder onley -->
                    </select>
                </div>
            </div>
            
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
            
        </div>
        <div class="file-drop-area-container">
            <div class="drop-area-head">Supporting Evidence/s</div>
            <div class="drop-area-desc">PDF Image File: Research Proposal, Research Contract or Application for Load Credits containing description, duration, and funding information and properly endorsed by the Dean/Head of Unit and/or approved by Authorized Officials.</div>
            <div class="drop-area">
                <div style="opacity: 0.5">DRAG FILE HERE</div>
                <div style="opacity: 0.5">or</div>
                <button class="choose-file-button">Choose File</button>
            </div>
            <button class="file-upload-button"> 
                <img src="../assets/oble_icon.png" alt="" style="margin-right: auto; margin-bottom: 0;"> 
                <span style="margin: 0 auto;">UPLOAD </span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import BaseDateInput from "@/components/Global/BaseDateInput.vue";


</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    align-items: end;
    padding: 2vw;
}

.folder-container {
    flex-shrink: 0;
    background: white;
    width: 650px;
    height: 87vh;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    padding: 2rem;

    display: flex;
    flex-direction: column;
}

.folder-tab {
    position: absolute;
    top: -7vh;
    left: 0%;
    background: url(@/assets/tab.png) no-repeat left center;
    background-size: 100% 80%;
    font-weight: bold;
    color: darkgreen;  
    height: 12vh;
    width: 45%;
    padding-left: 5%;    
    padding-top: 4%;
}

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

input {
    height: 2.4rem;
    font-family: 'Inter', sans-serif;
    font-weight: 900;
}

input::placeholder {
    color: $red;
    padding-left: 2.7rem;
}
.form-group input {
    padding: 8px;
    border: 0.15px solid $red;
    border-radius: 10px;
    outline: none;
    color: $red;
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

.file-drop-area-container {
    height: 87vh;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    margin-left: 2vw;
    margin-right: 2vw;
    flex-grow: 1;

    display: flex;
    flex-direction: column;


}

.drop-area-head {
    color: $red;
}

.drop-area {
    width: 100%;
    border: 1px dashed $green;
    color: $green;
    border-radius: 10px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: medium;
    font-weight: 900;
    align-self: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    flex-grow: 1;
}

.drop-area-desc {
    width: 100%;
    font-size: smaller;
    margin-top: 5px;
}

.choose-file-button {
    background-color: $red;
    color: white;
    font-weight: bolder;
    padding: 8px;
    padding-left: 12px;
    padding-right: 12px;
    border: none;
    border-radius: 5px;

}

.file-upload-button {
    margin-top: auto;
    width: 80%;
    height: 40px;
    background-color: $red;
    color: white;
    border: none;
    border-radius: 10px;
    align-self: center;
    
}


.dropdown-container {
    display: inline-block;
    position: relative;
    font-family: Arial, sans-serif;
}

.dropdown {
    appearance: none;
    background: none;
    border: none;
    font-size: 18px;
    font-weight: bold;
    color: $green; /* Dark green */
    text-transform: uppercase;
    cursor: pointer;
    padding-right: 20px;
}

.dropdown-container::after {
    content: "▼";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: $green; /* Dark green */
    pointer-events: none;
}

</style>