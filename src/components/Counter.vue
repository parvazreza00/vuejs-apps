<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const count = ref(0);
const toast = useToast();
const router = useRouter();

const goToHome = () => {
  router.push("/");
};

function increment() {
  count.value++;
}

function decrement() {
  if (count.value === 0) {
    toast.warning("Counter value do not have any negative value!");
    return;
  } else {
    count.value--;
  }
}

function reset() {
  count.value = 0;
  toast.info("Counter has been reset!");
}
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
  <div class="text-center mt-20">
    <h1 class="text-3xl font-bold mb-6">Counter: {{ count }}</h1>

    <div class="space-x-4">
      <button
        @click="increment"
        class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Increment
      </button>
      <button
        @click="decrement"
        class="px-6 py-3"
        :class="
          count === 0
            ? 'bg-red-400 text-white rounded-lg cursor-not-allowed'
            : 'bg-red-500 text-white rounded-lg hover:bg-red-600'
        "
      >
        Decrement
      </button>
      <button
        @click="reset"
        class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Reset
      </button>
    </div>
  </div>
</template>
