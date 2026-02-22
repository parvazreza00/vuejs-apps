<script setup>
</script>

<template>
  <div class="container mx-auto mt-20">
    <h1 class="text-3xl font-bold mb-6">Welcome to Home Page</h1>

    <router-link
      to="/counter"
      class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Go to Counter Page
    </router-link>

    <router-link
      to="/countdown"
      class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Go to CountDown Page
    </router-link>
  </div>
</template>