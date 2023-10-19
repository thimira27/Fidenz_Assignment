<template>
    <!-- Main content container -->
    <div class="container mx-auto py-10">
      <div class="weather-app bg-weather-city p-4 rounded-t-md shadow-md">
        <!-- City information -->
        <div class="container mx-auto flex flex-col items-center gap-4 text-white py-2 text-2xl">
          <p>{{ cityInfo }}</p>
        </div>
  
        <!-- Local time -->
        <div class="container mx-auto flex flex-col items-center gap-4 text-white text-md">
          <p>{{ formattedTime }}</p>
        </div>
  
        <!-- Horizontal separator line -->
        <div class="current-conditions px-60">
          <hr class="border border-white border-opacity-20 w-full" />
        </div>
  
        <div class="body">
          <!-- Current weather conditions -->
          <div class="current-conditions px-20 pb-5 flex items-center">
            <!-- Weather icon -->
            <img :src="iconUrl"
              class="city-icon bg-blue-400 hover:bg-opacity-50 transition duration-200 ease-in-out hover:backdrop-blur-blur w-32 h-32 rounded-lg" />
            <!-- Vertical separator line -->
            <div class="vertical-line"></div>
            <!-- Weather description -->
            <p class="text-xl">{{ weatherDescription }}</p>
            <!-- Vertical separator line -->
            <div class="vertical-line"></div>
            <!-- Current temperature -->
            <p class="text-4xl text-white">{{ currentTemperature }}°C</p>
          </div>
          <!-- Horizontal separator line -->
          <div class="current-conditions px-20">
            <hr class="border border-white border-opacity-20 border-2 w-full" />
          </div>
        </div>
      </div>
  
      <!-- Forecast information -->
      <div class="forecast py-4 bg-weather-data text-white rounded-b-md">
        <ul class="grid grid-cols-4 gap-1">
          <li>Temp Min: {{ minTemperature }}°C</li>
          <li>Temp Max: {{ maxTemperature }}°C</li>
          <li>Pressure: {{ pressure }}hPa</li>
          <li>Humidity: {{ humidity }}%</li>
          <li>Visibility: {{ visibility }}</li>
          <li>Wind: {{ windSpeed }}m/s {{ windDirection }}°</li>
          <li>Sunrise: {{ formattedSunrise }}</li>
          <li>Sunset: {{ formattedSunset }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  
  // Current time and formatted times
  const currentTime = ref(new Date().toLocaleTimeString());
  const formattedTime = ref('');
  const formattedSunrise = ref('');
  const formattedSunset = ref('');
  
  const API_KEY = 'e049dbfe0f5f7d97b46dd92189196e29';
  const route = useRoute();
  
  // Extract cityId and cityInfo from the route
  const cityId = route.query.id;
  const cityInfo = ref(`${route.params.cityName}, ${route.params.country}`);
  
  // Function to fetch weather data
  const getWeatherData = async () => {
    try {
      // Make an API request to fetch weather data for the city
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${API_KEY}`
      );
  
      // Process the weather data and update the time values
      const weatherData = response.data;
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const localTime = new Date(weatherData.dt * 1000 + localOffset);
      const localTimeSunrise = new Date(weatherData.sys.sunrise * 1000 + localOffset);
      const localTimeSunset = new Date(weatherData.sys.sunset * 1000 + localOffset);
  
      const istFormatter = new Intl.DateTimeFormat('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
  
      formattedTime.value = istFormatter.format(localTime);
      formattedTime.value += `, ${localTime.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      })}`;
  
      formattedSunrise.value = istFormatter.format(localTimeSunrise);
      formattedSunset.value = istFormatter.format(localTimeSunset);
  
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  
  // Fetch weather data and icon URL
  const weatherData = await getWeatherData();
  const iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  
  // Weather data variables
  const currentTemperature = ref(weatherData.main.temp);
  const weatherDescription = ref(weatherData.weather[0].description);
  const minTemperature = ref(weatherData.main.temp_min);
  const maxTemperature = ref(weatherData.main.temp_max);
  const pressure = ref(weatherData.main.pressure);
  const humidity = ref(weatherData.main.humidity);
  const visibility = ref(weatherData.visibility);
  const windSpeed = ref(weatherData.wind.speed);
  const windDirection = ref(weatherData.wind.deg);
  </script>
  