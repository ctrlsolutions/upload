<template>
    <div class="container">
        <div class="folder-container">
            <!-- Header -->
            <div class="folder-tab">
                <div class="title-container">Submit Report</div>
            </div>

            <!-- Report Type Selector -->
            <div class="folder-head">
                <BaseSelectInput
                    width="90%"
                    v-model="reportType"
                    :options="[
                        { value: 'abstract', label: 'abstarct'},
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
                <v-icon name="hi-information-circle" class="info-icon" scale="1.2" @click="toggleInfo" />
            </div>

            <div class="info-container" v-if="infoVisible"> 
                <v-icon name="bi-book" scale="2" />
                <div class="info-text">
                    {{ formInformation[reportType] }}
                </div>
            </div>

            <!-- Report Form -->
            <div class="form-container">
                <component :is="AbstractForm" ref="formComponent" :fields = fields[reportType] />
            </div>

            <button class="submit-btn" @click="handleSubmit">SUBMIT</button>
        </div>

        <!-- Supporting Evidence/s -->
        <div class="file-drop-area-container">
            <div class="drop-area-head">Supporting Evidence/s</div>
            <div class="drop-area-desc">
                PDF Image File: Research Proposal, Research Contract or Application for Load Credits containing
                description, duration, and funding information and properly endorsed by the Dean/Head of Unit and/or
                approved by Authorized Officials.
            </div>

            <div
                class="drop-area"
                @dragover.prevent
                @drop.prevent="handleDrop"
            >
                <div v-if="selectedFiles.length" v-for="file in selectedFiles" :key="file.name">
                    <div class="file-icon-container">
                        <v-icon name="bi-file-earmark-medical" scale="3.5" />
                        <p class="file-name">{{ file.name }}</p>
                    </div>
                </div>
                <div class="drag-area-divs">DRAG FILES HERE</div>
                <!-- <div style="opacity: 0.5">or</div> -->
                <!-- <button class="choose-file-button" @click="triggerFileInput">Choose Files</button> -->
                <input
                type="file"
                ref="fileInput"
                multiple
                style="display: none"
                @change="handleFileChange"
                />
            </div>

            <button class="file-upload-button" @click="uploadFiles">
                <img src="../assets/oble_icon.png" alt="" style="margin-right: auto; margin-bottom: 0;" />
                <span style="margin: 0 auto;">UPLOAD</span>
            </button>
        </div>
    </div>
</template>
  
<script setup>
    import { ref } from "vue";
    import axios from "axios";

    import BaseSelectInput from "@/components/Global/BaseSelectInput.vue";
    import AbstractForm from "@/components/SubmitReport/Forms/AbstractForm.vue";

    const reportType = ref('research');
    const formComponent = ref(null);
    const infoVisible = ref(false);


    // models define the key of json POST
    const fields = {
        abstract: [
            { label: 'Title', model: 'title', component: 'text', placeholder: 'Title', isRequired: true }
        ],
        research: [
            { label: 'Title', model: 'title', component: 'text', placeholder: 'Title', isRequired: true },
            { 
                label: 'Number of Months in Original Timeframe', 
                model: 'timeframe', 
                component: 'number', 
                isRequired: true,
                placeholder: 'months'
            },
            { label: 'Start Date', model: 'start_date', component: 'date', isRequired: true },
            { label: 'End Date', model: 'end_date', component: 'date', isRequired: true },
            { 
                label: 'Names of Researchers', 
                model: 'names_of_researchers', 
                component: 'text', 
                isRequired: false,
                placeholder: 'Ex: Randall A. Alquicer, Brent Jordan Aguinalde, ...',
            
            },
            {
                label: 'Source of Majority of Funding', 
                model: 'source_of_funding', 
                component: 'select', 
                isRequired: false, 
                options:[
                    { value: 'haha', label: 'haha' },
                    { value: 'sda', label: 'sda' }
                ]},
        ], // [TODO]: name should be arrayed
        publication: [
            { label: 'Publication Title', model: 'title', component: 'text', placeholder: 'title', isRequired: true },
            { label: 'Type of Publication', model: 'publication_title', component: 'text', placeholder: 'title', isRequired: true },
            { label: 'Author/Co-Authors', model: 'publicatin_type', component: 'text', placeholder: 'Name', isRequired: true },
            { label: 'Published or Accepted for Publication', model: 'publication_date', component: 'date', isRequired: true },
            { 
                label: 'Name of Journal/Book/Conference Publication/Other Publication', 
                model: 'publisher_name',
                component: 'text',
                isRequired: true 
            },
            { label: 'Type of Publisher', model: 'publisher_type', component: 'select', isRequired: true },
            { label: 'Location of Publisher', model: 'publisher_location', component: 'select', options: [{value: 'local', label: 'Local'},{value: 'internationl', label: 'International'}], isRequired: true },
            { label: 'Volume Number', model: 'volume_number', component: 'text', isRequired: true },
            { label: 'Issue Number', model: 'issue_number', component: 'text', isRequired: true },
            { label: 'Editor Names', model: 'editor_names', component: 'text', isRequired: true },
            { label: 'DOI or URL', model: 'doi_or_url', component: 'text', isRequired: true },
            { label: 'ISBN or ISSN', model: 'isbn_or_issn', component: 'text', isRequired: true },   
            { label: 'Number of Citations', model: 'number_of_citations', component: 'number', isRequired: true },
        ],
        paper_presentation: [
            {
                label: 'Research Project/Program/Work Title',
                model: 'research_title',
                component: 'select',
                placeholder: 'Select Research Title',
                isRequired: true,
                options: [
                    { value: 'Project ISAAC: Isolation, Screening, and Antimicrobial Activity of Compounds from Actinobacteria in Mainit Hot Springs, Cebu, Philippines', label: 'Project ISAAC: Isolation, Screening, and Antimicrobial Activity of Compounds from Actinobacteria in Mainit Hot Springs, Cebu, Philippines' },
                    { value: 'An Edge-Based Model of SEIR Epidemics on Static Random Networks', label: 'An Edge-Based Model of SEIR Epidemics on Static Random Networks' },
                    { value: 'On dual B-filters and Dual B-subalgebras in a Topolological Dual B-algebra', label: 'On dual B-filters and Dual B-subalgebras in a Topolological Dual B-algebra' },
                    { value: 'Survey of Heatwaves in the Philippine Seas', label: 'Survey of Heatwaves in the Philippine Seas' },
                    { value: 'Relationship between pearl formation and associated biofouling organisms in the pearl oysters of the Arabian Gulf', label: 'Relationship between pearl formation and associated biofouling organisms in the pearl oysters of the Arabian Gulf' },
                    { value: 'Impacts of heatwaves and toxic algal blooms on the physiological performance and future aquaculture of the oysters Ostrea edulis and Magallana (Crassostrea) gigas', label: 'Impacts of heatwaves and toxic algal blooms on the physiological performance and future aquaculture of the oysters Ostrea edulis and Magallana (Crassostrea) gigas' },
                    { value: 'River Ecosystem Health Assessment using Biomonitoring Tools', label: 'River Ecosystem Health Assessment using Biomonitoring Tools' },
                    { value: 'Other', label: 'Other' },
                ]
            },
            { label: 'Title of Paper Presented', model: 'paper_title', component: 'text', placeholder: 'Title of Paper Presented', isRequired: true },
            {
                label: 'Type of Presentation',
                model: 'presentation_type',
                component: 'select',
                isRequired: true,
                options: [
                    { value: 'Oral Presentation', label: 'Oral Presentation' },
                    { value: 'Poster Presentation', label: 'Poster Presentation' },
                ]
            },
            { label: 'Title of Conference', model: 'conference_title', component: 'text', placeholder: 'Title of Conference', isRequired: true },
            { label: 'Name of Organizer', model: 'organizer_name', component: 'text', placeholder: 'Name of Organizer', isRequired: true },
            {
                label: 'Location of Conference',
                model: 'conference_location_type',
                component: 'select',
                isRequired: true,
                options: [
                    { value: 'Institutional/In-House', label: 'Institutional/In-House' },
                    { value: 'Local/Regional', label: 'Local/Regional' },
                    { value: 'National', label: 'National' },
                    { value: 'International', label: 'International' },
                ]
            },
            { label: 'Venue, City and Country', model: 'conference_venue', component: 'text', placeholder: 'Venue, City and Country', isRequired: true },
            { label: 'Conference Start Date', model: 'conference_start_date', component: 'date', isRequired: true },
            { label: 'Conference End Date', model: 'conference_end_date', component: 'date', isRequired: true },
            { label: 'Date of Presentation', model: 'presentation_date', component: 'date', isRequired: true },
        ],
        patent: [
            {
                label: 'Title of Patent',
                model: 'patent_title',
                component: 'select',
                placeholder: 'Select Patent Title',
                isRequired: true,
                options: [
                    // Options will be dynamically populated based on Research data
                    { value: 'Project ISAAC: Isolation, Screening, and Antimicrobial Activity of Compounds from Actinobacteria in Mainit Hot Springs, Cebu, Philippines', label: 'Project ISAAC: Isolation, Screening, and Antimicrobial Activity of Compounds from Actinobacteria in Mainit Hot Springs, Cebu, Philippines' },
                    { value: 'An Edge-Based Model of SEIR Epidemics on Static Random Networks', label: 'An Edge-Based Model of SEIR Epidemics on Static Random Networks' },
                    { value: 'On dual B-filters and Dual B-subalgebras in a Topolological Dual B-algebra', label: 'On dual B-filters and Dual B-subalgebras in a Topolological Dual B-algebra' },
                    { value: 'Survey of Heatwaves in the Philippine Seas', label: 'Survey of Heatwaves in the Philippine Seas' },
                    { value: 'Relationship between pearl formation and associated biofouling organisms in the pearl oysters of the Arabian Gulf', label: 'Relationship between pearl formation and associated biofouling organisms in the pearl oysters of the Arabian Gulf' },
                    { value: 'Impacts of heatwaves and toxic algal blooms on the physiological performance and future aquaculture of the oysters Ostrea edulis and Magallana (Crassostrea) gigas', label: 'Impacts of heatwaves and toxic algal blooms on the physiological performance and future aquaculture of the oysters Ostrea edulis and Magallana (Crassostrea) gigas' },
                    { value: 'Other', label: 'Other' },
                ]
            },
            {
                label: 'Type of Patent',
                model: 'patent_type',
                component: 'select',
                isRequired: true,
                options: [
                    { value: 'Invention', label: 'Invention' },
                    { value: 'Utility Model', label: 'Utility Model' },
                    { value: 'Industrial Design', label: 'Industrial Design' },
                ]
            },
            { label: 'Application Number', model: 'application_number', component: 'text', placeholder: 'Application Number', isRequired: true },
            { label: 'Name of Inventor/s', model: 'inventors', component: 'text', placeholder: 'Name of Inventor/s', isRequired: true },
            { label: 'Name of Applicant/Owner/s', model: 'applicants', component: 'text', placeholder: 'Name of Applicant/Owner/s', isRequired: true },
            { label: 'Date of Publication of the Unexamined Application', model: 'publication_date', component: 'date', isRequired: true },
            { label: 'Date of Grant of Patent', model: 'grant_date', component: 'date', placeholder: 'Leave blank if patent has not been granted.', isRequired: false },
            { label: 'Registration Number', model: 'registration_number', component: 'text', placeholder: 'Leave blank if patent has not been granted.', isRequired: false },
            {
                label: 'Name of Commercial Product',
                model: 'commercial_product_name',
                component: 'text',
                placeholder: 'Name of Commercial Product',
                isRequired: false
            },
            {
                label: 'Use of Patent',
                model: 'patent_use',
                component: 'select',
                isRequired: true,
                options: [
                    { value: 'For development of technology', label: 'For development of technology' },
                    { value: 'For service provision', label: 'For service provision' },
                    { value: 'As an end-product in itself', label: 'As an end-product in itself' },
                ]
            },
        ], // [TODO]: bug on title input
        training: [
            {
                label: 'Type of Activity',
                model: 'activity_type',
                component: 'select',
                isRequired: true,
                options: [
                    { value: 'Training Course (non-degree and non-credit)', label: 'Training Course (non-degree and non-credit)' },
                    { value: 'Advisory Service', label: 'Advisory Service' },
                ]
            },
            { label: 'Title of Training Course/Advisory Service Conducted', model: 'title', component: 'text', placeholder: 'Title of Training Course/Advisory Service Conducted', isRequired: true },
            { label: 'Venue, City, Municipality and Province', model: 'venue', component: 'text', placeholder: 'Venue, City, Municipality and Province', isRequired: true },
            { label: 'Start Date', model: 'start_date', component: 'date', isRequired: true },
            { label: 'End Date', model: 'end_date', component: 'date', isRequired: true },
            { label: 'Special Notes about the Schedule', model: 'schedule_notes', component: 'textarea', placeholder: 'Provide special notes about the schedule...', isRequired: false },
            { label: 'Number of Hours Required to Complete This Training Course', model: 'total_hours', component: 'number', placeholder: 'Specify in hours only', isRequired: false },
            { label: 'Total Number of Trainees/Persons Served', model: 'total_served', component: 'number', isRequired: true },
            {
                label: 'Source of Majority Share of Funding for this Training Course/Advisory Service',
                model: 'funding_source',
                component: 'select',
                isRequired: true,
                options: [
                    { value: 'UP Entity', label: 'UP Entity' },
                    { value: 'RP Government Entity or Public Sector Entity', label: 'RP Government Entity or Public Sector Entity' },
                    { value: 'RP Private Sector Entity', label: 'RP Private Sector Entity' },
                    { value: 'Foreign or Non-Domestic Entity', label: 'Foreign or Non-Domestic Entity' },
                ]
            },
            { label: 'Number of Responses - Poor/Below Fair', model: 'responses_poor', component: 'number', isRequired: false },
            { label: 'Number of Responses - Fair', model: 'responses_fair', component: 'number', isRequired: false },
            { label: 'Number of Responses - Satisfactory', model: 'responses_satisfactory', component: 'number', isRequired: false },
            { label: 'Number of Responses - Very Satisfactory', model: 'responses_very_satisfactory', component: 'number', isRequired: false },
            { label: 'Number of Responses - Outstanding', model: 'responses_outstanding', component: 'number', isRequired: false },
        ], // [TODO]: recheck

        // [TODO]: check which are required.
    }

    const toggleInfo = () => {
    infoVisible.value = !infoVisible.value;
    };


    const formInformation = {
        research: "Project/program/work must be part of the approved Research/Creative Work agenda and endorsed by the Dean/Head of Unit and/or approved by the Chancellor/Authorized Official. Exclude student theses and dissertations. Researcher/s here refer to full-time faculty members, REPS and staff, whether with permanent, temporary or contractual appointment, who are in service still during the coverage years in review. Exclude from this data collection those projects/works led by lecturers or non-regular part-time staff.",
        publication: "Publications may be produced in print, online or in digital on non-print media.",
        paper_presentation: "The same paper may be presented at different conference events.",
        patent: "Please include only the inventions, utility models and industrial designs owned by the University of the Philippines.",
        other_research: "Include research or creative work outputs that could not be categorized as peer-reviewed publication, academic conference paper presentation or patenting. The output must be exposed in a public event such as exhibitions, public performances, or publication, i.e., when the output was first shown in a public place or released to the public.",
        training: "Training Course/Advisory Service must be part of the approved Extension Work Agenda.",
        extension: "Extension Program must be part of the approved Extension Work Agenda.",
        partnership: "The partner stakeholder must be another agency, organization, private company, media or any institution recognized by UP as a partner by means of a MOA, MOU or a partnership agreement. Extension Activity must be part of the approved Extension Work Agenda.",
        other: "Other Form",
    };

    // File upload logic
    const fileInput = ref(null);
    const selectedFiles = ref([]);

    const triggerFileInput = () => {
    fileInput.value?.click();
    };

    const handleFileChange = (event) => {
    selectedFiles.value = [...event.target.files];
    };

    const handleDrop = (event) => {
    if (event.dataTransfer?.files?.length) {
        selectedFiles.value = [...event.dataTransfer.files];
    }
    };

    const uploadFiles = () => {
        if (!selectedFiles.value.length) {
            alert("No files selected.");
            return;
        }

        const formData = new FormData();

        selectedFiles.value.forEach(file => {
            formData.append("files[]", file);
        });

        // This is where you'd send to your backend
        console.log("Files ready to upload:", selectedFiles.value);

        // Example:
        // await axios.post('/api/upload', formData);
    };

    const handleSubmit = async () => {
        const formValues = formComponent.value.exposeForm();

        if (!formValues) {
            alert("Form is not ready.");
            return;
        }

        try {
            // const submissionData = new FormData();
            const submissionData = formValues;

            // for (const key in formValues) {
            //     if (formValues[key] !== null && formValues[key] !== undefined) {
            //         submissionData.append(key, formValues[key]);
            //     }
            // }

            // if (selectedFiles.value?.length) {
            //     selectedFiles.value.forEach(file => {
            //         submissionData.append("supporting_files[]", file);
            //     });
            // }



            // console.log("Preparing to submit form with files...");
            // for (let [key, value] of submissionData.entries()) {
            //     console.log(`${key}:`, value);
            // }
            console.log(JSON.stringify(submissionData, null, 2));

            await axios.post(`http://localhost:8000/api/report/${reportType.value}/`, submissionData, {
                headers: {
                    'Content-Type': 'application/json', // change this to formdata
                }
            });

            // alert("Report submitted successfu lly!");
            // selectedFiles.value = [];
            // formComponent.value.reset?.();

        } catch (err) {
            console.error("Form submission failed:", err);
            alert("Submission failed. Please try again.");
        }
    };


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
    padding: 1rem;

    display: flex;
    position: relative;

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
    font-weight: 600;
    opacity: 0.4;
}

:deep(.error) {
    color: red;
    font-size: 0.8rem;
}

.drag-area-divs {
    opacity: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.file-icon-container {
    display: flex;
    flex-direction: column;

    justify-content: center;
    max-width: 70px;
    margin: 0.5rem;

    z-index: 100;
}

.file-name {
    font-size: 0.7rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
}
</style>