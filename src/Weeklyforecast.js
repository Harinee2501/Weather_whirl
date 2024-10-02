// WeeklyForecast.js
import React, { useState, useEffect, useCallback } from 'react';

const WeeklyForecast = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [message, setMessage] = useState('');

  const getWeeklyForecast = useCallback(async (location) => {
    setMessage('Loading...');
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=us&key=WBJ8N28RSTEG4YKPQ3FFEUMBQ&contentType=json`,
        { mode: 'cors' }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWeeklyData(data.days); // Assuming the API returns a days array
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch weekly data');
      console.error(`Error: ${error}`);
    }
  }, []);

  const fetchWeatherForLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const loc = `${lat},${lon}`;

          await getWeeklyForecast(loc);
        },
        (error) => {
          setMessage('Unable to retrieve your location.');
          console.error(`Geolocation error: ${error.message}`);
        }
      );
    } else {
      setMessage('Geolocation is not supported by this browser.');
    }
  }, [getWeeklyForecast]);

  useEffect(() => {
    fetchWeatherForLocation();
  }, [fetchWeatherForLocation]);

  return (
    <div>
      <h1>Weekly Forecast</h1>
      <h2>{message}</h2>
      <div className="weekly-slider">
        {weeklyData.map((day, index) => (
          <div key={index} className="day-card">
            <h3>{new Date(day.datetime).toLocaleDateString()}</h3>
            <p>{day.tempmax} °F / {day.tempmin} °F</p>
            <p>{day.conditions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;

