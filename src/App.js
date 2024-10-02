import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import TodayWeather from './TodayWeather';
import HourlyForecast from './Hourlyforecast';
import WeeklyForecast from './Weeklyforecast';
import Search from './Search';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/today" element={<TodayWeather />} />
          <Route path="/hourly" element={<HourlyForecast />} />
          <Route path="/weekly" element={<WeeklyForecast />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




