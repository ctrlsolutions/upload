<template>
  <div class="report-history-page">
    <div class="banner">
        <v-icon name="fa-history" class="history-icon" />
        <h1>Report History</h1>
    </div>
    <div class="select1">
        <BaseSelectInput
            name="sort"
            v-model="selectedSort"
            placeholder="Sort by"
            variant="filled"
            color="green"
            class="sort-select"
        >
            <option disabled value="">Sort By</option> 
            <option value="date_desc">Date Submitted (Newest First)</option>
            <option value="date_asc">Date Submitted (Oldest First)</option>
            <option value="title_asc">Title (A-Z)</option>
            <option value="title_desc">Title (Z-A)</option>
        </BaseSelectInput>
    </div>
    <div class="search-bar">
        <SearchBar
            id="search-history-input"  v-model="searchQuery"
            placeholder="Search by title, author, etc."
        />
    </div>
    <div class="filter">
        <BaseSelectInput
            name="filter"
            modelValue=""
            placeholder="Filters"
            variant="filled"
            :options="filterOptionsArray"
        >
          <option disabled value="">Filters</option>
          <option value="SELF">Self</option>
          <option value="DEPT">Department</option>
          <option value="COLG">College</option>
        </BaseSelectInput>
    </div>
    <div class="report-history-container">
        <div class="report-history-inner">
            <div v-if="filteredReports.length === 0" class="empty-state">
                <v-icon name="fa-file-alt" size="3rem" />
                <h2>No reports yet</h2>
                <p>When you submit reports, they'll appear here.</p>
            </div>
            <div v-else v-for="(reports, date) in groupedReports" :key="date">
                <div v-if="selectedCount > 0" class="delete-container">
                    <p>{{ selectedCount }} selected</p>
                    <BaseFormButton
                    variant="red"
    
                    @click="deleteSelectedReports"
                    >
                    Delete
                    </BaseFormButton>
                </div>
                <div class="date-header">{{ date }}</div>
                <div v-for="(report, index) in reports.slice(0,8)" :key="index" class="report-item">
                    <div class="check-box">
                        <Checkbox
                            v-model="selectedReports[report.id]"  
                            :id="`report-checkbox-${report.id || `item-${date}-${index}`}`"
                        />
                    </div>
                    <span class="timestamp">{{ formatTimestamp(report.created_on) || '...' }}</span>
                    <v-icon name="fa-clipboard-list" class="report-icon" />
                    <span class="report-title">{{ report.title || '...' }}</span>
                    <span class="report-author">{{ report.user?.last_name || '...' }}, {{ report.user?.first_name }}</span>
                    <span class="report-author-college" :style="{ backgroundColor: getCollegeColor(report.college) }">
                        {{ report.college_name || '...' }}
                    </span>
                    <span class="report-author-department">{{ report.department_name || '...' }}</span>
                    <span class="report-type">{{ report.form_name || '...' }}</span>
                    <button variant="transparent" width="0" height="2rem" class="options-button">⋮</button>
                </div>
            </div>
        </div>
    </div>
    <DeleteModal v-if="showDeleteModal" :isOpen="showDeleteModal" @close="closeModal" @confirm-delete="deleteAllReports" />
    <DeleteModal v-if="showDeleteSelectedModal" :isOpen="showDeleteSelectedModal" @close="showDeleteSelectedModal = false" @confirm-delete="confirmDeleteSelectedReports" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue';
import BaseTextInput from '@/components/Global/BaseTextInput.vue';
import BaseFormButton from '@/components/Global/BaseFormButton.vue';
import BaseFormCheckbox from '@/components/Global/BaseFormCheckbox.vue';
import DeleteModal from '@/components/ReportHistory/DeleteModal.vue';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoMagnifyingGlass, IoDocumentTextSharp } from "oh-vue-icons/icons"; // Combined icon imports
import SearchBar from "@/components/ReportHistory/SearchBar.vue";
import Checkbox from "@/components/ReportHistory/Checkbox.vue"; // Assuming this is a custom Checkbox, not BaseFormCheckbox
import { useReportStore } from '@/stores/ReportStore';
import { storeToRefs } from 'pinia';
import type { Report } from '@/types/ReportInterface';
import { useUserStore } from '@/stores/UserStore';

addIcons(CoMagnifyingGlass, IoDocumentTextSharp); // Added IoDocumentTextSharp as it was imported but not added

interface GroupedReports {
  [key: string]: Report[];
}

interface Headers {
  [key: string]: string;
  "by-date": string;
  "by-college": string;
  "by-department": string;
  "my-submission": string;
}

const reportStore = useReportStore();
const { reports } = storeToRefs(reportStore);
const userStore = useUserStore(); 
const { profile: currentUserProfile } = storeToRefs(userStore);
const searchQuery = ref("");
const selectedSort = ref("date-desc");
const selectedDelete = ref<string | null>(null);
const selectedFilter = ref<string>("ALL");
const selectedReports = ref<Record<number, boolean>>({});
const showDeleteModal = ref(false);
const showDeleteSelectedModal = ref(false);

const deleteOptions = ref([{ label: "Delete All", value: "delete-all" }]);
const filterOptions = ref([{ label: "All", value: "all" }]);
const reportTypes = ref<string[]>([]);

const headerText = computed<string>(() => {
  const headers: Headers = {
    "by-date": "Date",
    "by-college": "College",
    "by-department": "Department",
    "my-submission": "My Submissions",
  };
  return headers[selectedSort.value] || "Date";
});

const sortedReports = computed<Report[]>(() => {
  const currentReports = [...reports.value];

  switch (selectedSort.value) {
    case "date_desc":
      return currentReports.sort((a, b) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime());
    case "date_asc":
      return currentReports.sort((a, b) => new Date(a.created_on).getTime() - new Date(b.created_on).getTime());
    case "by_college":
      return currentReports.sort((a, b) => (a.college_name || "").localeCompare(b.college_name || ""));
    case "by_department":
      return currentReports.sort((a, b) => (a.department_name || "").localeCompare(b.department_name || ""));
    case "title_asc":
      return currentReports.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    case "title_desc":
      return currentReports.sort((a, b) => (b.title || "").localeCompare(a.title || ""));

    default:
      return currentReports; 
  }
});

const filterOptionsArray = ref([
  { value: "ALL", label: "All My Reports" },
  { value: "SELF", label: "My Submissions (Self)" }, 
  { value: "DEPT", label: "My Department Reports" },
  { value: "COLG", label: "My College Reports" },
]);

const baseReportsForFiltering = computed<Report[]>(() => {
  const userProf = currentUserProfile.value; 

  if (!userProf) {
    return reports.value;
  }

  switch (selectedFilter.value) {
    case "SELF":
      return reports.value.filter(report => report.user?.id === userProf.id);
    case "DEPT":

      return reports.value.filter(report => report.department.department_id === userProf.department?.department_id);
    case "COLG":

      return reports.value.filter(report => report.college.college_id === userProf.college?.college_id);
    case "ALL":
    default:
      return reports.value;
  }
});

const filteredReports = computed<Report[]>(() => {
  if (!searchQuery.value.trim()) return sortedReports.value;

  const query = searchQuery.value.toLowerCase();
  return sortedReports.value.filter((report) =>
    [report.title, report.user.last_name || report.user.email, report.college.name, report.department.name]
      .some(field => field?.toLowerCase().includes(query))
  );
});

const groupedReports = computed<GroupedReports>(() => {
  return filteredReports.value.reduce((groups: GroupedReports, report) => {
    let key: string;
    if (selectedSort.value === "by-college") {
      key = report.college.name;
    } else if (selectedSort.value === "by-department") {
      key = report.department.name;
    } else if (selectedSort.value === "my-submission") {
      key = "My Submission"; // Consistent key
    } else { // Default to by-date
      const date = new Date(report.created_on);
      key = isNaN(date.getTime()) ? "No Reports" : date.toLocaleDateString(); // Handle invalid dates
    }

    if (!groups[key]) groups[key] = [];
    groups[key].push(report);
    return groups;
  }, {});
});

const selectedCount = computed<number>(() => {
  return Object.values(selectedReports.value).filter(Boolean).length;
});

// Watchers
watch(selectedDelete, (newValue: string | null) => {
  if (newValue === "delete-all") {
    showDeleteModal.value = true;
    selectedDelete.value = ""; // Reset to prevent re-triggering if selected again
  }
});

function formatTimestamp(isoString: string | null | undefined): string {
  if (!isoString) {
    return '...'; // Or an empty string, or 'N/A'
  }
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date'; // Handle cases where the date string might be invalid
    }
    // Use toLocaleTimeString for HH:MM AM/PM format
    // You can specify 'en-US' for a common AM/PM format or let it use the user's default locale.
    // Adjust options as needed.
    return date.toLocaleTimeString([], {
      hour: '2-digit', // HH
      minute: '2-digit', // MM
      hour12: true    // AM/PM
    });
  } catch (error) {
    console.error("Error formatting date:", isoString, error);
    return 'Error'; // Or the original string, or '...'
  }
}

// Methods converted to functions
function closeModal() {
  showDeleteModal.value = false;
  selectedDelete.value = null; // Reset the selection
}

async function deleteAllReports() {
  // console.log("deleteAllReports called - implement deletion logic here");
  // Example: await reportStore.deleteAllReportsAction();
  closeModal();
}

function deleteSelectedReports() {
  showDeleteSelectedModal.value = true;
}

async function confirmDeleteSelectedReports() {
  const reportIdsToDelete = Object.entries(selectedReports.value)
    .filter(([_, selected]) => selected)
    .map(([reportId]) => parseInt(reportId));

  if (reportIdsToDelete.length === 0) {
    showDeleteSelectedModal.value = false;
    return;
  }

  // Assuming deleteReport can handle an array or you loop
  // For multiple deletions, it's often better to have a store action that takes an array of IDs
  const deletePromises = reportIdsToDelete.map(reportId => reportStore.deleteReport(reportId));

  try {
    await Promise.all(deletePromises);
    // Successfully deleted
  } catch (error) {
    console.error("Failed to delete selected reports:", error);
    // Handle error (e.g., show a notification)
  } finally {
    selectedReports.value = {}; // Clear selection
    showDeleteSelectedModal.value = false;
    // Optionally, re-fetch reports or let the store handle updates
    // await reportStore.fetchReportHistory();
  }
}

function getCollegeColor(college: { name: string }): string {
  const colors: Record<string, string> = {
    "College of Science": "#D89E00",
    "College of Social Sciences": "#7B1113",
    "School of Management": "#1E46A4",
    "College of Communication, Arts, and Design": "#28772C",
  };
  return colors[college?.name] || "gray";
}

onMounted(async () => {
  await reportStore.fetchReportHistory();
});

</script>


<style lang="scss" scoped>

.delete-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em 2em;
    font-weight: $base-fw;
    font-size: 12px;
    border-radius: $base-br;
    background-color: rgb(232, 232, 232);
}

.sort-select {
    color: $green;
    background-color: $green;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: #666;
  height: 100%;
  
  h2 {
    margin: 1rem 0 0.5rem;
    font-size: 1.5rem;
  }
  
  p {
    margin: 0;
    color: #999;
  }
}

.report-history-page {
  display: grid; 
  grid-template-columns: 1fr 1fr 3.5fr 1fr; 
  grid-template-rows: 0.5fr 0.5fr 4fr; 
  gap: 0em 0px; 
  grid-template-areas: 
    "header header header header"
    "filter sort search search"
    "main main main main"; 
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.banner {
  grid-area: header;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  background-color: $green;
  box-shadow: 0px 6px 6.8px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
}

.banner h1 {
  color: $white;
  font-size: 35px;
  font-weight: 800;
}

.history-icon {
    width: 2.5rem;
    height: 2.5rem;
    color: white;
}

.search-bar {
  grid-area: search;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  position: absolute;
  font-size: 1.5rem;
  color: $red;
}

.select1 {
  grid-area: sort;
  display: flex;
  align-items: center;
  padding-right: 1em;
}

.select2 {
  grid-area: delete;
  display: flex;
  align-items: center;
//   padding-right: 1em;
}

.filter {
  grid-area: filter;
  display: flex;
  align-items: center;
  padding-left: 1em;
}

.report-history-container {
  grid-area: main;
  background: white;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.report-history-inner {
    // height: 100%;
    // overflow-y: auto;
    flex-grow: 1;
}

.date-header {
  font-size: 1.2rem;
  font-weight: 800;
  margin: 1em 2em;
  color: $red;
}

.report-item {
  display: grid;
  grid-template-columns: 0.3fr 0.5fr 0.1fr 2fr 1fr 1fr 1fr 1fr auto;
  align-items: center;
  justify-content: center;
  padding: 0.4em 3em;
  gap: 1em;
  overflow-y: hidden;
}

.check-box {
    display: flex;
    justify-content: center;
    align-items: center;
}

.timestamp {
  margin-left: -10px;
  font-weight: bold;
  font-size: 0.8em;
  color: #333;
}

.report-icon {
  width: 24px;
  height: 24px;
  margin: 0 10px;
  color: gray;
}

.report-title {
//   font-weight: bold;
//   color: $black;
    font-size: 0.8em;
  background-color: #F4C6C6;
  border-radius: 8px;
  padding: 5px 10px;
  text-overflow: ellipsis;
}

.report-author, .report-author-department {
//   color: $black;
  background-color: #FBF5E7;
  border-radius: 8px;
  padding: 1px 10px;
  text-overflow: ellipsis;
  font-size: 0.8em;
}

.report-author-college {
  color: rgb(240, 240, 240);
  border-radius: 8px;
  padding: 1px 10px;
  text-overflow: ellipsis;
  font-size: 0.8em;
}

.report-type {
//   color: $black;
font-size: 0.8em;
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
  font-size: 0.8em;
}

.options-button {
  margin-left: auto;
  border: none;
  background-color: transparent;
}

</style>