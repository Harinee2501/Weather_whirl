// Search.js
import React, { useState, useCallback } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [message, setMessage] = useState('');

  const getWeatherByCity = useCallback(async (location) => {
    setMessage('Loading...');
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=us&key=WBJ8N28RSTEG4YKPQ3FFEUMBQ&contentType=json`,
        { mode: 'cors' }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWeatherData({
        temp: data.currentConditions.temp,
        conditions: data.currentConditions.conditions,
        icon: data.currentConditions.icon,
        windSpeed: data.currentConditions.windspeed,
        humidity: data.currentConditions.humidity,
      });
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch weather data');
      console.error(`Error: ${error}`);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    getWeatherByCity(query);
  };

  return (
    <div>
      <h1>Search Weather</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city or ZIP code"
        />
        <button type="submit">Search</button>
      </form>
      <h2>{message}</h2>
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.temp} °F</p>
          <p>Conditions: {weatherData.conditions}</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
          <p>Humidity: {weatherData.humidity} %</p>
          <img src={weatherData.icon} alt="weather icon" />
        </div>
      )}
    </div>
  );
};

export default Search;




