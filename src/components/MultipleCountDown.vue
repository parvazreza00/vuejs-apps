<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const title = ref("");
const location = ref("");
const targetDate = ref("");

const errorMessage = ref("");

const events = ref([]);
let interval = null;

// Load events from localStorage
onMounted(() => {
  const saved = localStorage.getItem("countdownEvents");
  if (saved) {
    events.value = JSON.parse(saved);
  }

  startGlobalTimer();
});

// Save to localStorage
const saveEvents = () => {
  localStorage.setItem("countdownEvents", JSON.stringify(events.value));
};

// Create new event
const createEvent = () => {
  if (!title.value || !targetDate.value) {
    errorMessage.value = "Title and Target Date are required!";
    return;
  }

  events.value.push({
    id: Date.now(),
    title: title.value,
    location: location.value,
    target: targetDate.value,
  });

  saveEvents();

  // reset form
  title.value = "";
  location.value = "";
  targetDate.value = "";
  errorMessage.value = "";
};

// Delete event
const deleteEvent = (id) => {
  events.value = events.value.filter((event) => event.id !== id);
  saveEvents();
};

// Global timer updates every second
const startGlobalTimer = () => {
  interval = setInterval(() => {
    events.value = events.value.map((event) => {
      const now = new Date().getTime();
      const target = new Date(event.target).getTime();
      const diff = target - now;

      return {
        ...event,
        timeLeft: diff > 0 ? diff : 0,
      };
    });
  }, 1000);
};

onUnmounted(() => {
  clearInterval(interval);
});

// Format time
const formatTime = (ms, type) => {
  if (!ms) return 0;

  if (type === "days") return Math.floor(ms / (1000 * 60 * 60 * 24));
  if (type === "hours") return Math.floor((ms / (1000 * 60 * 60)) % 24);
  if (type === "minutes") return Math.floor((ms / (1000 * 60)) % 60);
  if (type === "seconds") return Math.floor((ms / 1000) % 60);
};
</script>

<template>
  <div class="container mx-auto mt-10 grid grid-cols-2 gap-8 items-start">
    <!-- LEFT SIDE: FORM -->
    <div class="bg-gray-100 p-6 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Create Countdown Event</h2>

      <input
        v-model="title"
        type="text"
        placeholder="Event Title"
        class="w-full p-2 mb-3 border rounded"
      />
      <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
        {{ errorMessage }}
      </p>

      <input
        v-model="location"
        type="text"
        placeholder="Event Location"
        class="w-full p-2 mb-3 border rounded"
      />

      <input
        v-model="targetDate"
        type="datetime-local"
        class="w-full p-2 mb-4 border rounded"
      />
      <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
        {{ errorMessage }}
      </p>

      <button
        @click="createEvent"
        class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Event
      </button>
    </div>

    <!-- RIGHT SIDE: EVENTS LIST -->
    <div>
      <h2 class="text-xl font-bold mb-4">Your Events</h2>

      <div v-if="events.length === 0" class="text-gray-500">
        No events created yet.
      </div>

      <div
        v-for="event in events"
        :key="event.id"
        class="bg-white p-4 mb-4 rounded shadow"
      >
        <h3 class="font-bold text-lg">Name : {{ event.title }}</h3>
        <p class="text-sm text-gray-500 mb-3">
          Location : {{ event.location }}
        </p>

        <div class="flex gap-4 text-center font-semibold">
          Due Time :
          <div>
            <div class="text-xl">
              {{ formatTime(event.timeLeft, "days") }}
            </div>
            <span class="text-xs">Days</span>
          </div>

          <div>
            <div class="text-xl">
              {{ formatTime(event.timeLeft, "hours") }}
            </div>
            <span class="text-xs">Hours</span>
          </div>

          <div>
            <div class="text-xl">
              {{ formatTime(event.timeLeft, "minutes") }}
            </div>
            <span class="text-xs">Minutes</span>
          </div>

          <div>
            <div class="text-xl">
              {{ formatTime(event.timeLeft, "seconds") }}
            </div>
            <span class="text-xs">Seconds</span>
          </div>
        </div>

        <div class="text-end mt-2">
          <button
            @click="deleteEvent(event.id)"
            class="mt-3 text-red-500 text-sm hover:bg-red-200 bg-red-100 px-2 py-1 rounded text-decoration-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
