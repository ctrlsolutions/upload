<template>
    <div class="container">
        <div class="folder-container">
            <!-- Header -->
            <div class="folder-tab">
                <div class="title-container">
                    Submit Report
                </div>
            </div>

            <!-- Report Type Selector -->
            <div class="folder-head">
                <BaseSelectInput
                    width="90%"
                    v-model="reportType"
                    :options="[
                        { value: 'research', label: 'Research' },
                        { value: 'publication', label: 'Publication as a Research Output' },
                        { value: 'paper_presentation', label: 'Paper Presentation as a Research Output' },
                        { value: 'patent', label: 'Patent as a Research Output' },
                        { value: 'other_research', label: 'Other Research Output' },
                        { value: 'training', label: 'Training Course and/or Advisory Service' },
                        { value: 'extension', label: 'Extension Program' },
                        { value: 'partnership', label: 'Partnership with Stakeholder' },
                        { value: 'other', label: 'Other' }
                    ]"
                />    
                <v-icon name="hi-information-circle" class="info-icon" scale="1.2" @click="toggleInfo"/>
            </div>

            <div class="info-container" v-if="infoVisible"> 
                <v-icon name="bi-book" scale="2" />
                <div class="info-text">
                    {{ formInformation[reportType] }}
                </div>
            </div>
            
            <!-- Report Form -->
            <div class="form-container">
                <component :is="formComponents[reportType]" ref="formComponent" />
            </div>

            <button class="submit-btn" @click="formComponent.submitForm()">SUBMIT</button>

        </div>

        <!-- Supporting Evidence/s -->
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
import ResearchForm from "@/components/SubmitReport/Forms/ResearchForm.vue";
import PublicationForm from "@/components/SubmitReport/Forms/PublicationForm.vue";
import Other from "@/components/SubmitReport/Forms/OtherForm.vue";

const reportType = ref('research');
const formComponent = ref(null);
const formComponents = { 
    research: ResearchForm,
    publication: PublicationForm,
    other: Other,
    
};
const formInformation = {
    research: "Project/program/work must be part of the approved Research/Creative Work agenda and endorsed by the Dean/Head of Unit and/or approved by the Chancellor/Authorized Official. Exclude student theses and dissertations.Researcher/s here refer to full-time faculty members, REPS and staff, whether with permanent, temporary or contractual appointment, who are in service still during the coverage years in review. Exclude from this data collection those projects/works led by lecturers or non-regular part-time staff.",
    publication: "Publications may be produced in print, online or in digital on non-print media.",
    paper_presentation: "The same paper may be presented at different conference events.",
    patent: "Please include only the inventions, utility models and industrial designs owned by the University of the Philippines.",
    other_research: "Include research or creative work outputs that could not be categorized as peer-reviewed publication, academic conference paper presentation or patenting. The output must be exposed in a public event such as exhibitions, public performances, or publication, i.e., when the output was first shown in a public place or released to the public.",
    training: "Training Course/Advisory Service must be part of the approved Extension Work Agenda.",
    extension: "Extension Program must be part of the approved Extension Work Agenda.",
    partnership: "The partner stakeholder must be another agency, organization, private company, media or any institution recognized by UP as a partner by means of a MOA, MOU or a partnership agreement. Extension Activity must be part of the approved Extension Work Agenda.",
    other: "Other Form",
}

const infoVisible = ref(false);
const toggleInfo = () => {
    infoVisible.value = !infoVisible.value;
    console.log(infoVisible.value);
}

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

.info-container {
    margin-top: 1rem;
    border: 3px solid rgba(152, 155, 0, 0.58);
    background: rgba(255, 238, 0, 0.12);
    padding: 1rem;
    color: rgba(0, 0, 0, 0.648);

    display: flex;
    align-items: center;
}
.info-text {
    margin-left: 1rem;
}
.info-icon {
  height: 2rem;
  margin-left: 1rem;

}

.folder-head {
    display: flex;
}

.form-container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin-bottom: 2rem;
}
    
.submit-btn {
    width: 100%;
    background: $red;
    color: white;
    padding: 10px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: auto;
}

:deep(.form) {
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

:deep(.form-group) {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
}

:deep(.form-group label) {
    font-weight: bold;
    margin-bottom: 5px;
}

:deep(.form-group input) {
    padding: 8px;
    padding-left: 2.7rem;
    border: 0.15px solid $red;
    border-radius: 10px;
    outline: none;
    color: $red;
    margin-top: 10px;
}

:deep(.form-group input::placeholder) {
    color: $red;
    font-weight: 900;
}

:deep(.error) {
    color: red;
    font-size: 0.8rem;
}
</style>