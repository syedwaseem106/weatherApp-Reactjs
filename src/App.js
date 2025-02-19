import React, { useState, useEffect } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
        {error && <div>Error: {error}</div>}
        {weather?.main && weather?.weather ? (
          <div>
            <h1>Weather in {weather?.name || "Unknown"}</h1>
            <p>Temperature: {weather?.main?.temp ?? "N/A"}°C</p>
            <p>Weather: {weather?.weather[0]?.description || "N/A"}</p>
          </div>
        ) : (
          <div>Loading weather data...</div>
        )}
      </div>
      <div className="footer-info">
        <a href="https://www.htmlhints.com/article/how-to-create-toggle-switch/93">
          Download Source Code
        </a>{" "}
        | Developed by{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://www.gauravghai.dev/">
          Gaurav Ghai
        </a>{" "}
        | Powered by{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://www.htmlhints.com/">
          HTML HINTS
        </a>
      </div>
    </React.Fragment>
  );
}

export default App;
