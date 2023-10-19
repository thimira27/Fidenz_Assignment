<template>
    <!-- Header with a sticky top and background color -->
    <header class="sticky top-0 text-5xl mb-5">
        <div class="container mx-auto flex flex-col items-center gap-4 text-white py-6">
            <div>
                <!-- Create a link to the 'home' route using RouterLink -->
                <RouterLink :to="{ name: 'home' }">
                    <!-- Display a sun icon and the text 'Weather App' -->
                    <div class="flex gap-2 mt-4">
                        <span class="iconify" data-icon="material-symbols:partly-cloudy-day-rounded" data-inline="false"></span>
                        <h4>Weather App</h4>
                    </div>
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'; // Import the RouterLink component
</script>
