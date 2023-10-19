import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/weather/:city_id',
      name: 'cityView',
      component: CityView
    }
  ]
})

export default router
