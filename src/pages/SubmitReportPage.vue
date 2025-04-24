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
                    v-model="selectedForm"
                    :options="formTitles"
                />
 
                <v-icon name="hi-information-circle" class="info-icon" scale="1.2" @click="toggleInfo" />
            </div>

            <div class="info-container" v-if="infoVisible"> 
                <v-icon name="bi-book" scale="2" />
                <div class="info-text">
                    {{ formInformation[selectedForm] }}
                </div>
            </div>

            <!-- Report Form -->
            <div class="form-container">
                <component :key="componentKey" :is="AbstractForm" ref="formComponent" :fields=formFields />
                 <!-- TODO: format this -->
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
                <div v-if="selectedFiles.length" v-for="(file, index) in selectedFiles" :key="index">
                    <div class="file-icon-container" @click="deleteFile(index)">
                        <v-icon name="bi-file-earmark-medical" scale="3.5" class="file-icon"/>
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
            <!-- <button class="file-upload-button" @click="uploadFiles">

            <UploadModal
                v-if="isModalVisible"
                :initial-files="selectedFiles"
                @close="closeModal"
                @files-selected="handleFilesFromModal"
            />

            <button class="file-upload-button" @click="uploadFiles">
                <img src="../assets/oble_icon.png" alt="" style="margin-right: auto; margin-bottom: 0;" />
                <span style="margin: 0 auto;">UPLOAD</span>
            </button> -->
        </div>
    </div>
</template>
  
<script setup>
    import { ref, onMounted, computed, watch } from "vue";

    import UploadModal from "@/components/SubmitReport/UploadModal.vue";
    import BaseSelectInput from "@/components/Global/BaseSelectInput.vue";
    import AbstractForm from "@/components/SubmitReport/Forms/AbstractForm.vue";

    // import ProgressBar from 'primevue/progressbar'; TODO: later
    // import axios from "axios" use this for progressbar support

    const selectedForm = ref(null);

    const formComponent = ref(null);
    const infoVisible = ref(false);

    const forms = ref(null);
    const submissionData = new FormData();

    // File upload logic
    const fileInput = ref(null);
    const selectedFiles = ref([]);

    // fro resetting component
    const componentKey = ref(0)

    // models define the key of json POST
    const locfields = {
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
                    { value: 'up-entity', label: 'Local' },
                    { value: 'rp-governemnt-entity-or-public-sector-entity', label: 'RP Government Entity or Public Sector Entity' },
                    { value: 'rp-private-sector-entity', label: 'RP Private Sector Entity' },
                    { value: 'foreign-or-nondomestic-entity', label: 'Foreign or Non-Domestic Entity' },
                ]},
        ], // [TODO]: name should be arrayed
        publication: [
            { label: 'Publication Title', model: 'title', component: 'text', placeholder: 'title', isRequired: true },
            { label: 'Author/Co-Authors', model: 'author_names', component: 'text', placeholder: 'Name', isRequired: true },
            { label: 'Published or Accepted for Publication', model: 'publication_date', component: 'date', isRequired: true },
            { 
                label: 'Name of Journal/Book/Conference Publication/Other Publication', 
                model: 'publisher_name',
                component: 'text',
                isRequired: true 
            },
            {
                label: 'Type of Publication',
                model: 'publication_type',
                component: 'select',
                isRequired: true,
                options: [
                    { value: 'PEER_REVIEWED_JOURNAL_ARTICLE', label: 'Peer Reviewed Journal Article' },
                    { value: 'BOOK', label: 'Book' },
                    { value: 'EDITED_OR_PEER_REVIEWED_BOOK_CHAPTER', label: 'Edited or Peer Reviewed Book Chapter' },
                    { value: 'PEER_REVIEWED_CONFERENCE_PAPER_PUBLICATION', label: 'Peer Reviewed Conference Paper Publication' },
                    { value: 'OTHER', label: 'Other' },
                ]
            },
            {
                label: 'Type of Publisher',
                model: 'publisher_type',
                component: 'select',
                isRequired: true,
                options: [
                    { value: 'COMMERCIAL', label: 'Commercial' },
                    { value: 'LEARNED_SOCIETY_AND_ASSOCIATION', label: 'Learned Society and Association' },
                    { value: 'UNIVERSITY_PRESS', label: 'University Press' },
                ]
            },
            {
                label: 'Location of Publisher',
                model: 'publisher_location',
                component: 'select',
                isRequired: true,
                options: [
                    { value: 'LOCAL', label: 'Local' },
                    { value: 'INTERNATIONAL', label: 'International' },
                ]
            },
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
                model: 'title',
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
            { label: 'Title of Paper Presented', model: 'presented_paper_title', component: 'text', placeholder: 'Title of Paper Presented', isRequired: true },
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
                model: 'conference_location',
                component: 'select',
                isRequired: true,
                options: [
                    { value: 'Institutional/In-House', label: 'Institutional/In-House' },
                    { value: 'Local/Regional', label: 'Local/Regional' },
                    { value: 'National', label: 'National' },
                    { value: 'International', label: 'International' },
                ]
            },
            { label: 'Venue, City and Country', model: 'venue', component: 'text', placeholder: 'Venue, City and Country', isRequired: true },
            { label: 'Conference Start Date', model: 'conference_start_date', component: 'date', isRequired: true },
            { label: 'Conference End Date', model: 'conference_end_date', component: 'date', isRequired: true },
            { label: 'Date of Presentation', model: 'presentation_date', component: 'date', isRequired: true },
        ],
        patent: [
            { label: 'Title', model: 'title', component: 'text', placeholder: 'Title', isRequired: true },
            { label: 'Patent Title', model: 'patent_title', component: 'text', placeholder: 'Title', isRequired: true },
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
            { label: 'Application Number', model: 'application_no', component: 'text', placeholder: 'Application Number', isRequired: true },
            { label: 'Name of Inventor/s', model: 'inventors_name', component: 'text', placeholder: 'Name of Inventor/s', isRequired: true },
            { label: 'Name of Applicant/Owner/s', model: 'owner_name', component: 'text', placeholder: 'Name of Applicant/Owner/s', isRequired: true },
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
        other_research: [
            { label: 'Output Title', model: 'title', component: 'text', isRequired: true },
            { label: 'Type of Output', model: 'output_type', component: 'text', isRequired: true },
            { label: 'Type of Public Event', model: 'public_event_type', component: 'text', isRequired: true },
            { label: 'Event Title', model: 'event_title', component: 'text', isRequired: true },
            { label: 'Organizer Name', model: 'organizer_name', component: 'text', isRequired: true },
            { label: 'Event Venue', model: 'event_venue', component: 'text', isRequired: true },
            { label: 'Event Location', model: 'event_location', component: 'text', isRequired: true },
            { label: 'Event Start Date', model: 'event_start_date', component: 'date', isRequired: true },
            { label: 'Event End Date', model: 'event_end_date', component: 'date', isRequired: true },
            { label: 'First Shown/Released to Public Date', model: 'output_firstshownorreleasedtopublic_date', component: 'date', isRequired: true },
            { label: 'Industry Utilization', model: 'industry_utilization', component: 'text', isRequired: false },
        ],
        training: [
            { label: 'Title', model: 'title', component: 'text', placeholder: 'Title', isRequired: true },
            { label: 'Activity Type', model: 'activity_type', component: 'text', isRequired: true },
            { label: 'Course or Service Title', model: 'course_or_service_title', component: 'text', isRequired: true },
            { label: 'Venue', model: 'venue', component: 'text', isRequired: true },
            { label: 'Start Date', model: 'start_date', component: 'date', isRequired: true },
            { label: 'End Date', model: 'end_date', component: 'date', isRequired: true },
            { label: 'Schedule Notes', model: 'schedule_special_notes', component: 'text', isRequired: false },
            { label: 'Hours Required', model: 'hours_required_to_complete', component: 'number', isRequired: false },
            { label: 'Number of Trainees Served', model: 'number_of_trainees_served', component: 'number', isRequired: false },
            { label: 'Source of Funding', model: 'source_of_funding', component: 'text', isRequired: false },
        ],
        extension: [
            { label: 'Title', model: 'title', component: 'text', placeholder: 'Title', isRequired: true },
            { label: 'Components', model: 'components', component: 'text', isRequired: true },
            { label: 'Scope', model: 'scope', component: 'text', isRequired: true },
            { label: 'Start Date', model: 'start_date', component: 'date', isRequired: true },
            { label: 'End Date', model: 'end_date', component: 'date', isRequired: true },
            { label: 'Target Beneficiary Group', model: 'target_beneficiary_group', component: 'text', isRequired: true },
            { label: 'Beneficiaries Served', model: 'tbg_served', component: 'number', isRequired: false },
            { label: 'Source of Funding', model: 'source_of_funding', component: 'text', isRequired: false },
        ],
        partnership: [
            { label: 'Title', model: 'title', component: 'text', placeholder: 'Title', isRequired: true },
            { label: 'Extension Activities under Partnership', model: 'type_of_extension_activities_under_this_partnership', component: 'text', isRequired: true },
            { label: 'Extension Partnership Title', model: 'extension_partnership_title', component: 'text', isRequired: true },
            { label: 'Scope of Work (UP)', model: 'up_scope_of_work', component: 'text', isRequired: true },
            { label: 'Partner/Stakeholder Name', model: 'partner_stakeholder_name', component: 'text', isRequired: true },
            { label: 'Stakeholder Category', model: 'stakeholder_category', component: 'text', isRequired: true },
            { label: 'Partnership Agreement Type', model: 'partnership_agreement_type', component: 'text', isRequired: true },
            { label: 'Agreement Start Date', model: 'partnership_agreement_effectivity_start_date', component: 'date', isRequired: true },
            { label: 'Agreement End Date', model: 'partnership_agreement_effectivity_end_date', component: 'date', isRequired: false },
        ],
        others: [
            { label: 'Title', model: 'title', component: 'text', placeholder: 'Title', isRequired: true },
            { label: 'Description', model: 'description', component: 'text', isRequired: true },
        ],

    }

    const formTitles = computed(() => {
        if (!forms.value) return [];
        return forms.value.map(form => ({
            value: form.id,
            label: form.title
        }));
    });

    const formFields = ref([]);
    watch(() => selectedForm.value, async (newSelectedForm) => {
        if (newSelectedForm) {
            const fieldsResponse = await fetch(`http://127.0.0.1:8000/api/fields/?form_id=${newSelectedForm}`);
            const formFieldsData = await fieldsResponse.json();
            formFields.value = formFieldsData;
        }
    }, { immediate: true }); 

    onMounted(async () => { 
        console.log('Component has been mounted!');
        
        try {
            const response = await fetch('http://127.0.0.1:8000/api/forms');
            if (!response.ok) throw new Error('Network response was not ok');

            forms.value = await response.json()
            selectedForm.value = forms.value[0].id
        } catch (error) {
            console.error('There was an error fetching the data:', error);
        }
    });


    const toggleInfo = () => {
        infoVisible.value = !infoVisible.value;
    };

    const openModal = () => {
        isModalVisible.value = true;
    };

    const closeModal = () => {
        isModalVisible.value = false;
    };

    // Function to handle files selected in the modal (called by modal's 'files-selected' event)
    const handleFilesFromModal = (files) => {
        selectedFiles.value = files;
        // closeModal(); // Modal closes itself after emitting 'files-selected'
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

    const deleteFile = (index) => {
        selectedFiles.value.splice(index,1);
    }

    const handleFileChange = (event) => {
        selectedFiles.value = [...event.target.files];
    };

    const handleDrop = (event) => {
        if (event.dataTransfer?.files?.length) {
            selectedFiles.value.push(...event.dataTransfer.files);
        }
        console.log(selectedFiles)
    };

    const handleSubmit = async () => {
        const formValues = formComponent.value.exposeForm();
        console.log(formValues);

        if (!formValues) {
            alert('Form is not ready.');
            return;
        }

        const submissionData = new FormData();

        // ✅ Use 'form' as the key to match backend expectation
        submissionData.append('form', selectedForm.value);

        // ✅ Append response as a JSON string
        const responseJson = JSON.stringify(formValues);
        submissionData.append('response', responseJson);

        // ✅ Append each file as 'document_0', 'document_1', ...
        selectedFiles.value.forEach((file, index) => {
            submissionData.append(`document_${index}`, file);
        });

        try {
            const response = await fetch('http://127.0.0.1:8000/api/responses/', {
                method: 'POST',
                body: submissionData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert("Report submitted successfully!");
            console.log(await response.json());

            // Reset form and files
            selectedFiles.value = [];
            componentKey.value += 1;
            formComponent.value.reset?.();
        } catch (err) {
            console.error("Form submission failed:", err);
            alert("Submission failed. Please try again.");
        }
    };


</script>
  

<style lang="scss" scoped>
    .file-icon:hover {
        color: rgb(191, 0, 0);
    }

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