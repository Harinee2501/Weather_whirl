import React, { useState, useEffect, useCallback } from 'react';
import rainyVideo from './videos/rainy.mp4';
import cloudyVideo from './videos/cloudy.mp4';
import snowVideo from './videos/snow.mp4';
import sunnyVideo from './videos/sunny.mp4';
import hazeVideo from './videos/haze.mp4';
import defaultVideo from './videos/WEATHERWHIRL.mp4';

const HourlyForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [message, setMessage] = useState('');
  const [backgroundVideo, setBackgroundVideo] = useState(defaultVideo); // Default background video
  const [selectedHour, setSelectedHour] = useState(null); // Store the selected hour's weather data
  const [scrollPosition, setScrollPosition] = useState(0);

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
      console.error(`Error: ${error}`);
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
          const loc = `${lat},${lon}`;

          const hourlyData = await getHourlyWeather(loc);
          if (hourlyData) {
            setWeatherData(hourlyData);
            setMessage('Hourly weather data fetched');
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
  }, [getHourlyWeather]);

  // Fetch the data when the component is mounted
  useEffect(() => {
    fetchWeatherForLocation();
  }, [fetchWeatherForLocation]);

  // Handle hour click event to change background video and show weather info
  const handleHourClick = (hour) => {
    const condition = hour.conditions.toLowerCase();

    if (condition.includes('rain') || condition.includes('overcast')) {
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
      setBackgroundVideo(defaultVideo);
    }

    setSelectedHour(hour);
    setScrollPosition(window.innerHeight);
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

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', padding: '20px' }}>
        <h1>Hourly Forecast</h1>
        <h2>{message}</h2>

        {/* Hourly Forecast Boxes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '10px',
            justifyItems: 'center',
            maxHeight: '70vh',
            overflowY: 'scroll',
            paddingBottom: '10px',
          }}
        >
          {weatherData ? (
            weatherData.slice(0, 24).map((hour, index) => (
              <div
                key={index}
                className="hour-box"
                onClick={() => handleHourClick(hour)}
                style={{
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '15px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  textAlign: 'center',
                }}
              >
                <p>{hour.datetime}</p> {/* Display time directly */}
                <p>Temperature: {hour.temp} °F</p>
                <p>Conditions: {hour.conditions}</p>
              </div>
            ))
          ) : (
            <p>Loading hourly data...</p>
          )}
        </div>

        {/* Display selected hour weather info */}
        {selectedHour && (
          <div style={{ marginTop: '20px', paddingTop: '20px', height: '100%', overflowY: 'auto', marginTop: '100px', position: 'relative' }}>
            <h3>{selectedHour.datetime}</h3>
            <p>{selectedHour.conditions}</p>
            <p>Temperature: {selectedHour.temp} °F</p>
            <p>Feels Like: {selectedHour.feelslike} °F</p>
            <p>Humidity: {selectedHour.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HourlyForecast;





      












