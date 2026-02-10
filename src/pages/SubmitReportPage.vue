<template>
  <div class="submit-container">
    <FolderComponent
      class="folder-component"
      :tabs="myTabs"
      :initialActiveTabId="currentTab"
      @update:activeTabId="handleTabChange"
      width="100%"
    >
      <template v-slot="{ activeTabId }">
        <div class="left-container" v-if="activeTabId === 'submit'">
          <!-- Select Section -->
          <div class="select">
            <BaseSelectInput
              name="select-type"
              v-model="selectedForm"
              width="100%"
              class="type-select"
            >
              <option disabled value="">Select a Report Type</option>
              <option v-for="option in formOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </BaseSelectInput>

            <div class="tooltip-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
              <v-icon name="fa-info-circle" scale="1.2" class="tooltip-icon" />
              <div v-if="infoVisible" class="report-tooltip">
                {{ selectedFormObject?.description }}
              </div>
            </div>
          </div>

          <!-- Form Section -->
          <div class="form">
            <component
              :key="componentKey"
              :is="AbstractForm"
              ref="formComponent"
              :fields="selectedFormObject?.fields"
            />
          </div>

          <!-- Button Section -->
          <div class="button">
            <BaseFormButton class="submit-btn" width="100%" variant="red" @click="handleSubmit">
              SUBMIT
            </BaseFormButton>
          </div>
        </div>
      </template>
    </FolderComponent>

    <!-- Supporting Evidence/s -->
    <div class="evidence-container">
      <div class="drop-area-head">Supporting Evidence/s</div>
      <div class="drop-area-desc">
        PDF Image File: Research Proposal, Research Contract or Application for Load Credits containing description,
        duration, and funding information and properly endorsed by the Dean/Head of Unit and/or approved by Authorized
        Officials.
      </div>

      <div class="drop-area" @dragover.prevent @drop.prevent="handleDrop">
        <div v-if="selectedFiles.length" v-for="(file, index) in selectedFiles" :key="index">
          <div
            class="file-icon-container"
            @click="deleteFile(index)"
            @mouseenter="isHover = true"
            @mouseleave="isHover = false"
          >
            <v-icon v-if="isHover" name="bi-file-earmark-excel-fill" scale="3.5" class="file-icon file-icon-hover" />
            <v-icon v-else name="bi-file-earmark-medical-fill" scale="3.5" class="file-icon" />
            <p class="file-name">{{ file.name }}</p>
          </div>
        </div>
        <div v-else class="no-file">
          <div class="drag-area-divs">DRAG FILES HERE</div>
          <div>or</div>
          <!-- <button class="choose-file-button" @click="triggerFileInput">Choose Files</button> -->
          <BaseFormButton @click="triggerFileInput" variant="green" width="40%">CHOOSE FILES</BaseFormButton>
        </div>
        <input type="file" ref="fileInput" multiple style="display: none" @change="handleFileChange" />
      </div>
      <BaseFormButton
        v-if="selectedFiles.length"
        class="file-upload-button"
        width="100%"
        variant="green"
        @click="triggerFileInput"
      >
        ADD MORE FILES
      </BaseFormButton>
    </div>
    <Toast ref="toast" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import FolderComponent from '@/components/Global/FolderComponent.vue'
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import AbstractForm from '@/components/SubmitReport/Forms/AbstractForm.vue'
import { useReportFormStore } from '@/stores/ReportStore'
import type { Form } from '@/types/ReportInterface'
import { submitReport } from '@/services/ReportService'
import Toast from '@/components/Global/Toast.vue'

const toast = ref<InstanceType<typeof Toast> | null>(null)

const reportFormStore = useReportFormStore()

const isHover = ref(false)

// DESC TOOLTIP
const infoVisible = ref(false)
function onMouseEnter() {
  infoVisible.value = true
}
function onMouseLeave() {
  infoVisible.value = false
}

// FOLDER COMPONENT
const currentTab = ref('submit')
const myTabs = ref([{ id: 'submit', title: 'Submit Report' }])
function handleTabChange(newTabId: string) {
  console.log('Tab changed to:', newTabId)
  currentTab.value = newTabId
}

// FILE UPLOAD
const selectedFiles = ref<File[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

function triggerFileInput() {
  fileInput.value?.click()
}

function deleteFile(index: number) {
  selectedFiles.value.splice(index, 1)
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    for (let i = 0; i < target.files.length; i++) {
      selectedFiles.value.push(target.files[i])
    }
  }
}

// import ProgressBar from 'primevue/progressbar'; TODO: later
// import axios from "axios" use this for progressbar support

const selectedForm = ref<string | undefined>(undefined)
const selectedFormObject = computed(() => {
  if (!selectedForm.value) return null
  return reportFormStore.getFormById(selectedForm.value)
})

const formComponent = ref<{
  exposeForm: () => Record<string, any> | null
} | null>(null)

// File upload logic
// const fileInput = ref(null)

// fro resetting component
const componentKey = ref(0)

// function onSelectChange(selectedId: number) {
//   const selectedTemplate = reportFormStore.reportTemplates.find(template => template.form.id === selectedId)
//   selectedForm.value = selectedTemplate ? selectedTemplate.form : null
// }

onMounted(async () => {
  console.log('Component has been mounted!')

  try {
    await reportFormStore.fetchForms()
  } catch (error) {
    console.error('There was an error fetching the data:', error)
  }
})

const formOptions = computed(() => reportFormStore.formOptions)

function handleDrop(event: DragEvent) {
  const files = event.dataTransfer?.files
  if (files) {
    for (let i = 0; i < files.length; i++) {
      selectedFiles.value.push(files[i])
    }
  }
}

// SUBMIT FORM
const handleSubmit = async () => {
  const formValues = formComponent.value?.exposeForm()
  console.log(formValues)

  if (!formValues) {
    alert('Form is not ready.')
    return
  }

  const submissionData = new FormData()

  // ✅ Use 'form' as the key to match backend expectation
  submissionData.append('form', selectedForm.value ?? '')

  // ✅ Append response as a JSON string
  const responseJson = JSON.stringify(formValues)
  submissionData.append('response', responseJson)

  // ✅ Append each file as 'document_0', 'document_1', ...
  selectedFiles.value.forEach((file, index) => {
    submissionData.append(`document_${index}`, file)
  })

  try {
    for (let pair of submissionData.entries()) {
      console.log(pair[0] + ': ' + pair[1])
    }
    const response = await submitReport(submissionData)
    toast.value?.showToast('Submit report successful!', 'success')
  } catch (err) {
    console.error('Form submission failed:', err)
    alert('Submission failed. Please try again.')
  }
}

// TODO: clean up code. make fields required (and supporting evidence)
</script>

<style lang="scss" scoped>
.tooltip-icon:hover {
  color: rgb(191, 0, 0);
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip-icon {
  color: $red;
  cursor: pointer;
  height: 100%;
}

.report-tooltip {
  position: absolute;
  top: 125%; /* move above the icon */
  right: 10%;
  //   transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 8px 12px;
  width: 15rem;

  border-radius: 4px;
  white-space: wrap;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 100;
  font-size: 0.8rem;
}

.submit-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  grid-template-areas: 'left right';
  gap: 1rem;
  box-sizing: border-box;
}

.folder-component {
  grid-area: left;
  height: 100%;
  overflow: hidden;
}

.left-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 5fr 0.5fr;
  gap: 1% 1%;
  height: 100%;
  grid-template-areas:
    'select'
    'form'
    'button';
}

.select {
  grid-area: select;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form {
  grid-area: form;
  // background-color: gray;
  overflow: auto;
  max-height: 60vh;
}

.button {
  grid-area: button;
  align-self: flex-end;
}

.evidence-container {
  margin-top: 50px;
  grid-area: right;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
}

.drop-area-head {
  color: $red;
  padding-bottom: 0.5rem;
}

.drop-area {
  width: 100%;
  height: 100%;
  border: 2px dashed $green;
  color: $green;
  border-radius: 10px;
  font-size: medium;
  align-self: center;
  padding: 1rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}

.no-file {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.5em;
}

.drop-area-desc {
  width: 100%;
  font-size: smaller;
  padding-bottom: 0.7rem;
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

.folder-head {
  display: flex;
}

.drag-area-divs {
  color: $green;
  font-weight: 600;
}

.file-icon-container {
  display: flex;
  flex-direction: column;

  justify-content: center;
  max-width: 70px;
  margin: 0.5rem;

  z-index: 100;
}

.file-icon-hover {
  color: red;
}

.file-name {
  font-size: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
</style>
