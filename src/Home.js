import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Weather App</h1>
      <p>Please choose one of the options below:</p>
      
      <ul>
        <li>
          <Link to="/today">See Today's Weather</Link>
        </li>
        <li>
          <Link to="/hourly">Hourly Forecast</Link>
        </li>
        <li>
          <Link to="/weekly">Weekly Forecast</Link>
        </li>
        <li>
          <Link to="/search">Search by City/Zipcode</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
