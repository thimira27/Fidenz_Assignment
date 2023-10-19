<template>
    <div class="weather-details">
        <h2>Weather Details</h2>
        <ul>
            <h2>----------</h2>
            <li v-for="cityWeather in weatherData" :key="cityWeather.id" @click="selectCity(cityWeather)"
                :class="{ 'selected': cityWeather === selectedCity }">
                <h3>hello</h3>
                <h3>{{ cityWeather.name }}</h3>
                <div class="weather-info">
                    <p>Weather: {{ cityWeather.weather[0].main }}</p>
                    <p>Temperature: {{ cityWeather.main.temp }}°C</p>
                    <!-- Add more weather properties as needed -->
                </div>
            </li>
            <h2>-----------</h2>
        </ul>
    </div>
</template>
  
<script>
export default {
    name: 'WeatherDetails',
    props: {
        weatherData: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            selectedCity: null,
        };
    },
    methods: {
        selectCity(cityWeather) {
            this.selectedCity = cityWeather;
        },
    },
};
</script>
  
<style scoped>
.weather-details {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
}

h2 {
    font-size: 24px;
    /* Increased font size */
    margin-bottom: 10px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    margin-bottom: 20px;
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    display: flex;
    /* Added display: flex for better alignment */
    justify-content: space-between;
    /* Align weather info to the right */
}

li.selected {
    background-color: #b3e0ff;
    /* Add your selected city background color here */
}

h3 {
    font-size: 20px;
    /* Increased font size */
}

.weather-info {
    flex: 1;
    /* Utilize available space for weather info */
    display: flex;
    flex-direction: column;
    justify-content: center;
}

p {
    margin: 5px 0;
}

/* Add more styling as needed */
</style>
  