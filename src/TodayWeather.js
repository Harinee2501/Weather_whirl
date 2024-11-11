// src/TodayWeather.js
import React, { useState, useEffect, useCallback } from 'react';
import sunnyVideo from './videos/sunny.mp4';
import rainVideo from './videos/rainy.mp4';
import cloudyVideo from './videos/cloudy.mp4';
import snowVideo from './videos/snow.mp4';
import hazeVideo from './videos/haze.mp4';
import weatherwhirl from './videos/WEATHERWHIRL.mp4';

const getBackgroundVideo = (conditions) => {
  switch (conditions.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return sunnyVideo;
    case 'rain':
    case 'drizzle':
    case 'thunderstorm':
      return rainVideo;
    case 'clouds':
    case 'overcast':
      return cloudyVideo;
    case 'snow':
      return snowVideo;
    case 'haze':
    case 'mist':
    case 'fog':
      return hazeVideo;
    default:
      return weatherwhirl;
  }
};

const TodayWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [message, setMessage] = useState('Fetching weather...');
  const [location, setLocation] = useState('');
  const [backgroundVideo, setBackgroundVideo] = useState(sunnyVideo);

  const getWeather = useCallback(async (location) => {
    setMessage('Loading weather data...');
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=a8c1ed21c73e0a62d934badb2f7956f8`,
        { mode: 'cors' }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const weatherInfo = {
        temp: data.main.temp,
        conditions: data.weather[0].main,
      };

      setWeatherData(weatherInfo);
      setBackgroundVideo(getBackgroundVideo(weatherInfo.conditions));
    } catch (error) {
      setMessage('Could not fetch weather data');
      console.error(`Error: ${error}`);
    }
  }, []);

  const getLocationFromCoords = useCallback(async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();
      return data.display_name;
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

          // Get a human-readable location
          const humanReadableLocation = await getLocationFromCoords(lat, lon);
          setLocation(humanReadableLocation);

          // Get weather data
          await getWeather(loc);
          setMessage(`Weather for ${humanReadableLocation}`);
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
    <div style={styles.container}>
      <video
        src={backgroundVideo}
        autoPlay
        loop
        muted
        style={styles.backgroundVideo}
      />
      <div style={styles.weatherInfo}>
        <h1 style={styles.title}>Today's Weather</h1>
        <h2>{message}</h2>
        {weatherData && (
          <div>
            <p style={styles.text}>Temperature: {(weatherData.temp - 273.15).toFixed(2)} °C</p>
            <p style={styles.text}>Conditions: {weatherData.conditions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    overflow: 'hidden',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  backgroundVideo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1,
  },
  weatherInfo: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    zIndex: 1,
  },
  title: {
    fontSize: '3rem',
    margin: '10px 0',
  },
  text: {
    fontSize: '1.5rem',
    margin: '5px 0',
  },
};

export default TodayWeather;



















