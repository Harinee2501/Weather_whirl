import React, { useState, useEffect, useCallback } from 'react';
import rainyVideo from './videos/rainy.mp4';
import cloudyVideo from './videos/cloudy.mp4';
import snowVideo from './videos/snow.mp4';
import sunnyVideo from './videos/sunny.mp4';
import hazeVideo from './videos/haze.mp4';
import defaultVideo from './videos/WEATHERWHIRL.mp4';

const WeeklyForecast = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [message, setMessage] = useState('');
  const [backgroundVideo, setBackgroundVideo] = useState(defaultVideo); // Default background video
  const [selectedDay, setSelectedDay] = useState(null); // Store the selected day

  // Function to fetch weekly forecast data
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
      setWeeklyData(data.days);
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch weekly data');
      console.error(`Error: ${error}`);
    }
  }, []);

  // Fetch the weather for the current location based on geolocation
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

  // Handle date click event to change background video and show weather info
  const handleDateClick = (day) => {
    // Normalize condition to lowercase for better matching
    const condition = day.conditions.toLowerCase();

    if (condition.includes('rain')) {
      setBackgroundVideo(rainyVideo);
    } else if (condition.includes('cloud')) {
      setBackgroundVideo(cloudyVideo);
    } else if (condition.includes('snow')) {
      setBackgroundVideo(snowVideo);
    } else if (condition.includes('haze')) {
      setBackgroundVideo(hazeVideo);
    } else if (condition.includes('sunny')) {
      setBackgroundVideo(sunnyVideo);
    } else {
      setBackgroundVideo(defaultVideo); // Default video if no specific condition
    }

    // Set selected day to show its weather info
    setSelectedDay(day);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      {/* Dimmed overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // This will dim the background
          zIndex: 0,
        }}
      ></div>

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '20px' }}>
        <h1>Weekly Forecast</h1>
        <h2>{message}</h2>

        {/* Weekly Slider - 8 Boxes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {weeklyData.slice(0, 8).map((day, index) => (
            <div
              key={index}
              className="day-box"
              onClick={() => handleDateClick(day)}
              style={{
                backgroundColor: '#333',
                color: '#fff',
                margin: '10px',
                padding: '20px',
                borderRadius: '10px',
                width: '120px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            >
              <h4>{new Date(day.datetime).toLocaleDateString()}</h4>
              <p>{new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'long' })}</p>
            </div>
          ))}
        </div>

        {/* Display selected day weather info */}
        {selectedDay && (
          <div style={{ marginTop: '20px' }}>
            <h3>{new Date(selectedDay.datetime).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
            <p>{selectedDay.conditions}</p>
            <p>Temperature: {selectedDay.temp}°F</p>
            <p>High: {selectedDay.tempmax}°F | Low: {selectedDay.tempmin}°F</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyForecast;






