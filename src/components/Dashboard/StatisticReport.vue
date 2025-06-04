<template>
  <CardComponent title="NOTIFICATIONS" height="95%" width="100%" :header="true">
    <div class="notification-list">
      <div v-if="notifications.length === 0" class="no-notification">No Notification</div>
      <div v-else v-for="(notification, index) in notifications" :key="index" class="notification-card">
        <p class="message">
          {{ notification.message }}
          <span class="remove-btn" @click="removeNotification(index)">x</span>
        </p>
        <p class="timestamp">{{ notification.timestamp }}</p>
      </div>
    </div>
  </CardComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardComponent from '@/components/Global/CardComponent.vue'

const notifications = ref([
  {
    message: '🔔 A new college has been added!',
    timestamp: 'June 5, 2025 – 10:30 AM',
  },
  {
    message: '✅ You have been reassigned as Faculty.',
    timestamp: 'June 4, 2025 – 9:00 AM',
  },
  {
    message: '⚠️ Deadline for accomplishment report quota is in 3 days.',
    timestamp: 'June 3, 2025 – 5:45 PM',
  },
])

function removeNotification(index: number) {
  notifications.value.splice(index, 1)
}
</script>

<style scoped>
.notification-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
  padding-right: 0.25rem;
  height: 100%;
  min-height: 0;
  /* max-height: 320px; */
  max-height: 70%;
  overflow-y: auto;
}

.notification-card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #d1d5db;
  border-radius: 1rem;
  background-color: white;
  padding: 0.5rem;
}

.no-notification {
  padding: 1rem;
  color: #6b7280;
  font-style: italic;
  text-align: center;
}

.message {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #111827;
  font-size: 0.9rem;
}

.remove-btn {
  cursor: pointer;
  margin-left: 1rem;
  color: #1a0101bb;
  font-weight: bold;
  font-size: 0.9rem;
  user-select: none;
}

.remove-btn:hover {
  color: #b91c1c;
}

.timestamp {
  margin-top: 0.5rem;
  color: #6b7280;
  font-size: 0.75rem;
}
</style>
