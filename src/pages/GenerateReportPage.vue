<template>
  <div class="generate-container">
    <FolderComponent
      width="100%"
      :tabs="myTabs"
      :initialActiveTabId="currentTab"
      @update:activeTabId="handleTabChange"
      class="folder-component"
    >
      <template v-slot="{ activeTabId }">
        <div v-if="activeTabId === 'generate'" class="content-area">
          <div class="options-container">
            <div v-if="isHead">
              <p class="scope-label">Select a scope:</p>
              <BaseSelectInput class="scope-select" v-model="scope">
                <option disabled>Select a scope</option>
                <option value="SELF">Self</option>
                <option value="DEPT">Department</option>
                <option value="COLG">College</option>
                <option value="UNIV">University</option>
              </BaseSelectInput>
            </div>

            <p class="timeframe-label">Select a timeframe:</p>
            <BaseSelectInput class="timeframe-select" v-model="timeframe">
              <option disabled>Select a timeframe</option>
              <option value="SM">6 Months</option>
              <option value="YR">Year</option>
              <option value="CS">Custom</option>
            </BaseSelectInput>

            <p class="generation-label">Save option:</p>
            <BaseFormRadio class="pdf-radio" name="saveOption" value="pdf" id="pdf-option" label="Save as .pdf" />
            <BaseFormButton variant="red" height="100%" width="100%" type="button" @click="updatePreview">
              {{ isLoadingPreview ? 'Loading...' : 'Update Preview' }}
            </BaseFormButton>
          </div>

          <div class="preview-title">
            <div class="line"></div>
            Generate Summary Document Preview
          </div>

          <div class="preview-container">
            <template v-if="isLoadingPreview">
              <span>Loading preview...</span>
            </template>
            <template v-else-if="previewData">
              <!-- <pre>{{ previewData }}</pre> -->
              <iframe :src="previewData" width="100%" height="600px" style="border: none"></iframe>
            </template>
            <template v-else>
              <v-icon name="bi-file-earmark-text" class="preview-icon" scale="10" />
            </template>
          </div>

          <BaseFormButton
            variant="red"
            width="100%"
            type="button"
            @click="downloadPreview"
            :disabled="isGenerating || isLoadingPreview"
          >
            {{ isGenerating ? 'Generating...' : 'Generate' }}
          </BaseFormButton>
        </div>
      </template>
    </FolderComponent>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'
import BaseFormRadio from '@/components/Global/BaseFormRadio.vue'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import FolderComponent from '@/components/Global/FolderComponent.vue'
import { useUserStore } from '@/stores/UserStore'
import api from '@/api'

const userStore = useUserStore()
const timeframe = ref('')
const scope = ref('')

const previewData = ref(null)
const downloadUrl = ref(null)
const filename = ref('report.pdf')

const isLoadingPreview = ref(false)
const isGenerating = ref(false)
const saveOption = ref('pdf')

const myTabs = ref([{ id: 'generate', title: 'Generate Summary' }])

const currentTab = ref('generate')

const isHead = computed(() => {
  const role = userStore.profile?.role?.toLowerCase()
  return role === 'department_head' || role === 'college_dean' || role === 'chancellor'
})

onMounted(async () => {
  if (!userStore.initialized) {
    await userStore.fetchUserProfile()
  }
})

function handleTabChange(newTabId: string) {
  console.log('Tab changed to:', newTabId)
  currentTab.value = newTabId
}

async function updatePreview() {
  isLoadingPreview.value = true
  previewData.value = null

  const payload = {
    scope: scope.value || 'self',
    timeframe: timeframe.value || '',
    saveOption: 'pdf',
  }

  try {
    const response = await api.post('/report/generate-pdf/', payload, {
      responseType: 'blob',
    })

    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)

    previewData.value = url // Save for embedding in <iframe> or <object>
    downloadUrl.value = url // Save for download button

    const disposition = response.headers['content-disposition']
    const match = disposition && disposition.match(/filename="(.+)"/)
    filename.value = match ? match[1] : 'report.pdf'
  } catch (error) {
    console.error('Preview generation failed:', error)
    previewData.value = null
  } finally {
    isLoadingPreview.value = false
  }
}

function downloadPreview() {
  if (!downloadUrl.value) return

  const link = document.createElement('a')
  link.href = downloadUrl.value
  link.setAttribute('download', filename.value || 'report.pdf')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

async function generateReport() {
  isGenerating.value = true

  const payload = {
    scope: scope.value || 'self',
    timeframe: timeframe.value || '',
    saveOption: saveOption.value || 'pdf',
  }

  try {
    const response = await api.post('/report/generate-pdf/', payload, {
      responseType: 'blob',
    })

    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url

    const disposition = response.headers['content-disposition']
    const match = disposition && disposition.match(/filename="(.+)"/)
    const filename = match ? match[1] : 'report.pdf'

    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download failed:', error)
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  box-sizing: border-box;
  margin: 0;
  justify-content: center;
  align-items: end;
}

.folder-component {
  height: 100%;
  overflow: hidden;
}

.content-area {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: 1fr 0.5fr 2fr 1fr 0.2fr;
  gap: 1rem;
  box-sizing: border-box;
}

.options-container {
  display: grid;
  grid-template-columns: auto 1fr auto 1fr;
  grid-template-rows: auto auto;
  gap: 1rem 1.5rem;
  align-items: center;
  margin-top: 1rem;
  color: $green;
}

.scope-label {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  justify-self: start;
  font-weight: bold;
}

.scope-select {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  width: 100%;
}

.timeframe-label {
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  justify-self: start;
  font-weight: bold;
}

.timeframe-select {
  grid-column: 4 / 5;
  grid-row: 1 / 2;
  width: 100%;
}

.generation-label {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  justify-self: start;
  font-weight: bold;
}

.pdf-radio {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  justify-self: start;
}

.line {
  width: 100%;
  height: 1px;
  background: #d0d0d0;
  margin: 1rem 0 1rem 0;
}

.preview-title {
  margin-bottom: 1rem;
  color: $red;
  font-weight: bold;
}

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e6e6e6;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 0.5rem;
  grid-row: span 2 / span 2;
}

.update-button {
  background: $red;
  border-radius: 7px;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.6rem 1.5rem;
  border: none;
  cursor: pointer;
}

.update-button:hover {
  background: $red;
}

.generate-button {
  width: 100%;
  height: 3rem;
  background: $red;
  border-radius: 8px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  padding: 0.5rem 0;
}

.generate-button:hover {
  background: $red;
}

.preview-icon {
  color: gray;
}
</style>
