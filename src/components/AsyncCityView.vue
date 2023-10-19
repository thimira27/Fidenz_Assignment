<template>
  <!-- Main content container -->
  <div class="container mx-auto py-10">
    <div class="weather-app  p-4 rounded-t-md shadow-md bg-image-com" :class="'bg-image-' + weatherData.id">
      <!-- City information -->
      <div class="text-left">
        <button class="text-white text-3xl mr-5" @click="goBack">
          <i class="iconify" data-icon="material-symbols:arrow-back-rounded"></i>
        </button>
      </div>
      <div class="container mx-auto flex flex-col items-center gap-4 text-white py-2 text-3xl">
        <p>{{ weatherData.name }}, {{ weatherData.sys.country }}</p>
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
        <div class="current-conditions px-20 pb-5 flex-column items-center text-center">
          <div>
            <p class="text-xl font-bold text-white">{{ weatherDescription }}</p>
          </div>
          <div class="flex gap-4 justify-center mt-4">
            <div class="text-8xl">
              <div class="text-center text-white">
                <span v-if="weatherDescription.includes('clear sky')">
                  <i class="iconify" data-icon="material-symbols:wb-sunny"></i>
                </span>
                <span v-else-if="weatherDescription.includes('cloud')">
                  <i class="iconify" data-icon="material-symbols:cloud"></i>
                </span>
                <span v-else-if="weatherDescription.includes('Drizzle')">
                  <i class="iconify" data-icon="material-symbols:rainy"></i>
                </span>
                <span v-else-if="weatherDescription.includes('light rain')">
                  <i class="iconify" data-icon="material-symbols:weather-snowy"></i>
                </span>
              </div>
            </div>
            <div class="mt-2 ml-4 mr-4 h-25 w-1 bg-white mx-4"></div>
            <div>
              <h1 class="text-8xl text-white">{{ currentTemperature }}°C</h1>
            </div>
          </div>
        </div>


        <!-- Horizontal separator line -->
        <div class="current-conditions px-20">
          <hr class="border border-white border-opacity-20 w-full" />
        </div>
      </div>
    </div>

    <!-- Forecast information -->
    <div class="forecast py-4 bg-weather-data text-white rounded-b-md">
      <ul class="grid grid-cols-4 gap-1 text-center">
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
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';


// Current time and formatted times
const currentTime = ref(new Date().toLocaleTimeString());
const formattedTime = ref('');
const formattedSunrise = ref('');
const formattedSunset = ref('');

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const route = useRoute();
const router = useRouter();

// Extract cityId and cityInfo from the route
const cityId = route.query.id;
const cityInfo = ref(`${route.params.cityName}, ${route.params.country}`);

const goBack = () => {
  router.back();
};

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


<style lang="scss">
/* Define background images for each city ID */

.bg-image-com {
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}

.bg-image-1248991 {
  background-image: url('../assets/images/1.png');

}

.bg-image-1850147 {
  background-image: url('../assets/images/2.png');
}

.bg-image-2644210 {
  background-image: url('../assets/images/3.png');
}

.bg-image-2988507 {
  background-image: url('../assets/images/4.png');
}

.bg-image-2147714 {
  background-image: url('../assets/images/5.png');
}

.bg-image-4930956 {
  background-image: url('../assets/images/6.png');
}

.bg-image-1796236 {
  background-image: url('../assets/images/2.png');
}

.bg-image-3143244 {
  background-image: url('../assets/images/3.png');
}

/* Define more background images for other city IDs */
</style>