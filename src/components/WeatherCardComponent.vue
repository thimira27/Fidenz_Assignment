<template>
  <!-- Main content container -->
  <div class="container mx-auto">
    <main class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-4">
        <!-- Loop through cities to display city cards -->
        <div class="city-card bg-weather-secondary" v-for="city in cities" :key="city.id">
          <!-- City name -->
          <!-- <h2>{{ city.name }}</h2>? -->
          <!-- Weather description -->
          <p>{{ city.weather[0].description }}</p>
          <!-- Temperature in Celsius -->
          <p>{{ city.main.temp }}°C</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import cityCodes from "../cities.js";
import * as constants from '../ApiConnecter/constants';

const cities = ref([]);
let hasMoreThanSevenCities = false;
const API_KEY = constants.API_KEY;

const fetchWeatherData = async () => {
  try {
    // Fetch weather data for multiple city codes concurrently
    const weatherResponses = await Promise.all(
      cityCodes.map((cityCode) => {
        return axios.get(
          `${constants.WEATHER_API_BASE_URL}/weather?id=${cityCode}&units=metric&appid=${API_KEY}`
        );
      })
    );

    // Process the responses and update the cities array
    cities.value = weatherResponses.map((response) => {
      const { dt, id, name, weather, main } = response.data;
      return { dt, id, name, weather, main };
    });

    // Check if there are more than seven cities
    hasMoreThanSevenCities = cities.value.length > 7;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// On component mount, fetch the weather data and log details for each city
onMounted(async () => {
  await fetchWeatherData();
  cities.value.forEach((city) => {
    console.log(
      `dt: ${city.dt}, id: ${city.id}, name: ${city.name}, description: ${city.weather[0].description}, temp: ${city.main.temp}`
    );
    console.log(hasMoreThanSevenCities);
  });
});
</script>
