import React, { useState } from 'react';
import './WeatherInput.css';

const WeatherInput = ({ fetchWeather }) => {
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    if (location) {
      fetchWeather(location);
      setLocation('');
    } else {
      alert('Please enter a location');
    }
  };

  return (
    <div className="weather-input">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city name or zip code"
        className="weather-input__input"
      />
      <button onClick={handleSearch} className="weather-input__button">Search</button>
    </div>
  );
};

export default WeatherInput;
