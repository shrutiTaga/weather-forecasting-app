import React, { useState } from "react";
import "./WeatherCard.css";

function WeatherCard() {
    const [searchCity, setSearchCity] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!searchCity) {
            alert("Please Enter the City Name");
            return;
        }

        setLoading(true);

        const apiKey = "1067a6a3b9621573fdddca05ee116dfd";
        
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (!response.ok) {
                throw new Error("Please Enter a valid city name");
            }

            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setSearchCity(e.target.value);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    return (
        <div className="weather-app">
            <div className="weather-container">
                <h2 className="app-title">Weather Forecasting  App</h2> 
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter City Name"
                        value={searchCity}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <input type="submit" value="Search" onClick={handleSubmit} />
                </div>
                {loading && <p>Loading...</p>}
                {weatherData.main && (
                    <div className="weather-info">
                        <img
                            className="weather-icon"
                            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                            alt="Weather Icon"
                        />
                        <h2 className="weather-description">{weatherData.weather[0].description}</h2>
                        <div className="description"><p>Temperature: {weatherData.main.temp}°C</p>
                            <p>Pressure: {weatherData.main.pressure} hPa</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                            <p>Sunrise: {formatTime(weatherData.sys.sunrise)}</p>
                            <p>Sunset: {formatTime(weatherData.sys.sunset)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherCard;
