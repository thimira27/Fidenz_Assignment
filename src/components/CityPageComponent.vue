<template>
  <!-- Main content container -->
  <div class="container mx-auto py-10">
    <div class="weather-app  p-4 rounded-t-md shadow-md bg-image-com" :class="getBackgroundClass(weatherData.id)">
      <!-- City information -->
      <div class="text-left">
        <button class="text-white text-3xl mr-5" @click="goBack">
          <i class="iconify" data-icon="material-symbols:arrow-back-rounded"></i>
        </button>
      </div>


      <div class="items-center container justify-center">
        <div class="items-center container justify-center flex gap-24 font-semibold">
          <div>
            <div class="flex flex-col items-center text-white py-2 text-3xl">
              <p>{{ weatherData.name }}, {{ weatherData.sys.country }}</p>
            </div>
            <!-- Local time -->
            <div class="container mx-auto flex flex-col items-center text-white text-md">
              <p>{{ formattedTime }}</p>
            </div>
          </div>
          <div class="current-conditions pb-5 flex flex-col items-center text-center">
            <div>
              <h1 class="text-6xl text-white">{{ currentTemperature }}°C</h1>
            </div>
          </div>
        </div>

        <div class="items-center container justify-center pb-5 flex gap-20 mt-4">
          <div class="flex gap-1 text-4xl">
            <div>
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
                <span v-else-if="weatherDescription.includes('moderate rain')">
                  <i class="iconify" data-icon="material-symbols:rainy"></i>
                </span>
              </div>
            </div>
            <div>
              <p class="text-3xl font-semibold text-white">{{ weatherDescription }}</p>
            </div>
          </div>
          <div class="text-center text-white text-xl font-semibold">
            <div>Temp Min: {{ minTemperature }}°C</div>
            <div>Temp Max: {{ maxTemperature }}°C</div>
          </div>
        </div>
      </div>

    </div>

    <!-- Forecast information -->
    <div class="forecast py-4 bg-weather-data text-white rounded-b-md justify-center">
      <ul class="grid grid-cols-3 gap-1 text-center">
        <div>
          <li>Pressure: {{ pressure }}hPa</li>
          <li>Humidity: {{ humidity }}%</li>
          <li>Visibility: {{ visibility }}</li>
        </div>
        <div class="flex flex-col items-center justify-center">
          <i class="iconify" data-icon="material-symbols:north-east-rounded"></i>
          <li class="mt-2">{{ windSpeed }} m/s {{ windDirection }} degree</li>
        </div>
        <div>
          <li>Sunrise: {{ formattedSunrise }}</li>
          <li>Sunset: {{ formattedSunset }}</li>
        </div>
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

// Function to get the background class based on weatherData.id
const getBackgroundClass = (id) => {
  if (id === 1248991 || id === 1850147 || id === 2644210 || id === 2988507 || id === 2147714 || id === 4930956 || id === 1796236 || id === 3143244) {
    return 'bg-image-' + id;
  } else {
    return 'bg-image-5'; // Default background class
  }
};

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

.bg-image-5 {
  background-image: url('../assets/images/4.png');
}
</style>