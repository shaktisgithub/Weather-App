import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import WeatherInput from './components/WeatherInput';
import ToggleTheme from './components/ToggleTheme';
import icon from "../src/images/weather.png";
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    fetchCurrentLocationWeather();
  }, []);

  const fetchCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Error getting location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error('API key is missing');
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setWeatherData([response.data]);
    } catch (error) {
      alert('Error fetching weather data. Please try again.');
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchWeather = async (location) => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      if (!apiKey) {
        throw new Error('API key is missing');
      }
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeatherData([...weatherData, response.data]);
    } catch (error) {
      alert('Error fetching weather data. Please try again.');
      console.error('Error fetching weather data:', error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <h1>Weather App</h1>
        <img src={icon} className="weather-icon" alt="Weather Icon" />
        <div className="controls">
          <WeatherInput fetchWeather={fetchWeather} />
          <ToggleTheme toggleTheme={toggleTheme} theme={theme} />
        </div>
      </header>
      <main>
        {weatherData.map((data, index) => (
          <WeatherCard key={index} data={data} theme={theme} />
        ))}
      </main>
    </div>
  );
};

export default App;
