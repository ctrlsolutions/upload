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
            <div v-if="userStore.getUserProfile?.role.code !== 'FA'">
              <BaseSelectInput
                label="Scope"
                name="scope"
                class="scope-select"
                placeholder="Summary scope"
                v-model="form.scope"
              >
                <option disabled>Select a scope</option>
                <option value="FA">Self</option>
                <option value="DH">Department</option>
                <option
                  value="CD"
                  v-if="userStore.getUserProfile?.role.code == 'CD' || userStore.getUserProfile?.role.code == 'CH'"
                >
                  College
                </option>
                <option value="CH" v-if="userStore.getUserProfile?.role.code == 'CH'">University</option>
              </BaseSelectInput>
            </div>
            <div>
              <BaseSelectInput label="Timeframe" name="timeframe" class="timeframe-select" v-model="form.timeframe">
                <option disabled>Select a timeframe</option>
                <option value="SM">6 Months</option>
                <option value="YR">Year</option>
                <option value="CS">Custom</option>
              </BaseSelectInput>
              <BaseFormButton variant="red" height="100%" width="100%" type="button" @click="handleUpdate">
                Update Preview
              </BaseFormButton>
            </div>
          </div>

          <div class="preview-title">
            <div class="line"></div>
            Generate Summary Document Preview
          </div>

          <div class="preview-container">
            <!-- <v-icon name="bi-file-earmark-text" class="preview-icon" scale="10" /> -->
            <iframe v-if="previewUrl" :src="previewUrl" type="application/pdf" width="100%" height="600px"></iframe>
          </div>

          <BaseFormButton variant="red" width="100%" type="button"> Download </BaseFormButton>
        </div>
      </template>
    </FolderComponent>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import FolderComponent from '@/components/Global/FolderComponent.vue'
import { useUserStore } from '@/stores/UserStore'
import { useReportStore } from '@/stores/ReportStore'
import { generateReport } from '@/services/ReportService'

const initialFormState = {
  scope: 'FA',
  timeframe: '',
}

const form = ref({ ...initialFormState })

const userStore = useUserStore()
const reportStore = useReportStore()

const myTabs = ref([{ id: 'generate', title: 'Generate Summary' }])

const currentTab = ref('generate')
const previewUrl = ref('')

// const isHead = computed(() => {
//   const role = userStore.profile?.role
//   return role === 'department_head' || role === 'college_dean' || role === 'chancellor'
// })

const handleUpdate = async () => {
  try {
    const res = await generateReport(form.value)
    console.log(res.data instanceof Blob) // should be false (we're making the blob manually)
    console.log(typeof res.data) // should be object (ArrayBuffer or Uint8Array ideally)

    if (res.success) {
      const blob = new Blob([res.data], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      previewUrl.value = url
    }
  } catch (err) {
    console.error('Error generating report', err)
  }
}

onMounted(async () => {
  if (!userStore.initialized) {
    await userStore.fetchUserProfile()
  }
  console.log('ROLE', userStore.getUserProfile?.role.code)
})

function handleTabChange(newTabId: string) {
  currentTab.value = newTabId
}
</script>

<style lang="scss" scoped>
.generate-container {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-content: center;
  align-items: end;
  box-sizing: border-box;
  margin: 0;
}

.folder-component {
  height: 100%;
  overflow: hidden;
}

.content-area {
  display: grid;
  grid-template-rows: 1fr 0.5fr 2fr 1fr 0.2fr;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  box-sizing: border-box;
  height: 100%;
}

.options-container {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto 1fr auto 1fr;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-top: 1rem;
  color: $green;
}

.scope-label {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  justify-self: start;
  font-weight: bold;
}

.scope-select {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
  width: 100%;
}

.timeframe-label {
  grid-row: 1 / 2;
  grid-column: 3 / 4;
  justify-self: start;
  font-weight: bold;
}

.timeframe-select {
  grid-row: 1 / 2;
  grid-column: 4 / 5;
  width: 100%;
}

.generation-label {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  justify-self: start;
  font-weight: bold;
}

.pdf-radio {
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  justify-self: start;
}

.line {
  margin: 1rem 0 1rem 0;
  background: #d0d0d0;
  width: 100%;
  height: 1px;
}

.preview-title {
  margin-bottom: 1rem;
  color: $red;
  font-weight: bold;
}

.preview-container {
  display: flex;
  grid-row: span 2 / span 2;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  border-radius: 10px;
  background: #e6e6e6;
  padding: 2rem;
}

.update-button {
  cursor: pointer;
  border: none;
  border-radius: 7px;
  background: $red;
  padding: 0.6rem 1.5rem;
  color: white;
  font-weight: bold;
  font-size: 0.7rem;
}

.update-button:hover {
  background: $red;
}

.generate-button {
  cursor: pointer;
  margin-top: 1rem;
  border: none;
  border-radius: 8px;
  background: $red;
  padding: 0.5rem 0;
  width: 100%;
  height: 3rem;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
}

.generate-button:hover {
  background: $red;
}

.preview-icon {
  color: gray;
}
</style>
