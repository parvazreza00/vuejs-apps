<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const goToHome = () => {
  router.push("/");
};

const title = ref("");
const location = ref("");
const targetDate = ref("");

const isStarted = ref(false);
const timeLeft = ref(0);
let timer = null;

// Start countdown
const startCountdown = () => {
  if (!targetDate.value) return;

  const target = new Date(targetDate.value).getTime();
  const now = new Date().getTime();

  timeLeft.value = target - now;

  if (timeLeft.value <= 0) return;

  isStarted.value = true;

  timer = setInterval(() => {
    const now = new Date().getTime();
    timeLeft.value = target - now;

    if (timeLeft.value <= 0) {
      clearInterval(timer);
      timeLeft.value = 0;
    }
  }, 1000);
};

// format countdown time
const days = computed(() => Math.floor(timeLeft.value / (1000 * 60 * 60 * 24)));
const hours = computed(() =>
  Math.floor((timeLeft.value / (1000 * 60 * 60)) % 24),
);
const minutes = computed(() => Math.floor((timeLeft.value / (1000 * 60)) % 60));
const seconds = computed(() => Math.floor((timeLeft.value / 1000) % 60));

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="mt-5 ml-5">
    <button
      @click="goToHome"
      class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
    >
      Back to Home
    </button>
  </div>
  <div class="container mt-10 text-center">
    <!-- form section -->
    <div
      v-if="!isStarted"
      class="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow"
    >
      <input
        v-model="title"
        type="text"
        placeholder="Enter Event title"
        class="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        v-model="location"
        type="text"
        placeholder="Enter Event Location"
        class="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <input
        v-model="targetDate"
        type="datetime-local"
        class="w-full p-2 mb-4 border border-gray-300 rounded"
      />

      <button
        @click="startCountdown"
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Start Countdown
      </button>
    </div>

    <!-- countdown display -->
    <div v-else class="bg-gray-100 max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <p class="text-gray-600 mb-6">{{ location }}</p>

      <div
        v-if="timeLeft > 0"
        class="flex justify-center gap-6 text-2xl font-bold"
      >
        <div>
          <span class="block text-4xl">{{ days }}</span>
          <span class="text-sm text-gray-500">Days</span>
        </div>
        <div>
          <span class="block text-4xl">{{ hours }}</span>
          <span class="text-sm text-gray-500">Hours</span>
        </div>
        <div>
          <span class="block text-4xl">{{ minutes }}</span>
          <span class="text-sm text-gray-500">Minutes</span>
        </div>
        <div>
          <span class="block text-4xl">{{ seconds }}</span>
          <span class="text-sm text-gray-500">Seconds</span>
        </div>
      </div>
      <div v-else class="text-2xl font-bold text-green-500">
        Event Has Started!
      </div>

       <!-- Back to Home button -->
      <button
        @click="goToHome"
        class="mt-6 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>

<style scoped></style>
