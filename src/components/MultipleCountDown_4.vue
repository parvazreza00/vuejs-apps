<script setup>
import { ref,reactive,computed, mounted, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const title = ref('');
const location = ref('');
const targetDate = ref('');
const events = ref([]);
const interval = null;
const submitted = ref(false);

const errors = reactive({
    title : "",
    location : "",
    targetDate : ""
})

// getItem from localstorage
onMounted(() => {
    const save = localStorage.getItem('conuntDownEvents');
    if(save){
        events.value = JSON.parse(save);
    }
    GlobalTimer();
});

// setitem into localstorage
const saveEvent = () => {
    localStorage.setItem('conuntDownEvents', JSON.stringify(events.value));
}

const createEnvet = () => {

    submitted.value = true;

    events.value.push({
        id: Date.now(),
        title: title.value,
        location: location.value,
        targetDate: targetDate.value,
    })
    toast.success('Event created successfully!');
    saveEvent();

    //reset forom
    title.value = "";
    location.value = "";
    targetDate.value = "";
};





</script>

<template>
  <div class="container mt-5">
    
  </div>
</template>

<style scoped>

</style>