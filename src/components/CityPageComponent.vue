<template>
  <div class="container mx-auto py-10">
    <div class="weather-app p-4 rounded-t-md shadow-md bg-image-com" :class="getBackgroundClass(weatherData.id)">
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
              <div>
                <img :src="getWeatherIconUrl(weatherData.weather[0].icon)" alt="Weather Icon" />
              </div>
              <div class="text-center text-white">
                <i :class="getWeatherIconClass(weatherDescription)"></i>
              </div>
            </div>
            <div>
              <p class="text-3xl font-semibold text-white">
                {{ weatherDescription }}
              </p>
            </div>
          </div>
          <div class="text-center text-white text-xl font-semibold">
            <div>Temp Min: {{ minTemperature }}°C</div>
            <div>Temp Max: {{ maxTemperature }}°C</div>
          </div>
        </div>
      </div>
    </div>

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
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import * as constants from '../ApiConnecter/constants';

const { API_KEY, WEATHER_ICON_URL, DEFAULT_BACKGROUND_CLASS, WEATHER_ICONS } = constants;

// const currentTime = ref(new Date().toLocaleTimeString());
const formattedTime = ref("");
const formattedSunrise = ref("");
const formattedSunset = ref("");

const route = useRoute();
const router = useRouter();
const cityId = route.query.id;
const goBack = () => {
  router.back();
};

const getWeatherData = async () => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${API_KEY}`
    );

    const weatherData = response.data;
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(weatherData.dt * 1000 + localOffset);
    const localTimeSunrise = new Date(
      weatherData.sys.sunrise * 1000 + localOffset
    );
    const localTimeSunset = new Date(
      weatherData.sys.sunset * 1000 + localOffset
    );

    const istFormatter = new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    formattedTime.value = istFormatter.format(localTime);
    formattedTime.value += `, ${localTime.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    })}`;

    formattedSunrise.value = istFormatter.format(localTimeSunrise);
    formattedSunset.value = istFormatter.format(localTimeSunset);

    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const weatherData = await getWeatherData();

const currentTemperature = ref(weatherData.main.temp);
const weatherDescription = ref(weatherData.weather[0].description);
const minTemperature = ref(weatherData.main.temp_min);
const maxTemperature = ref(weatherData.main.temp_max);
const pressure = ref(weatherData.main.pressure);
const humidity = ref(weatherData.main.humidity);
const visibility = ref(weatherData.visibility);
const windSpeed = ref(weatherData.wind.speed);
const windDirection = ref(weatherData.wind.deg);

const getBackgroundClass = (id) => {
  if (
    id === 1248991 ||
    id === 1850147 ||
    id === 2644210 ||
    id === 2988507 ||
    id === 2147714 ||
    id === 4930956 ||
    id === 1796236 ||
    id === 3143244
  ) {
    return "bg-image-" + id;
  } else {
    return DEFAULT_BACKGROUND_CLASS;
  }
};

const getWeatherIconUrl = (icon) => {
  return `${WEATHER_ICON_URL}${icon}.png`;
};

const getWeatherIconClass = (description) => {
  if (description.includes('clear sky')) {
    return WEATHER_ICONS.sunny;
  } else if (description.includes('cloud')) {
    return WEATHER_ICONS.cloudy;
  } else if (description.includes('Drizzle')) {
    return WEATHER_ICONS.rainy;
  } else if (description.includes('light rain')) {
    return WEATHER_ICONS.snowy;
  } else if (description.includes('moderate rain')) {
    return WEATHER_ICONS.rainy;
  } else {
    return DEFAULT_WEATHER_ICON;
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
  background-image: url("../assets/images/1.png");
}

.bg-image-1850147 {
  background-image: url("../assets/images/2.png");
}

.bg-image-2644210 {
  background-image: url("../assets/images/3.png");
}

.bg-image-2988507 {
  background-image: url("../assets/images/4.png");
}

.bg-image-2147714 {
  background-image: url("../assets/images/5.png");
}

.bg-image-4930956 {
  background-image: url("../assets/images/6.png");
}

.bg-image-1796236 {
  background-image: url("../assets/images/2.png");
}

.bg-image-3143244 {
  background-image: url("../assets/images/3.png");
}

.bg-image-5 {
  background-image: url("../assets/images/4.png");
}
</style>
