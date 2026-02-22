import { createRouter, createWebHistory } from "vue-router"
import Counter from "../components/Counter.vue"
import Home from "../components/Home.vue"
import CountDown from "../components/CountDown.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/counter",
    name: "Counter",
    component: Counter
  },
  {
    path: "/countdown",
    name: "CountDown",
    component: CountDown
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router