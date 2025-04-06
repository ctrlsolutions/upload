<template>
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
          <BaseFormCheckbox v-model="selectedReports[index]" :id="`report-${index}`" />
          <span class="timestamp">{{ report.time || '...' }}</span>
          <img :src="report.icon || 'default-icon.png'" alt="Report Icon" class="report-icon" />
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

addIcons(CoMagnifyingGlass);

export default {
  name: 'ReportHistory',
  components: {
    BaseSelectInput,
    BaseTextInput,
    BaseFormButton,
    BaseFormCheckbox,
    DeleteModal,
    OhVueIcon,
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
  overflow-y: hidden;
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
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #D9D9D9;
    padding-bottom: 200px;
    border-radius: 8px;
    transition: padding 0.3s ease, background-color 0.3s ease, border-radius 0.3s ease;
  }
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

.delete-container {
  display: flex;
  justify-content: flex-end;
  margin-right: 50px;
  margin-top: 15px;
}
</style>
