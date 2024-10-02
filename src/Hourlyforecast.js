import React, { useState, useEffect, useCallback } from 'react';

const HourlyForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [message, setMessage] = useState('');

  // Function to fetch hourly weather data
  const getHourlyWeather = useCallback(async (location) => {
    setMessage('Loading...');
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=hours&key=WBJ8N28RSTEG4YKPQ3FFEUMBQ&contentType=json`,
        { mode: 'cors' }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      return data.days[0].hours; // Assuming data.days[0].hours contains hourly data
    } catch (error) {
      setMessage('Unable to fetch weather data');
      console.error(`Error: ${error}`); // Correctly using template literals
    }
  }, []);

  // Function to handle geolocation and fetch weather for current location
  const fetchWeatherForLocation = useCallback(() => {
    setMessage('Fetching your location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const loc = `${lat},${lon}`; // Correctly using template literals

          const hourlyData = await getHourlyWeather(loc);
          if (hourlyData) {
            setWeatherData(hourlyData);
            setMessage('Hourly weather data fetched');
          }
        },
        (error) => {
          setMessage('Unable to retrieve your location.');
          console.error(`Geolocation error: ${error.message}`); // Correctly using template literals
        }
      );
    } else {
      setMessage('Geolocation is not supported by this browser.');
    }
  }, [getHourlyWeather]);

  // Fetch the data when the component is mounted
  useEffect(() => {
    fetchWeatherForLocation();
  }, [fetchWeatherForLocation]);

  return (
    <div>
      <h1>Hourly Forecast</h1>
      <h2>{message}</h2>
      <div>
        {weatherData ? (
          weatherData.map((hour, index) => (
            <div key={index} className="hour-box">
              <p>{hour.datetime}</p>
              <p>Temperature: {hour.temp} °F</p>
              <p>Conditions: {hour.conditions}</p>
            </div>
          ))
        ) : (
          <p>Loading hourly data...</p>
        )}
      </div>
    </div>
  );
};

export default HourlyForecast;









