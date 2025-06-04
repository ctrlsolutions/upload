<template>
  <div class="report-history-page">
    <div class="banner">
        <v-icon name="fa-history" class="history-icon" />
        <h1>Report History</h1>
    </div>
    <div class="select1">
        <BaseSelectInput
            v-model="selectedSort"
            :options="options"
            placeholder="Sort by"
            variant="filled"
        >
            <option disabled value="">Sort By</option>
        </BaseSelectInput>
    </div>
    <div class="select2">
        <BaseSelectInput
          placeholder="Delete History"
          color="green"
          variant="filled"
          :options="[
            { value: 'department', label: 'Department'},
            { value: 'college', label: 'College' },
            { value: 'university', label: 'University' },
          ]"
        >
            <option disabled value="">Delete History</option>
            <option value="SELF">Self</option>
            <option value="DEPT">Department</option>
            <option value="COLG">College</option>
            <option value="UNIV">University</option>
        </BaseSelectInput>
    </div>
    <div class="search-bar">
        <!-- <BaseTextInput
            id="search-history"
            v-model="searchQuery"
            label="Search History"
            placeholder=""
            :textColor="'black'"
            :borderColor="'#ccc'"
        >
            <OhVueIcon name="co-magnifying-glass" class="search-icon" />
        </BaseTextInput> -->
        <SearchBar
            id="search-history-input"  v-model="searchQuery"
            placeholder="Search by title, author, etc."
        />
    </div>
    <div class="filter">
        <BaseSelectInput
          modelValue=""
          placeholder="Filters"
          variant="filled"
          :options="[
              { value: 'department', label: 'Department'},
              { value: 'college', label: 'College' },
              { value: 'university', label: 'University' },
          ]"
        >
          <option disabled value="">Filters</option>
          <option value="SELF">Self</option>
          <option value="DEPT">Department</option>
          <option value="COLG">College</option>
          <option value="UNIV">University</option>
        </BaseSelectInput>
    </div>
    <div class="report-history-container">
      <div v-for="(reports, date) in groupedReports" :key="date">
        <div v-if="selectedCount > 0" class="delete-container">
          <BaseFormButton
            variant="red"
            width="7rem"
            height="2.5rem"
            @click="deleteSelectedReports"
          >
            Delete ({{ selectedCount }})
          </BaseFormButton>
        </div>
        <div class="date-header">{{ date }}</div>
        <div v-for="(report, index) in reports.slice(0, 5)" :key="index" class="report-item">
          <div class="check-box">
            <Checkbox
                v-model="selectedReports[report.id || `item-${date}-${idx}`]"  :id="`report-checkbox-${report.id || `item-${date}-${idx}`}`"
            />
          </div>
          <span class="timestamp">{{ report.time || '...' }}</span>
          <v-icon name="fa-clipboard-list" class="report-icon" />
          <span class="report-title">{{ report.title || '...' }}</span>
          <span class="report-author">{{ report.author || '...' }}</span>
          <span class="report-author-college" :style="{ backgroundColor: getCollegeColor(report.college) }">
            {{ report.college || '...' }}
          </span>
          <span class="report-author-department">{{ report.department || '...' }}</span>
          <span class="report-type">{{ report.reportType || '...' }}</span>
          <button variant="transparent" width="0" height="2rem" class="options-button">⋮</button>
        </div>
      </div>
    </div>
    <DeleteModal v-if="showDeleteModal" :isOpen="showDeleteModal" @close="closeModal" @confirm-delete="deleteAllReports" />
    <DeleteModal v-if="showDeleteSelectedModal" :isOpen="showDeleteSelectedModal" @close="showDeleteSelectedModal = false" @confirm-delete="confirmDeleteSelectedReports" />
  </div>
</template>

<script>
import axios from "axios";
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue';
import BaseTextInput from '@/components/Global/BaseTextInput.vue';
import BaseFormButton from '@/components/Global/BaseFormButton.vue';
import BaseFormCheckbox from '@/components/Global/BaseFormCheckbox.vue';
import DeleteModal from '@/components/ReportHistory/DeleteModal.vue';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { CoMagnifyingGlass } from "oh-vue-icons/icons";
import { IoDocumentTextSharp } from "oh-vue-icons/icons";
import SearchBar from "@/components/ReportHistory/SearchBar.vue";
import Checkbox from "@/components/ReportHistory/Checkbox.vue";

addIcons(CoMagnifyingGlass);

export default {
  name: 'ReportHistory',
  components: {
    BaseSelectInput,
    BaseTextInput,
    BaseFormButton,
    BaseFormCheckbox,
    Checkbox,
    DeleteModal,
    OhVueIcon,
    SearchBar,
  },
  data() {
    return {
      searchQuery: "",
      selectedSort: "by-date",
      selectedDelete: null,
      selectedFilter: null,
      selectedReports: {},
      showDeleteModal: false,
      showDeleteSelectedModal: false,
      options: [
        { label: "By Date", value: "by-date" },
        { label: "By College", value: "by-college" },
        { label: "By Department", value: "by-department" },
        { label: "My Submission", value: "my-submission" },
      ],
      deleteOptions: [{ label: "Delete All", value: "delete-all" }],
      filterOptions: [{ label: "All", value: "all" }],

      reportTypes: [],

      reports: [],
    };
  },
  computed: {
    headerText() {
      const headers = {
        "by-date": "Date",
        "by-college": "College",
        "by-department": "Department",
        "my-submission": "My Submissions",
      };
      return headers[this.selectedSort] || "Date";
    },
    sortedReports() {
      if (this.selectedSort === "by-date") {
        return [...this.reports].sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (this.selectedSort === "by-college") {
        return [...this.reports].sort((a, b) => a.college.localeCompare(b.college));
      } else if (this.selectedSort === "by-department") {
        return [...this.reports].sort((a, b) => a.department.localeCompare(b.department));
      } else if (this.selectedSort === "my-submission") {
        return this.reports.filter((report) => report.author === "Atty. Leo Malagar"); // Replace with actual user data
      }
      return this.reports;
    },
    filteredReports() {
      if (!this.searchQuery.trim()) return this.sortedReports;

      const query = this.searchQuery.toLowerCase();
      return this.sortedReports.filter((report) =>
        [report.title, report.author, report.college, report.department, report.reportType]
          .some(field => field?.toLowerCase().includes(query))
      );
    },
    groupedReports() {
      return this.filteredReports.reduce((groups, report) => {
        let key = this.selectedSort === "by-college"
          ? report.college
          : this.selectedSort === "by-department"
          ? report.department
          : this.selectedSort === "my-submission"
          ? "My Submission"
          : report.date || "No Reports";

        if (!groups[key]) groups[key] = [];
        groups[key].push(report);
        return groups;
      }, {});
    },
    selectedCount() {
      return Object.values(this.selectedReports).filter(Boolean).length;
    },
  },
  watch: {
    selectedDelete(newValue) {
      if (newValue === "delete-all") {
        this.showDeleteModal = true
        this.selectedDelete = ""
      }
    },
  },
  mounted() {
    this.fetchReports();
  },
  methods: {
    async fetchReports() {
      try {
        const response = await axios.get("/api/reports");
        this.reports = response.data;
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    },
    closeModal() {
      this.showDeleteModal = false;
      this.selectedDelete = null;
    },
    deleteAllReports() {
      this.reports = [];
      this.closeModal();
    },
    deleteSelectedReports() {
      this.showDeleteSelectedModal = true;
    },
    confirmDeleteSelectedReports() {
      this.reports = this.reports.filter(report => !this.selectedReports[report.id]);
      this.selectedReports = {};
      this.showDeleteSelectedModal = false;
    },
    getCollegeColor(college) {
      const colors = {
        "College of Science": "#D89E00",
        "College of Social Sciences": "#7B1113",
        "School of Management": "#1E46A4",
        "College of Communication, Arts, and Design": "#28772C",
      };
      return colors[college] || "gray";
    },
  }
};
</script>

<style lang="scss" scoped>

.report-history-page {
  display: grid; 
  grid-template-columns: 1fr 1fr 3.5fr 1fr; 
  grid-template-rows: 0.5fr 0.5fr 4fr; 
  gap: 0em 0px; 
  grid-template-areas: 
    "header header header header"
    "sort delete search filter"
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
  padding: 1em 0 1em 0;
}

.select2 {
  grid-area: delete;
  display: flex;
  align-items: center;
  padding: 1em;
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
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
}

.date-header {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 1em 2em;
  color: $black;
}

.report-item {
  display: grid;
  grid-template-columns: 0.3fr 0.5fr 0.1fr 2fr 1fr 1fr 1fr 1fr auto;
  align-items: center;
  justify-content: center;
  padding: 1em 5em;
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
  color: #333;
}

.report-icon {
  width: 24px;
  height: 24px;
  margin: 0 10px;
  color: gray;
}

.report-title {
  font-weight: bold;
  color: $black;
  background-color: #F4C6C6;
  border-radius: 8px;
  padding: 1px 5px;
  text-overflow: ellipsis;
}

.report-author, .report-author-department {
  color: $black;
  background-color: #FBF5E7;
  border-radius: 8px;
  padding: 1px 10px;
  text-overflow: ellipsis;
}

.report-author-college {
  color: rgb(240, 240, 240);
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

</style>