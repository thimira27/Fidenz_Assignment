<template>
  <div>
    <main class="container mx-auto flex flex-col gap-4 p-4">
      <div class="grid grid-cols-2 gap-4">
        <div v-for="city in cities" :key="city.id"
          class="city-card text-white bg-black hover:bg-gray-800 hover:text-white transition duration-200 ease-in-out cursor-pointer"
          @click="viewCity(city.id)" :class="'bg-image-' + city.id">
          <div class="text-center ">
            <div class="flex">
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
            <div class="text-2xl ">
              {{ city.weather[0].description }}
            </div>
            <!-- <div>City ID: {{ city.id }}</div> -->
          </div>
          <div class="bg-black h-14 mt-4">

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
const API_KEY = 'e049dbfe0f5f7d97b46dd92189196e29';

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
    name: "cityView",
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
  background-image: url('../assets/images/1.png');
}

.bg-image-1796236 {
  background-image: url('../assets/images/2.png');
}

.bg-image-3143244 {
  background-image: url('../assets/images/3.png');
}

/* Define more background images for other city IDs */
</style>
