<template>
  <CardComponent title="NOTIFICATIONS" height="100%" width="100%" :header="true">
    <div class="notification-list">
      <div v-if="notifications.length === 0" class="no-notification">
        No Notification
      </div>
      <div
        v-else
        v-for="(notification, index) in notifications"
        :key="index"
        class="notification-card"
      >
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
import { ref } from "vue";
import CardComponent from "@/components/Global/CardComponent.vue";

const notifications = ref([
  {
    message: "🔔 Room 301 is scheduled for maintenance on June 10, 2025.",
    timestamp: "June 5, 2025 – 10:30 AM",
  },
  {
    message: "📢 New class schedule uploaded for AY 2025–2026.",
    timestamp: "June 4, 2025 – 3:15 PM",
  },
  {
    message: "✅ Your reservation for Room 204 was approved.",
    timestamp: "June 4, 2025 – 9:00 AM",
  },
  {
    message: "⚠️ Room 107 has been reported for AC malfunction.",
    timestamp: "June 3, 2025 – 5:45 PM",
  },
  {
    message: "📌 Seminar Room 2 is unavailable from June 8 to June 9.",
    timestamp: "June 3, 2025 – 1:20 PM",
  },
]);

function removeNotification(index: number) {
  notifications.value.splice(index, 1);
}
</script>

<style scoped>
.notification-list {
  max-height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-right: 0.25rem;
  box-sizing: border-box;
}

.notification-card {
  background-color: white;
  border: 1px solid #d1d5db; 
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.no-notification {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  padding: 1rem;
}

.message {
  font-size: 0.9rem;
  color: #111827;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remove-btn {
  color: #1a0101bb;
  cursor: pointer;
  font-weight: bold;
  margin-left: 1rem;
  user-select: none;
  font-size: 0.9rem;
}

.remove-btn:hover {
  color: #b91c1c;
}

.timestamp {
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
}
</style>
