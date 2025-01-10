import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const apiKey = "*******************"; // Hidden For Security Reasons
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
      const response = await fetch(url);
      console.log(response); // Log the full response

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>WeatherAPI: Real-Time Weather Updates</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>Weather in {weather.location.name}</h3>
          <p>Region: {weather.location.region}</p>
          <p>Country: {weather.location.country}</p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img
            src={`https:${weather.current.condition.icon}`}
            alt="Weather Icon"
          />
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind Speed: {weather.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
