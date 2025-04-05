<template>
    <div class="container">
        <div class="folder-container">
            <div class="folder-tab">
                <div class="title-container">
                    Submit Report
                </div>
            </div>

            <BaseSelectInput
                width="100%"
                v-model="reportType"
                :options="[
                    { value: 'research', label: 'Research' },
                    { value: 'publication', label: 'Publication' }
                ]"
            />

            <component :is="selectedComponent" />

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
import { ref, computed } from "vue";

import BaseSelectInput from "@/components/Global/BaseSelectInput.vue";
import research from "@/components/SubmitReport/ResearchForm.vue";
import publication from "@/components/SubmitReport/PublicationForm.vue";

const reportType = ref('research');
const components = {
  research,
  publication
};

const selectedComponent = computed(() => components[reportType.value]);


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

.title-container {
    font-weight: bold;
    font-size: 1.2rem;
    color: $green;
}
</style>
