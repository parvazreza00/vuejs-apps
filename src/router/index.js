import { createRouter, createWebHistory } from "vue-router"
import Counter from "../components/Counter.vue"
import Home from "../components/Home.vue"
import CountDown from "../components/CountDown.vue"
import MultipleCountDown from "../components/MultipleCountDown.vue"

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
  },
  {
    path: "/multiple-countdown",
    name: "MultipleCountDown",
    component: MultipleCountDown
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router