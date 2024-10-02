// src/Forecast.js
import React from 'react';

const Forecast = ({ forecastData }) => (
  <div className="forecast">
    {forecastData.map((day, index) => (
      <div key={index} className="day-forecast">
        <h3>{day.date}</h3>
        <p>Temp: {day.temp} °F</p>
        <p>Conditions: {day.conditions}</p>
      </div>
    ))}
  </div>
);

export default Forecast;
