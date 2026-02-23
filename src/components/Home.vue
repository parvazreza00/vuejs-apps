<script setup>
</script>

<template>
  <div class="container mx-auto mt-20">
    <h1 class="text-3xl font-bold mb-6">Welcome to Home Page</h1>

    <router-link
      to="/counter"
      class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Counter Page
    </router-link>

    <router-link
      to="/countdown"
      class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      CountDown Page
    </router-link>

    <router-link
      to="/multiple-countdown"
      class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      Multiple CountDown Page
    </router-link>

    
  </div>
</template>