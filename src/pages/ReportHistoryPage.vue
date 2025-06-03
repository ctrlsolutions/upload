<template>HELLO</template>

<!-- <template>
  <div class="report-history">
    <div class="banner">
      <h1>Report History</h1>
    </div>
    <div class="drop-search">
      <BaseSelectInput
        v-model="selectedSort"
        :options="options"
        placeholder="Sort by"
        width="210px"
        :textColor="'#fff'"
        :borderColor="'transparent'"
        class="select1"
      />
      <BaseSelectInput
        v-model="selectedDelete"
        :options="deleteOptions"
        placeholder="Delete History"
        width="210px"
        :textColor="'#fff'"
        :borderColor="'transparent'"
        class="select2"
      />
      <div class="search-container">
        <OhVueIcon name="co-magnifying-glass" class="search-icon" />
        <BaseTextInput
          id="search-history"
          v-model="searchQuery"
          placeholder="Search History"
          width="700px"
          :textColor="'black'"
          :borderColor="'#ccc'"
          class="search-bar"
        />
      </div>
      <BaseSelectInput
        v-model="selectedFilter"
        :options="filterOptions"
        placeholder="Filters"
        width="200px"
        :textColor="'#fff'"
        :borderColor="'transparent'"
        class="select2"
      />
    </div>
    <div class="report-history-container">
      <div v-if="selectedCount > 0" class="delete-container">
        <BaseFormButton variant="red" width="7rem" height="2.5rem" @click="deleteSelectedReports">
          Delete ({{ selectedCount }})
        </BaseFormButton>
      </div>

      <div v-for="(reportGroup, date) in groupedReports" :key="date">
        <div class="date-header">{{ date }}</div>

        <div v-for="(report, index) in (reportGroup as Report[]).slice(0, 5)" :key="report.id" class="report-item">
          <BaseFormCheckbox v-model="selectedReports[report.id]" :id="`report-${report.id}`" />
          <span class="timestamp">{{ report.time_submitted || 'time' }}</span>
          <img :src="cosImage" alt="Report" class="report-icon" />
          <span class="report-title">{{ report.title || 'Research Title' }}</span>
          <span class="report-author">{{ report.formatted_author || 'Last Name' }}</span>
          <span class="report-author-college">{{ report.college_code || 'DCS' }}</span>
          <span class="report-author-department">{{ report.department_code || 'DCS' }}</span>
          <span class="report-type">{{ report.report_type || 'Research Type' }}</span>
          <button variant="transparent" width="0" height="2rem" class="options-button">⋮</button>
        </div>
      </div>
    </div>

    <DeleteModal
      v-if="showDeleteModal"
      :isOpen="showDeleteModal"
      @close="closeModal"
      @confirm-delete="deleteAllReports"
    />
    <DeleteModal
      v-if="showDeleteSelectedModal"
      :isOpen="showDeleteSelectedModal"
      @close="showDeleteSelectedModal = false"
      @confirm-delete="confirmDeleteSelectedReports"
    />
  </div>
</template>

<script lang="ts" setup>
import cosImage from '@/assets/COS.png'
import { ref, computed, onMounted, watch } from 'vue'
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import BaseFormCheckbox from '@/components/Global/BaseFormCheckbox.vue'
import DeleteModal from '@/components/ReportHistory/DeleteModal.vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { CoMagnifyingGlass } from 'oh-vue-icons/icons'
import type { Report } from '@/types/ReportInterface'

addIcons(CoMagnifyingGlass)

const allReports = ref<Report[]>([])
const reports = ref<Report[]>([])
const searchQuery = ref('')
const selectedSort = ref('by-date')
const selectedDelete = ref('')
const selectedFilter = ref('')
const selectedReports = ref<{ [key: string]: boolean }>({})
const showDeleteModal = ref(false)
const showDeleteSelectedModal = ref(false)

const groupedReports = computed((): Record<string, Report[]> => {
  const groups: Record<string, Report[]> = {}

  const sortKey = selectedSort.value

  ;(reports.value || []).forEach(report => {
    let groupKey = ''

    if (sortKey === 'by-date') {
      groupKey = report.created_on || 'Unknown Date'
    } else if (sortKey === 'by-college') {
      groupKey = report.college_name || 'Unknown College'
    } else if (sortKey === 'by-department') {
      groupKey = report.department_name || 'Unknown Department'
    } else if (sortKey === 'my-submission') {
      groupKey = 'My Submissions'
    }

    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(report)
  })

  return groups
})

const options = [
  { label: 'By Date', value: 'by-date' },
  { label: 'By College', value: 'by-college' },
  { label: 'By Department', value: 'by-department' },
  { label: 'My Submission', value: 'my-submission' },
]

const deleteOptions = [{ label: 'Delete All', value: 'delete-all' }]
const filterOptions = [{ label: 'All', value: 'all' }]
type SortKey = 'by-date' | 'by-college' | 'by-department' | 'my-submission'

const headers: Record<SortKey, string> = {
  'by-date': 'Date',
  'by-college': 'College',
  'by-department': 'Department',
  'my-submission': 'My Submissions',
}

const headerText = computed(() => {
  const key = selectedSort.value as SortKey
  return headers[key] || 'Date'
})

const selectedCount = computed(() => Object.values(selectedReports.value).filter(Boolean).length)

watch(selectedDelete, newValue => {
  if (newValue === 'delete-all') {
    showDeleteModal.value = true
    selectedDelete.value = ''
  }
})

watch(reports, newReports => {
  const newSelection: Record<string, boolean> = {}

  for (const report of newReports) {
    newSelection[report.id] = selectedReports.value[report.id] === true
  }

  selectedReports.value = newSelection
})

watch(selectedSort, newSort => {
  applyCurrentSort()
})

function applyCurrentSort() {
  const sort = selectedSort.value
  if (sort === 'my-submission') {
    reports.value = allReports.value.filter(report => report.is_owner === true)
  } else if (sort === 'by-date') {
    reports.value = [...allReports.value].sort(
      (a, b) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime(),
    )
  } else if (sort === 'by-college') {
    reports.value = [...allReports.value].sort((a, b) => (a.college_name || '').localeCompare(b.college_name || ''))
  } else if (sort === 'by-department') {
    reports.value = [...allReports.value].sort((a, b) =>
      (a.department_name || '').localeCompare(b.department_name || ''),
    )
  } else {
    reports.value = [...allReports.value]
  }
}

onMounted(async () => {
  await fetchReports()
})

async function fetchReports() {
  try {
    const response = await ReportService.getAllReports()
    allReports.value = response ?? []
    applyCurrentSort()
    selectedReports.value = {}
    for (const report of reports.value) {
      selectedReports.value[report.id] = false
    }
  } catch (error) {
    console.error('Error fetching reports:', error)
    reports.value = []
  }
}

function closeModal() {
  showDeleteModal.value = false
  selectedDelete.value = ''
}

async function deleteAllReports() {
  try {
    await ReportService.deleteAllReports()
    await fetchReports() // Refresh list after deletion
    closeModal()
  } catch (error) {
    console.error('Error deleting all reports:', error)
  }
}

function deleteSelectedReports() {
  showDeleteSelectedModal.value = true
}

async function confirmDeleteSelectedReports() {
  try {
    const selectedIds = Object.entries(selectedReports.value)
      .filter(([_, selected]) => selected)
      .map(([id]) => parseInt(id))

    if (selectedIds.length === 0) {
      console.warn('No reports selected for deletion.')
      return
    }

    await ReportService.deleteMultipleReports(selectedIds)

    await fetchReports() // Refresh list after deletion
    selectedReports.value = {}
    showDeleteSelectedModal.value = false
  } catch (error) {
    console.error('Error deleting selected reports:', error)
  }
}
</script>

<style lang="scss" scoped>
.no-reports {
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: #777;
}

.report-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  margin-right: 20px;
  height: 100vh;
  overflow: hidden;
}

.banner {
  width: 100%;
  height: 92px;
  border-radius: 15px;
  background-color: #014421;
  box-shadow: 0px 6px 6.8px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 28px;
  margin-bottom: 20px;
}
.banner h1 {
  color: $white;
  font-size: 35px;
  font-weight: 800;
}

.drop-search {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin: auto 0;
  max-width: 100%;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  width: auto;
  flex-grow: center;
  max-width: 50%;
}

.search-bar {
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  border-radius: 8px;
  width: 100%;
  height: 45px;
  padding-left: 2.5rem;
  padding-right: 1rem;
  border: 1px solid #ccc;
}

.search-icon {
  position: absolute;
  left: 10px;
  font-size: 1.5rem;
  color: #333;
}

.select1 {
  background-color: $red;
  border-radius: 8px;
  max-width: 50%;
  height: 45px;
}

.select2 {
  background-color: $green;
  border-radius: 8px;
  flex-shrink: 0;
  max-width: 50%;
  height: 45px;
}

.report-history-container {
  max-width: 100vw;
  max-height: 100vh;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin: 25px 0;
  margin-bottom: 45px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.date-header {
  font-size: 1.5rem;
  font-weight: 900;
  margin: 5px 0;
  margin-left: 50px;
  margin-top: 20px;
  color: $black;
}

.report-item {
  display: grid;
  grid-template-columns: 40px 80px 30px 2fr 1fr 1fr 1fr 1fr auto;
  align-items: center;
  width: 100%;
  max-width: 90vw;
  padding: 10px 50px;
  gap: 10px;
  overflow-y: hidden;
}

.timestamp {
  margin-left: -10px;
  font-weight: bold;
  color: #333;
}

.report-icon {
  width: 24px;
  height: 24px;
  margin: 0 10px;
}

.report-title {
  font-weight: bold;
  color: $black;
  background-color: #f4c6c6;
  border-radius: 8px;
  padding: 1px 5px;
  text-overflow: ellipsis;
}

.report-author,
.report-author-department {
  color: $black;
  background-color: #fbf5e7;
  border-radius: 8px;
  padding: 1px 10px;
  text-overflow: ellipsis;
}

.report-author-college {
  color: $black;
  background-color: #fbf5e7;
  border-radius: 8px;
  padding: 1px 10px;
  text-overflow: ellipsis;
}

.report-type {
  color: $black;
  background-color: $white;
  border-radius: 8px;
  padding: 1px 10px;
  text-overflow: ellipsis;
}

.report-title,
.report-author,
.report-author-college,
.report-author-department,
.report-type {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 100px;
}

.options-button {
  margin-left: auto;
  border: none;
  background-color: transparent;
}

.delete-container {
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
  margin-top: 15px;
}
</style> -->
