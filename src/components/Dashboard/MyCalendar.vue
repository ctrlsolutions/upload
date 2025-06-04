<template>
  <CardComponent header title="MY CALENDAR" class="calendar-card">
    <div class="calendar-feature-grid">
      <div class="calendar-events-section">
        <div class="calendar-events-header">
          <h4>Events for {{ selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) }}</h4>
          <button class="calendar-add-event-btn" @click="showEventForm = true">+ Add Event</button>
        </div>
            <div v-if="selectedDateEvents.length === 0" class="calendar-no-events">No events for this day.</div>
            <ul v-else class="calendar-events-list">
              <li v-for="event in selectedDateEvents" :key="event.id" class="calendar-event-item">
              <div class="calendar-event-title-time">
                <span>{{ event.title }}</span>
                <span v-if="event.time" class="calendar-event-time">{{ event.time }}</span>
              </div>
              <div class="calendar-event-desc">{{ event.description }}</div>
            </li>
          </ul>
        <form v-if="showEventForm" class="calendar-event-form" @submit.prevent="saveEvent">
          <input v-model="eventForm.title" placeholder="Title" required />
          <input v-model="eventForm.time" type="time" placeholder="Time (optional)" />
          <textarea v-model="eventForm.description" placeholder="Description (optional)"></textarea>
          <div class="calendar-form-actions">
            <button type="button" @click="showEventForm = false">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
      <!-- Lower: Calendar -->
      <div class="calendar-feature-section">
        <div class="calendar-header">
          <button class="month-nav" @click="previousMonth">&lt;</button>
          <h3>{{ currentMonthYear }}</h3>
          <button class="month-nav" @click="nextMonth">&gt;</button>
        </div>
        <div class="calendar-grid">
          <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
          <div
            v-for="date in calendarDays"
            :key="date.fullDate.toISOString()"
            :class="[
              'calendar-day',
              { 'current-month': date.currentMonth },
              { 'today': isToday(date.fullDate) }
            ]"
            @click="selectDate(date.fullDate)"
          >
            {{ date.day }}
            <div class="event-indicators" v-if="date.eventCount > 0">
              <span class="event-indicator-dot"></span>
            </div>

          </div>
        </div>
      </div>
    </div>
  </CardComponent>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CardComponent from '@/components/Global/CardComponent.vue';
const currentDate = ref(new Date());
const selectedDate = ref(new Date());
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const events = ref([
  {
    id: 1,
    title: 'Deadline of Submission of Accomplishment Report',
    date: new Date(2024, 11, 20),
    description: 'Submit your report before the deadline.',
    time: '10:00',
  }
]);
const showEventForm = ref(false);
const eventForm = ref({ title: '', description: '', time: '' });
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' });
});
const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const days = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = new Date(year, month, day);
    const eventCount = events.value.filter(event => event.date.toDateString() === fullDate.toDateString()).length;
    days.push({
      day,
      currentMonth: true,
      fullDate,
      eventCount
    });
  }
  return days;
});
const selectedDateEvents = computed(() => {
  return events.value.filter(event => 
    event.date.toDateString() === selectedDate.value.toDateString()
  );
});

function saveEvent() {
  if (!eventForm.value.title) return;
  events.value.push({
    id: crypto.randomUUID(),
    title: eventForm.value.title,
    description: eventForm.value.description,
    time: eventForm.value.time,
    date: new Date(selectedDate.value),
  });
  showEventForm.value = false;
  eventForm.value = { title: '', description: '', time: '' };
}
const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};
const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};
const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};
function selectDate(date: Date) {
  selectedDate.value = new Date(date.getTime());
}
</script>

<style lang="scss" scoped>
/* Divide card into 2, upper for events, lower for calendar */
.calendar-feature-grid {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  // overflow: hidden;
}

.calendar-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.calendar-events-section {
  background: #f9f9f9;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

.calendar-events-body {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.calendar-events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.calendar-add-event-btn {
  background: #014421;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  font-size: 1rem;
}
.calendar-events-list {
  overflow-y: auto;
  max-height: 100px;
}
.calendar-event-item {
  background: #fff;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
}
.calendar-event-title-time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}
.calendar-event-time {
  font-size: 0.9em;
  color: #014421;
}
.calendar-event-desc {
  font-size: 0.95em;
  color: #444;
}
.calendar-no-events {
  color: #888;
  font-style: italic;
  text-align: center;
  margin-top: 1rem;
}
.calendar-event-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: hidden;
}
.calendar-event-form input,
.calendar-event-form textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.calendar-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.calendar-form-actions button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.calendar-form-actions button[type="submit"] {
  background-color: #014421;
  color: #fff;
}

.calendar-form-actions button[type="button"] {
  background-color: #ccc;
  color: #000;
}

.calendar-feature-section {
  display: flex;
  flex-direction: column;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.month-nav {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: #f0f0f0;
    border-radius: 5px;
  }
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  align-content: start;
}
.weekday {
  text-align: center;
  font-weight: bold;
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #014421;
}
.calendar-day {
  position: relative;
  padding: 0.5rem;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  &.current-month {
    color: #000;
  }
  &:not(.current-month) {
    color: #ccc;
  }
  &.today {
    background-color: #014421;
    color: white;
  }
}
.event-indicators {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-top: 2px;
}
.event-indicator-dot {
  display: inline-block;
  width: 4px;
  border-radius: 50%;
  background-color: #014421;
}
</style>