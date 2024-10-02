// TodayWeather.js
import React, { useState, useEffect, useCallback } from 'react';

const TodayWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');

  const getWeather = useCallback(async (location) => {
    setMessage('Loading...');
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=a8c1ed21c73e0a62d934badb2f7956f8`,
        { mode: 'cors' }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        console.error(`Error details: ${JSON.stringify(errorData)}`); // Log error details
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      return {
        temp: data.main.temp,
        conditions: data.weather[0].main,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        precipitation: data.rain ? data.rain['1h'] : 0,
        windSpeed: data.wind.speed,
        alerts: data.alerts || [], // Ensure alerts is an array
      };
    } catch (error) {
      setMessage('Invalid Location');
      console.error(`Error: ${error}`);
    }
  }, []);

  const getLocationFromCoords = useCallback(async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();
      return data.display_name; // Human-readable location
    } catch (error) {
      console.error(`Error fetching location: ${error}`);
      return 'Unknown location';
    }
  }, []);

  const fetchWeatherForLocation = useCallback(() => {
    setMessage('Fetching your location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const loc = { lat, lon };

          const humanReadableLocation = await getLocationFromCoords(lat, lon);
          setLocation(humanReadableLocation);

          const data = await getWeather(loc);
          if (data) {
            setWeatherData(data);
            setMessage(`Weather for ${humanReadableLocation}`);
          }
        },
        (error) => {
          setMessage('Unable to retrieve your location.');
          console.error(`Geolocation error: ${error.message}`);
        }
      );
    } else {
      setMessage('Geolocation is not supported by this browser.');
    }
  }, [getWeather, getLocationFromCoords]);

  useEffect(() => {
    fetchWeatherForLocation();
  }, [fetchWeatherForLocation]);

  return (
    <div>
      <h1>Today's Weather</h1>
      <h2>{message}</h2>
      {weatherData && (
        <div>
          <p>Location: {location}</p>
          <p>Temperature: {(weatherData.temp - 273.15).toFixed(2)} °C</p>
          <p>Conditions: {weatherData.conditions}</p>
          <p>Description: {weatherData.description}</p>
          <p>Humidity: {weatherData.humidity} %</p>
          <p>Precipitation: {weatherData.precipitation} mm</p>
          <p>Wind Speed: {weatherData.windSpeed} m/s</p>
          {weatherData.alerts.length > 0 && (
            <div>
              <h3>Alerts:</h3>
              <ul>
                {weatherData.alerts.map((alert, index) => (
                  <li key={index}>{alert.title}: {alert.description}</li>
                ))}
              </ul>
            </div>
          )}
          <img src={weatherData.icon} alt="weather icon" />
        </div>
      )}
      {/* Add animated background based on conditions */}
      <div style={{ backgroundImage: `url(${weatherData?.icon})` }} className="animated-background" />
    </div>
  );
};

export default TodayWeather;
















