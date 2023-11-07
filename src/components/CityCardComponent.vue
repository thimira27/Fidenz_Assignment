<template>
    <!-- City Card Container -->
    <div class="city-card text-white bg-image-com rounded-b-md rounded-t-md hover:text-white transition duration-200 ease-in-out cursor-pointer"
        @click="viewCity(city.id)" :class="'bg-image-' + city.id">
        <div class="text-center">
            <!-- City Name and Time -->
            <div class="flex justify-center">
                <div class="flex-column justify-center items-center p-4">
                    <h1 class="text-3xl font-bold">{{ city.name }}</h1> <!-- Display city name -->
                    <p class="text-sm">{{ city.formattedTime }}</p> <!-- Display local time -->
                </div>
                <div class="pr-4 pt-3.5">
                    <h1 class="text-5xl ml-2 p-4">{{ city.main.temp }}°C</h1> <!-- Display temperature -->
                </div>
            </div>
            <!-- Weather Icon and Description -->
            <div class="flex gap-3 text-center items-center justify-center">
                <div class="text-4xl">
                    <div class="text-center">
                        <!-- Display weather icon based on description -->
                        <span v-if="city.weather[0].description.includes('clear sky')">
                            <i class="iconify" data-icon="material-symbols:wb-sunny"></i>
                        </span>
                        <span v-else-if="city.weather[0].description.includes('cloud')">
                            <i class="iconify" data-icon="material-symbols:cloud"></i>
                        </span>
                        <span v-else-if="city.weather[0].description.includes('Drizzle')">
                            <i class="iconify" data-icon="material-symbols:rainy"></i>
                        </span>
                        <span v-else-if="city.weather[0].description.includes('light rain')">
                            <i class="iconify" data-icon="material-symbols:weather-snowy"></i>
                        </span>
                        <span v-else-if="city.weather[0].description.includes('moderate rain')">
                            <i class="iconify" data-icon="material-symbols:rainy"></i>
                        </span>
                    </div>
                </div>
                <div class="text-2xl">
                    {{ city.weather[0].description }} <!-- Display weather description -->
                </div>
            </div>
        </div>
        <!-- Weather Details -->
        <div class="bg-black h-14 mt-4 mb-2">
            <div class="forecast py-4 bg-weather-data text-white rounded-b-md p-1">
                <!-- Display additional weather details -->
                <ul class="grid grid-cols-4 gap-1 text-xs text-center">
                    <li>Temp Min: {{ city.main.temp_min }}°C</li>
                    <li>Temp Max: {{ city.main.temp_max }}°C</li>
                    <li>Pressure: {{ city.main.pressure }}hPa</li>
                    <li>Humidity: {{ city.main.humidity }}%</li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        city: Object, // Receive city data as a prop
    },
    methods: {
        viewCity() {
            this.$emit("viewCity", this.city.id); // Emit an event to view the city details
        },
    },
};
</script>
  