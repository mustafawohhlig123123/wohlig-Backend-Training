import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState(""); // To store user input
  const [weather, setWeather] = useState(null); // To store weather data
  const [error, setError] = useState(null); // To handle errors

  const fetchWeather = async () => {
    const apiKey = "6ba378219cca464da3955149251001"; // Replace with your WeatherAPI key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();

      // Update state with the fetched weather data
      setWeather(data);
      setError(null);
    } catch (err) {
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

      {/* Display error message if there's an error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display weather data if available */}
      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h3>Weather in {weather.location.name}</h3>
          <p>Region: {weather.location.region}</p>
          <p>Country: {weather.location.country}</p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="Weather Icon" />
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind Speed: {weather.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
