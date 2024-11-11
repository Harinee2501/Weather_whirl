import React, { useState, useCallback } from 'react';
import rainyVideo from './videos/rainy.mp4';
import cloudyVideo from './videos/cloudy.mp4';
import snowVideo from './videos/snow.mp4';
import sunnyVideo from './videos/sunny.mp4';
import hazeVideo from './videos/haze.mp4';
import defaultVideo from './videos/WEATHERWHIRL.mp4';

const Search = () => {
  const [query, setQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [message, setMessage] = useState('');
  const [backgroundVideo, setBackgroundVideo] = useState(defaultVideo); // Default background video

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
      const conditions = data.currentConditions.conditions.toLowerCase();

      // Update weather data
      setWeatherData({
        temp: data.currentConditions.temp,
        conditions: data.currentConditions.conditions,
        icon: data.currentConditions.icon,
        windSpeed: data.currentConditions.windspeed,
        humidity: data.currentConditions.humidity,
      });

      // Set background video based on weather conditions
      if (conditions.includes('rain') || conditions.includes('overcast')) {
        setBackgroundVideo(rainyVideo);
      } else if (conditions.includes('cloud')) {
        setBackgroundVideo(cloudyVideo);
      } else if (conditions.includes('snow')) {
        setBackgroundVideo(snowVideo);
      } else if (conditions.includes('haze')) {
        setBackgroundVideo(hazeVideo);
      } else if (conditions.includes('sunny') || conditions.includes('clear')) {
        setBackgroundVideo(sunnyVideo);
      } else {
        setBackgroundVideo(defaultVideo);
      }

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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }}
      ></div>

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '20px' }}>
        <h1>Search Weather</h1>
        <form onSubmit={handleSearch} style={{ margin: '20px 0' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city or ZIP code"
            style={{
              padding: '10px',
              borderRadius: '5px',
              border: 'none',
              fontSize: '16px',
              marginRight: '10px',
              width: '200px',
            }}
          />
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', fontSize: '16px' }}>
            Search
          </button>
        </form>
        <h2>{message}</h2>

        {/* Weather Data Display */}
        {weatherData && (
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10px' }}>
            <p>Temperature: {weatherData.temp} °F</p>
            <p>Conditions: {weatherData.conditions}</p>
            <p>Wind Speed: {weatherData.windSpeed} m/s</p>
            <p>Humidity: {weatherData.humidity} %</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;




