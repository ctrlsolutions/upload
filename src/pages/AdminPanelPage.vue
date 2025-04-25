<template>
    <div class="dashboard">
        <div class="greetings-card"><GreetCard/></div>
        <div class="statistics"><StatCard/></div>
        <div class="roles">
            <RoleCard> 
                <College/>
            </RoleCard>
        </div>
    </div>
</template>
<script setup lang="ts">
import GreetCard from '@/components/AdminPanel/GreetCard.vue'
import StatCard from '@/components/AdminPanel/StatCard.vue'
import RoleCard from '@/components/AdminPanel/RoleCard.vue'
import College from '@/components/AdminPanel/College.vue'

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
