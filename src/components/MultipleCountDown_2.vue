<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToHome = () => {
  router.push("/");
};

const title = ref("");
const location = ref("");
const targetDate = ref("");

const errors = ref({
  title: "",
  targetDate: "",
});

const events = ref([]);
let interval = null;

onMounted(() => {
  const save = localStorage.getItem("countdownEvents");
  if (save) {
    events.value = JSON.parse(save);
  }

  GlobalTimer();

});

const saveEvents = () => {
  localStorage.setItem("countdownEvents", JSON.stringify(events.value));
};

const createEvent = () => {
  errors.value.title = "";
  errors.value.targetDate = "";

  if (!title.value) {
    errors.title.value = "Title is required!";
  
  }
  if (!targetDate.value) {
    errors.targetDate.value = "Target Date is required!";
  
  }
  
   if (errors.value.title || errors.value.targetDate) return;

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

const deleteEvent = (id) => {
  events.value = events.value.filter((event) => event.id !== id);
  saveEvents();
};

const GlobalTimer = () => {
  interval = setInterval(() => {
    events.value = events.value.map((event) => {
      const target = new Date(event.target).getTime();
      const now = new Date().getTime();
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
  <div class="container mx-auto mt-5 grid grid-cols-2 gap-8 items-start">
    <!-- <div>
      <button
        @click="goToHome"
        class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Back to Home
      </button>
    </div> -->

    <div>

      <span v-if="errorMessage" class="text-red-500 text-sm">
        {{ errorMessage }}  
      </span>
      <input
        v-model="title"
        type="text"
        placeholder="Event Title"
        class="w-full p-2 mb-3 border rounded"
      />
      

      <input
        v-model="location"
        type="text"
        placeholder="Event Location (optional)"
        class="w-full p-2 mb-3 border rounded"
      />

       <span v-if="errorMessage" class="text-red-500 text-sm">
        {{ errorMessage }}  
      </span>
      <input
        v-model="targetDate"  
          type="datetime-local"
          class="w-full p-2 mb-4 border rounded"
      />
     
      <button
        @click="createEvent"
        class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"  
      >Create Event</button>
    </div>

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
