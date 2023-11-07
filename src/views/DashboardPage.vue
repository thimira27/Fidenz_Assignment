<template>
  <div>
    <div class="flex justify-center py-4">
      <input v-model="newCity" class="rounded pl-5 p-2 w-80 h-10 bg-white" type="text" placeholder="Enter a City" />
      <button @click="addNewCity" class="bg-white text-indigo-900 font-bold rounded p-2 ml-2">
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
import { fetchCityData, addCity } from "../ApiConnecter/weatherAPI";

const router = useRouter();
const cities = ref([]);
const newCity = ref('');

const fetchInitialCityData = async () => {
  try {
    const responses = await Promise.all(cityIds.map(fetchCityData));
    cities.value = responses;
  } catch (error) {
    console.error('Error fetching initial city data:', error);
  }
};

const addNewCity = async () => {
  if (newCity.value.trim() === '') {
    return; // Prevent adding empty city names
  }

  try {
    const newCityData = await addCity(newCity.value);
    cities.value.push(newCityData);
    newCity.value = ''; // Clear the input field
  } catch (error) {
    console.error('Error adding a new city:', error);
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
  fetchInitialCityData();
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

/* Add responsive styles */
@media (max-width: 640px) {
  .bg-image-com {
    background-size: contain;
  }
}

@media (min-width: 1024px) {
  .bg-image-com {
    background-size: cover;
  }
}
</style>
