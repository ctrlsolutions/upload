<template>
    <div class="dashboard">
        <div class="greetings-card"><GreetCard/></div>
        <div class="statistics"><StatCard/></div>
        <FolderComponent :tabs="myTabs" :initialActiveTabId="currentTab" @update:activeTabId="handleTabChange" 
            height="100%"
            width="100%"
            tab-font-size="1rem"
        >
          <template v-slot="{ activeTabId }">
            <div v-if="activeTabId === 'email'">Add Role Content...</div>
            <div v-if="activeTabId === 'assign'" class="roles">
              <RoleCard> 
                <FolderComponent :tabs="myTabs2" :initialActiveTabId="currentTab2" @update:activeTabId2="handleTabChange" 
                    height="100%"
                    width="100%"
                    tab-font-size="1rem"
                >
                  <template v-slot="{ activeTabId2 }">
                    <div v-if="activeTabId2 === 'roles'"><College/></div>
                  </template>
                </FolderComponent>
              </RoleCard>
            </div>
            <div v-if="activeTabId === 'add'">Add Role Content...</div>
            <div v-if="activeTabId === 'edit'">Add Role Content...</div>
            <div v-if="activeTabId === 'request'">Add Role Content...</div>
          </template>
        </FolderComponent>
    </div>
</template>
<script setup lang="ts">
import GreetCard from '@/components/AdminPanel/GreetCard.vue'
import StatCard from '@/components/AdminPanel/StatCard.vue'
import RoleCard from '@/components/AdminPanel/RoleCard.vue'
import College from '@/components/AdminPanel/College.vue'
import FolderComponent from '@/components/Global/FolderComponent.vue'
import { ref } from 'vue'

const myTabs = ref([
        { id: 'email', title: 'Email Blast' },
        { id: 'assign', title: 'Assign' },
        { id: 'add', title: 'Add' },
        { id: 'edit', title: 'Edit' },
        { id: 'request', title: 'Request' },
    ]);

    const currentTab = ref('email');

    function handleTabChange(newTabId: string) {
        console.log("Tab changed to:", newTabId);
        currentTab.value = newTabId;
    }

    const myTabs2 = ref([
        { id: 'roles', title: 'Roles' },
    ]);

    const currentTab2 = ref('roles');

    function handleTabChange(newTabId2: string) {
        console.log("Tab changed to:", newTabId2);
        currentTab2.value = newTabId2;
    }
</script>
<style lang="scss" scoped>
.dashboard {  
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  grid-template-rows: 0.5fr 1.5fr;
  grid-auto-columns: 1fr;
  gap: 0.5% 0.5%;
  grid-auto-flow: row;
  grid-template-areas:
    "greetings-card greetings-card"
    "statistics roles";
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

</style>
