import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "../views/DashboardPage.vue";
import LoadCityPage from "../views/LoadCityPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: DashboardPage,
    },
    {
      path: "/weather/:city_id",
      name: "LoadCityPage",
      component: LoadCityPage,
    },
  ],
});

export default router;
