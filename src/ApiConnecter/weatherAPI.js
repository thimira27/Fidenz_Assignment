// weatherApi.js
import axios from "axios";
import { cacheRequest, getCachedData } from "./cache";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

export async function fetchCityData(cityId) {
  const cachedData = getCachedData(`cityData:${cityId}`);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=${API_KEY}`
    );

    const { dt, id, name, weather, main, sys } = response.data;
    const localTime = new Date(
      dt * 1000 + new Date().getTimezoneOffset() * 60000
    );

    const formattedTime =
      localTime.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }) +
      `, ${localTime.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      })}`;

    cacheRequest(`cityData:${cityId}`, {
      dt,
      id,
      name,
      weather,
      main,
      sys,
      formattedTime,
    });

    return { dt, id, name, weather, main, sys, formattedTime };
  } catch (error) {
    console.error("Error fetching city data:", error);
    throw error;
  }
}

export async function addCity(newCity) {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=${API_KEY}`
    );

    const { dt, id, name, weather, main, sys } = response.data;
    const localTime = new Date(
      dt * 1000 + new Date().getTimezoneOffset() * 60000
    );

    const formattedTime =
      localTime.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }) +
      `, ${localTime.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      })}`;

    return { dt, id, name, weather, main, sys, formattedTime };
  } catch (error) {
    console.error("Error adding a new city:", error);
    throw error;
  }
}
