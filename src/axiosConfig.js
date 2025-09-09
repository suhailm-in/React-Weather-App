import axios from "axios";

export const openWeather = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/",
});

export const weatherMapUrl = "https://openweathermap.org/img/wn/"