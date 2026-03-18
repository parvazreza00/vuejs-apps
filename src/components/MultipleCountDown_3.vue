<script setup>
import { ref, reactive, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const title = ref('')   
const location = ref('')
const targetDate = ref('')

const errors = reactive({
  title: '',
  location: '',
  targetDate: '',
})

const events = ref([])
let interval = null





</script>

<template>
  <div class="container mt-5 max-auto grid grid-cols-2 gap-8 items-start">
    
    <div>
        <h2>Create Your Countdown Event</h2>

        <input type="text" 
        v-model="title"
        placeholder="Enter Event Name"
        class="w-full p-2 mb-3 border rounded" />

        <input type="text"
        v-model="location"
        placeholder="Enter Event Location"
        class="w-full p-2 mb-3 border rounded" />

        <input type="datetime-local"
        v-model="targetDate"
        class="w-full p-2 mb-3 border rounded" />

        <button @click="createEvent" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create Event            
        </button>

    </div>
    
  </div>
</template>

<style scoped>

</style>