<template>
  <!-- The main container with a flexible column layout and a background -->
  <div class="flex flex-col min-h-screen bg-weather-main main-background">
    <!-- Include the site navigation component -->
    <SiteNavigation />

    <!-- Router view to display different components based on routing -->
    <RouterView class="flex-1" v-slot="{ Component }">
      <!-- Transition effect when switching components -->
      <Transition name="page">
        <!-- Dynamically render the current route's component -->
        <component :is="Component" />
      </Transition>
    </RouterView>

    <!-- Footer section with a black background and white text -->
    <div class="footer bg-black text-white pt-3 text-center mt-20 h-20 pr-5">
      <!-- Copyright information -->
      <p>2023 - Fidenz Technologies</p>
    </div>
  </div>
</template>

<script setup>
// Import necessary components and libraries
import { RouterView } from 'vue-router';
import SiteNavigation from "./components/SiteNavigation.vue";
import WeatherCards from './components/WeatherCards.vue';
</script>
