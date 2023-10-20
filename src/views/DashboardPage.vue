<template>
  <div>
    <div class="flex justify-center py-4">
      <input class=" rounded-l pl-5 p-2 w-80 h-10 bg-black" type="text" placeholder="Enter a City" />
      <button class="bg-indigo-900 text-white font-bold rounded p-2">
        Add City
      </button>
    </div>
    <main class="container mx-auto flex flex-col gap-4 p-4">
      <div class="grid grid-cols-2 gap-4">
        <div v-for="city in cities" :key="city.id"
          class="city-card text-white bg-image-com rounded-b-md rounded-t-md  hover:text-white transition duration-200 ease-in-out cursor-pointer"
          @click="viewCity(city.id)" :class="'bg-image-' + city.id">
          <div class="text-center ">
            <!-- <p>{{ city }}</p> -->
            <div class="flex justify-center">
              <div class="flex-column justify-center items-center p-4">
                <div class="p-1">
                  <h1 class="text-3xl font-bold">{{ city.name }}</h1>
                </div>
                <div>
                  <p class="text-sm">{{ city.formattedTime }}</p>
                </div>
              </div>
              <div class="pr-4 pt-3.5">
                <h1 class="text-5xl ml-2 p-4">{{ city.main.temp }}°C</h1>
              </div>
            </div>
            <div class="flex gap-3 text-center items-center justify-center">
              <div class="text-4xl">
                <div class="text-center">
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
              <div class="text-2xl ">
                {{ city.weather[0].description }}
              </div>
            </div>
            <!-- <div>City ID: {{ city.id }}</div> -->
          </div>
          <div class="bg-black h-14 mt-4 mb-2">
            <div class="forecast py-4 bg-weather-data text-white rounded-b-md p-1">
              <ul class="grid grid-cols-4 gap-1 text-xs text-center">
                <li>Temp Min: {{ city.main.temp_min }}°C</li>
                <li>Temp Max: {{ city.main.temp_max }}°C</li>
                <li>Pressure: {{ city.main.pressure }}hPa</li>
                <li>Humidity: {{ city.main.humidity }}%</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import cityIds from "../cities.js";

const router = useRouter();
const cities = ref([]);
const API_KEY = import.meta.env.VITE_APP_API_KEY;


const fetchCityData = async () => {
  try {
    // Fetch city data for multiple city IDs concurrently
    const cityResponses = await Promise.all(
      cityIds.map(cityId => {
        return axios.get(
          `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${API_KEY}`
        );
      })
    );

    // Process the responses and update the cities array
    cities.value = cityResponses.map(response => {
      const { dt, id, name, weather, main, sys } = response.data;

      // Calculate local time
      const localTime = new Date(dt * 1000 + new Date().getTimezoneOffset() * 60000);

      // Format the time in a specific way
      const formattedTime = localTime.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }) + `, ${localTime.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
      })}`;

      return { dt, id, name, weather, main, sys, formattedTime };
    });

  } catch (error) {
    console.error('Error fetching city data:', error);
  }
};

// Function to navigate to a city's detailed view
const viewCity = (cityId) => {
  router.push({
    name: "LoadCityPage",
    params: { city_id: cityId },
    query: {
      id: cityId,
      preview: true,
    }
  });
};

// Fetch city data on component mount
onMounted(() => {
  fetchCityData();
});

</script>



<style lang="scss">
.bg-image-com {
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
}

.city-card:hover {
  border: 3px solid rgb(138, 191, 231);
}

/* Define background images for each city ID */
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
