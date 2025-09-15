<template>
    <div class="dashboard">
        <div class="greetings-card"><GreetCard/></div>
        
        <div class="folder">
            <FolderComponent
              class="folder-component"
              width="100%"
              :tabs="adminTabs" 
              :initialActiveTabId="currentTab"
              @update:activeTabId="handleTabChange"
            >
              <template v-slot="{ activeTabId }"> 
                <div v-if="activeTabId === 'blast'" class="blast-tab">
                  <div class="blast-form">
                    <BaseTextInput
                      id="subject"
                      type="text"
                      label="Email Subject"
                      placeholder="Subject"
                      width="100%"
                      v-model="emailSubject"
                    />
                    <BaseTextArea
                      id="message"
                      type="textarea"
                      label="Email Message"
                      placeholder="Body"
                      width="100%"
                      v-model="emailMessage"
                    />
                  </div>
                  <BaseFormButton
                    variant="red"
                    id="send-button"
                    type="submit"
                    width="100%"
                    @click="sendEmailBlast"
                  >
                    Send
                  </BaseFormButton>
                </div>
                <div v-if="activeTabId === 'add-edit'" class="add-edit-tab">
                  <h2>Add</h2>
                  <div class="add-edit-form">
                    <BaseSelectInput
                      id="department-name"
                      placeholder="Select department"
                      width="100%"
                      v-model="selectedDepartment"
                    >
                      <option value="" disabled>Select type</option>
                      <option value="DEPT">Department</option>
                      <option value="COLG">College</option>
                    </BaseSelectInput>
                    <BaseTextInput
                      id="cd-name"
                      type="text"
                      label="Deparment/College Name"
                      placeholder="Enter name"
                      width="100%"
                      v-model="addName"
                    />  
                    <BaseFormButton
                      variant="red"
                      id="add-button"
                      type="submit"
                      width="100%"
                      @click="addCollegeOrDepartment"
                    >
                      Add
                    </BaseFormButton>
                  </div>
                  <h2>Edit</h2>
                  <div class="add-edit-form">
                    <BaseSelectInput
                      id="department-name"
                      placeholder="Select department"
                      width="100%"
                      v-model="selectedDepartment"
                    >
                      <option value="" disabled>Select a college/department</option>
                      <option value="DEPT">Department</option>
                      <option value="COLG">College</option>
                    </BaseSelectInput>
                    <BaseFormButton
                      variant="red"
                      id="add-button"
                      type="submit"
                      width="100%"
                      @click="editCollegeOrDepartment"
                    >
                      Edit
                    </BaseFormButton>
                  </div>
                </div>
                <div v-if="activeTabId === 'roles'" class="roles-tab">
                  <div class="roles-form">
                    <BaseTextInput
                    id="user-email"
                    type="text"
                    label="Faculty Member Email"
                    placeholder="Enter email address of faculty member"
                    width="100%"
                    v-model="userEmail"
                    />  
                    <BaseSelectInput
                      id="role-name"
                      placeholder="Select role"
                      width="100%"
                      v-model="selectedRole"
                    >
                      <option value="" disabled>Select role</option>
                      <option value="DHEAD">Department Head</option>
                      <option value="CDEAN">College Dean</option>
                      <option value="CHANC">Chancellor</option>
                    </BaseSelectInput>
                    <BaseFormButton
                      variant="red"
                      id="add-button"
                      type="submit"
                      width="100%"
                      @click="addCollegeOrDepartment"
                    >
                      Assign
                    </BaseFormButton>
                  </div>
                </div>
                <div v-if="activeTabId === 'requests'" class="requests-tab">
                  <h3>Role Change Requests</h3>
                  <div v-if="requests.length === 0">No requests at the moment.</div>
                  <table v-else class="requests-table">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Requested Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="req in requests" :key="req.id">
                        <td>{{ req.email }}</td>
                        <td>{{ req.requestedRole }}</td>
                        <td>
                          <span v-if="req.status === 'approved'" class="approved">Approved</span>
                          <span v-else-if="req.status === 'rejected'" class="rejected">Rejected</span>
                          <span v-else>Pending</span>
                        </td>
                        <td>
                          <template v-if="req.status === 'pending'">
                            <button @click="approveRequest(req.id)" class="approve-btn">✔</button>
                            <button @click="rejectRequest(req.id)" class="reject-btn">✖</button>
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </FolderComponent>
        </div>
        <div class="statistics">
          <StatCard :header-color="headerColor">
            <p>{{ currentDescription }}</p>
          </StatCard>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'
import GreetCard from '@/components/AdminPanel/GreetCard.vue'
import StatCard from '@/components/AdminPanel/StatCard.vue'
import RoleCard from '@/components/AdminPanel/RoleCard.vue'
import College from '@/components/AdminPanel/College.vue'
import FolderComponent from '@/components/Global/FolderComponent.vue'
import BaseSelectInput from '@/components/Global/BaseSelectInput.vue'
import BaseTextInput from '@/components/Global/BaseTextInput.vue'
import BaseFormButton from '@/components/Global/BaseFormButton.vue'
import BaseTextArea from '@/components/Global/BaseTextArea.vue'

const headerColor = ref('#7B1113') 

// FOLDER COMPONENT
const currentTab = ref('blast')
const adminTabs = ref([
  { id: 'blast', title: 'Email Blast', description: 'Send mass emails to faculty members' },
  { id: 'add-edit', title: 'Add/Edit', description: 'Manage colleges and departments' },
  { id: 'roles', title: 'Roles', description: 'Assign roles to faculty members' },
  { id: 'requests', title: 'Requests', description: 'View and manage faculty requests' }
])
function handleTabChange(newTabId: string) {
  console.log('Tab changed to:', newTabId)
  currentTab.value = newTabId
}

const requests = ref([
  { id: 1, email: 'faculty1@up.edu', requestedRole: 'College Dean', status: 'pending' },
  { id: 2, email: 'faculty2@up.edu', requestedRole: 'Department Head', status: 'pending' }
])

function approveRequest(id: number) {
  const req = requests.value.find(r => r.id === id)
  if (req) req.status = 'approved'
}

function rejectRequest(id: number) {
  const req = requests.value.find(r => r.id === id)
  if (req) req.status = 'rejected'
}

const currentDescription = computed(() => {
  switch(currentTab.value) {
    case 'blast':
      return 'Compose and send emails to multiple recipients at once. Use this for announcements or important updates.'
    case 'add-edit':
      return 'Add new colleges/departments or edit existing ones. Changes here affect the entire system structure.'
    case 'roles':
      return 'Assign administrative roles to faculty members. Ensure proper permissions are set for each position.'
    case 'requests':
      return 'Review and process requests submitted by faculty members. Approve or deny with comments.'
    default:
      return 'Select a tab to view its functionality'
  }
})

</script>
<style lang="scss" scoped>
.dashboard {  
  display: grid;
  grid-template-columns: 1.35fr 0.9fr;
  grid-template-rows: 0.5fr 1.5fr;
  grid-auto-columns: 1fr;
  gap: 0.5% 0.5%;
  grid-auto-flow: row;
  grid-template-areas:
    "greetings-card greetings-card"
    "roles statistics";
  width: 100%;
  height: 100%;
}

.greetings-card {  
  display: grid;
  border-color: black;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    ".";
  grid-area: greetings-card;
}

.statistics{ 
    grid-area: statistics; 
}

.roles{ 
    grid-area: roles;
}

.add-edit-form, .blast-form, .roles-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.requests-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  th, td {
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    text-align: left;
  }
  th {
    background: #f4f4f4;
  }
  .approved { color: green; font-weight: bold; }
  .rejected { color: red; font-weight: bold; }
  .approve-btn, .reject-btn {
    border: none;
    background: none;
    font-size: 1.2rem;
    cursor: pointer;
    margin-right: 0.5rem;
  }
  .approve-btn { color: green; }
  .reject-btn { color: red; }
}

</style>
