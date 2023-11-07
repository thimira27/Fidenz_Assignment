<template>
  <!-- The main container with a flexible column layout and a background -->
  <div class="flex flex-col min-h-screen bg-weather-main main-background">
    <!-- Include the site navigation component -->
    <NavigationComponent />

    <!-- Router view to display different components based on routing -->
    <RouterView class="flex-1" v-slot="{ Component }">
      <!-- Transition effect when switching components -->
      <Transition name="page">
        <!-- Dynamically render the current route's component -->
        <component :is="Component" />
      </Transition>
    </RouterView>

    <!-- Footer section with a black background and white text -->
    <div class="footer bg-black text-white py-6 text-center mt-6">
      <!-- Copyright information -->
      <p>2023 - Fidenz Technologies</p>
    </div>
  </div>
</template>

<script setup>
// Import necessary components and libraries
import { RouterView } from 'vue-router';
import NavigationComponent from "./components/NavigationComponent.vue";
</script>


<style>
.main-background {
  background-image: url('./assets/images/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* Add responsive styles */
@media (max-width: 640px) {
  .main-background {
    background-size: contain;
  }
}

@media (min-width: 1024px) {
  .main-background {
    background-size: cover;
  }
}
</style>