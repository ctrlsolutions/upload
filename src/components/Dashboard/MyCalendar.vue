<template>
  <CardComponent header title="My Calendar" class="calendar-card">
    <div class="calendar-container">
      <div class="calendar-header">
        <button class="month-nav" @click="previousMonth">&lt;</button>
        <h3>{{ currentMonthYear }}</h3>
        <button class="month-nav" @click="nextMonth">&gt;</button>
      </div>
      
      <div class="calendar-grid">
        <div v-for="day in weekDays" :key="day" class="weekday">{{ day }}</div>
        <div
          v-for="date in calendarDays"
          :key="date.day"
          :class="[
            'calendar-day',
            { 'current-month': date.currentMonth },
            { 'today': isToday(date.fullDate) }
          ]"
          @click="selectDate(date.fullDate)"
        >
          {{ date.day }}
          <div v-if="date.hasEvent" class="event-indicator"></div>
        </div>
      </div>
    </div>

    <div v-if="selectedDateEvents.length" class="events-list">
      <h4>Events for {{ selectedDate }}</h4>
      <ul>
        <li v-for="event in selectedDateEvents" :key="event.id">
          {{ event.title }}
        </li>
      </ul>
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
    date: new Date(2024, 11, 20) // December 20, 2024
  }
]);

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
    days.push({
      day,
      currentMonth: true,
      fullDate,
      hasEvent: events.value.some(event => 
        event.date.toDateString() === fullDate.toDateString()
      )
    });
  }
  return days;
});

const selectedDateEvents = computed(() => {
  return events.value.filter(event => 
    event.date.toDateString() === selectedDate.value.toDateString()
  );
});

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
.calendar-card {
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
}

.calendar-container {
  padding: 1rem;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
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
  height: 100%;
  max-height: 100%;
  align-content: start;

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
}

.event-indicator {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #014421;
}

.events-list {
  margin-top: 1rem;
  padding: 1rem;
  border-top: 1px solid #eee;
  
  h4 {
    margin: 0 0 0.5rem 0;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      padding: 0.5rem;
      border-radius: 4px;
      margin-bottom: 0.5rem;
      background-color: #f9f9f9;
    }
  }
}
</style>