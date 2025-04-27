<template>
  <div class="container">
    <div class="folder-container">
      <!-- Header -->
      <div class="folder-tab">
        <div class="title-container">Submit Report</div>
      </div>

      <!-- Report Type Selector -->
      <div class="folder-head">
        <BaseSelectInput v-model="selectedForm">
          <option v-for="option in formOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </BaseSelectInput>

        <!-- <v-icon name="hi-information-circle" class="info-icon" scale="1.2" @click="toggleInfo" /> -->
      </div>

      <!-- Report Form -->
      <div class="form-container">
        <component :key="componentKey" :is="AbstractForm" ref="formComponent" :fields="selectedFormObject?.fields" />
      </div>
      <button class="submit-btn" @click="handleSubmit">SUBMIT</button>
    </div>

    <!-- Supporting Evidence/s -->
    <div class="file-drop-area-container">
      <div class="drop-area-head">Supporting Evidence/s</div>
      <div class="drop-area-desc">
        PDF Image File: Research Proposal, Research Contract or Application for Load Credits containing description,
        duration, and funding information and properly endorsed by the Dean/Head of Unit and/or approved by Authorized
        Officials.
      </div>

      <!-- <div class="drop-area" @dragover.prevent @drop.prevent="handleDrop"> -->
      <!-- <div v-if="selectedFiles.length" v-for="(file, index) in selectedFiles" :key="index">
          <div class="file-icon-container" @click="deleteFile(index)">
            <v-icon name="bi-file-earmark-medical" scale="3.5" class="file-icon" />
            <p class="file-name">{{ file.name }}</p>
          </div>
        </div> -->
      <!-- <div class="drag-area-divs">DRAG FILES HERE</div> -->
      <!-- <div style="opacity: 0.5">or</div> -->
      <!-- <button class="choose-file-button" @click="triggerFileInput">Choose Files</button> -->
      <!-- <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileChange" /> -->
      <!-- </div> -->
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

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'
import AbstractForm from '@/components/SubmitReport/Forms/AbstractForm.vue'
import { useReportTemplatesStore } from '@/stores/ReportStore'
import type { ReportTemplate, Form } from '@/types/ReportInterface'

const reportTemplatesStore = useReportTemplatesStore()

// import ProgressBar from 'primevue/progressbar'; TODO: later
// import axios from "axios" use this for progressbar support

const selectedForm = ref<string | undefined>(undefined)
const selectedFormObject = computed(() => {
  if (!selectedForm.value) return null
  return reportTemplatesStore.getFormById(selectedForm.value)
})

const formComponent = ref(null)
const infoVisible = ref(false)

// File upload logic
// const fileInput = ref(null)

// fro resetting component
const componentKey = ref(0)

// function onSelectChange(selectedId: number) {
//   const selectedTemplate = reportTemplatesStore.reportTemplates.find(template => template.form.id === selectedId)
//   selectedForm.value = selectedTemplate ? selectedTemplate.form : null
// }

onMounted(async () => {
  console.log('Component has been mounted!')

  try {
    await reportTemplatesStore.fetchTemplates()
    selectedForm.value = reportTemplatesStore.firstReport?.id.toString()
  } catch (error) {
    console.error('There was an error fetching the data:', error)
  }
})

const formOptions = computed(() => reportTemplatesStore.formOptions)

// const openModal = () => {
//   isModalVisible.value = true
// }

// const closeModal = () => {
//   isModalVisible.value = false
// }

// Function to handle files selected in the modal (called by modal's 'files-selected' event)
// const handleFilesFromModal = files => {
//   selectedFiles.value = files
//   // closeModal(); // Modal closes itself after emitting 'files-selected'
// }

// const deleteFile = index => {
//   selectedFiles.value.splice(index, 1)
// }

// const handleFileChange = event => {
//   selectedFiles.value = [...event.target.files]
// }

// const handleDrop = event => {
//   if (event.dataTransfer?.files?.length) {
//     selectedFiles.value.push(...event.dataTransfer.files)
//   }
//   console.log(selectedFiles)
// }

// const handleSubmit = async () => {
//   const formValues = formComponent.value.exposeForm()
//   console.log(formValues)

//   if (!formValues) {
//     alert('Form is not ready.')
//     return
//   }

//   const submissionData = new FormData()

//   // ✅ Use 'form' as the key to match backend expectation
//   submissionData.append('form', selectedForm.value)

//   // ✅ Append response as a JSON string
//   const responseJson = JSON.stringify(formValues)
//   submissionData.append('response', responseJson)

//   // ✅ Append each file as 'document_0', 'document_1', ...
//   selectedFiles.value.forEach((file, index) => {
//     submissionData.append(`document_${index}`, file)
//   })

//   try {
//     const response = await fetch('http://127.0.0.1:8000/api/responses/', {
//       method: 'POST',
//       body: submissionData,
//     })

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     alert('Report submitted successfully!')
//     console.log(await response.json())

//     // Reset form and files
//     selectedFiles.value = []
//     componentKey.value += 1
//     formComponent.value.reset?.()
//   } catch (err) {
//     console.error('Form submission failed:', err)
//     alert('Submission failed. Please try again.')
//   }
// }
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
