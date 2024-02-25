import React, { useState, useEffect } from "react";
import "./Weatherapp.css";

const Weatherapp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const api_key = "fe84beeee29050f1f364eba0488ae4c4";

  useEffect(() => {
    const fetchRandomCityWeather = async () => {
      try {
        const cities = ["London", "New York", "Paris", "Tokyo", "Sydney"];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${randomCity}&appid=${api_key}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
          setWeatherData({
            temperature: `${data.main.temp}°C`,
            humidity: `${data.main.humidity}%`,
            windSpeed: `${data.wind.speed}m/s`,
            location: data.name,
            weatherIcon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          });
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        console.error("Error fetching weather data: ", error);
        setErrorMessage(
          "Failed to fetch weather data. Please try again later."
        );
      }
    };

    fetchRandomCityWeather();
  }, []);

  const search = async () => {
    try {
      if (city.trim() === "") {
        setErrorMessage("Please enter a city name");
        return;
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData({
          temperature: `${data.main.temp}°C`,
          humidity: `${data.main.humidity}%`,
          windSpeed: `${data.wind.speed}m/s`,
          location: data.name,
          weatherIcon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        });
        setErrorMessage("");
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setErrorMessage("Failed to fetch weather data. Please try again later.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress} // Listen for Enter key press
        />
        <button className="search-icon" onClick={search}>
          <img src="./Assets/search.png" alt="search" />
        </button>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {weatherData && (
        <>
          <div className="weather-image">
            <img src={weatherData.weatherIcon} alt="weather" />
          </div>
          <div className="weather-temp">{weatherData.temperature}</div>
          <div className="weather-location">{weatherData.location}</div>
          <div className="data-container">
            <div className="element">
              <img src="./Assets/humidity.png" alt="humidity" />
              <div className="humidity-percent">{weatherData.humidity}</div>
              <div className="text">Humidity</div>
            </div>
            <div className="element">
              <img src="./Assets/wind.png" alt="wind" />
              <div className="wind-rate">{weatherData.windSpeed}</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weatherapp;
