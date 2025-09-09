import React, { useEffect, useState } from "react";
import "./Weather.css";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import seach_icon from "../assets/search.png";
import { openWeather, weatherMapUrl } from "../../axiosConfig";

function WeatherApp() {
    const API_KEY = "f16c5e9b98b4af4abd3b7f6d86c334dd";
    const [weatherData, setWeatherData] = useState();
    const [input, setInput] = useState("");

    useEffect(() => {
        openWeather
            .get(`weather?q=Kerala&units=Metric&appid=${API_KEY}`)
            .then(function (response) {
                setWeatherData(response.data);
            })
            .catch(function (error) {
                console.log("Error fetching weather data:", error);
            });
    }, []);

    const search = () => {
        if (input === "") {
            return 0;
        }
        openWeather
            .get(`weather?q=${input}&units=Metric&appid=${API_KEY}`)
            .then(function (response) {
                setWeatherData(response.data);
                setInput("");
            })
            .catch(function (error) {
                console.log("Error fetching weather data:", error);
            });
    };

    // Format current date & time
    const formatDateTime = (timezoneOffset) => {
        const nowUTC = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
        const localTime = new Date(nowUTC.getTime() + timezoneOffset * 1000);
        return localTime.toLocaleString(); // e.g., "9/9/2025, 4:30:00 PM"
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input
                    type="text"
                    value={input}
                    className="cityInput"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            search();
                        }
                    }}
                    placeholder="search"
                />
                <div
                    className="search-icon"
                    onClick={() => {
                        search();
                    }}
                >
                    <img src={seach_icon} alt="search-icon" />
                </div>
            </div>
            <div className="weather-image">
                {weatherData && (
                    <img
                        src={`${weatherMapUrl}${weatherData.weather[0].icon}@4x.png`}
                        alt="weather_image"
                    />
                )}
            </div>
            <div className="weather-temp">
                {weatherData && `${Math.round(weatherData.main.temp)}°c`}
            </div>
            <div className="weather-location">
                {weatherData &&
                    `${weatherData.name}, ${weatherData.sys.country}`}
            </div>
            <div className="weather-date-time">
                {weatherData && formatDateTime(weatherData.timezone)}
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="humidity" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">
                            {weatherData && `${weatherData.main.humidity}%`}
                        </div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="wind_icon" className="icon" />
                    <div className="data">
                        <div className="wind-details">
                            {weatherData && `${weatherData.wind.speed} km/h`}
                        </div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default WeatherApp;
