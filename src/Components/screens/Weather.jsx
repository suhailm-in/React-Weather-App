import React from "react";
import "./Weather.css";

// import clear_icon from "../assets/clear.png";
// import drizzle_icon from "../assets/drizzle.png";
// import rain_icon from "../assets/rain.png";
// import snow_icon from "../assets/snow.png";
import cloud_icon from "../assets/cloud.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import seach_icon from "../assets/search.png";

const Weather = () => {

    const api_key = "f16c5e9b98b4af4abd3b7f6d86c334dd"
    const search = async ()=>{
        const element = document.getElementsByClassName("cityInput")
        if (element[0].value==="") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`
        let response = await fetch(url);
        let data = await response.json(); 

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-details");
        const temprature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = data.wind.speed+" km/h";
        temprature[0].innerHTML = data.main.temp+"°C";
        location[0].innerHTML = data.name;
    }
    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="search" />
                <div className="search-icon" onClick={()=>{search()}}>
                    <img src={seach_icon} alt="search-icon" />
                </div>
            </div>
            <div className="details">
                <div className="weather-image">
                    <img src={cloud_icon} alt="weather_image" />
                </div>
                <div className="weather-temp">24°C</div>
                <div className="weather-location">London</div>
                <div className="data-container">
                    <div className="element">
                        <img src={humidity_icon} alt="humidity" className="icon" />
                        <div className="data">
                            <div className="humidity-percent">64%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className="element">
                        <img src={wind_icon} alt="wind_icon" className="icon" />
                        <div className="data">
                            <div className="wind-details">18 km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
                
        </div>
    );
};

export default Weather;
