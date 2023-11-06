<template>
  <div>
    <div class="flex justify-center py-4">
      <input class="rounded-l pl-5 p-2 w-80 h-10 bg-black" type="text" placeholder="Enter a City" />
      <button class="bg-indigo-900 text-white font-bold rounded p-2">
        Add City
      </button>
    </div>
    <main class="container mx-auto flex flex-col gap-4 p-4">
      <div class="grid grid-cols-2 gap-4">
        <CityCard v-for="city in cities" :key="city.id" :city="city" @viewCity="viewCity" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import cityIds from "../cities.js";
import CityCard from "../components/CityCardComponent.vue";

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
</style>
