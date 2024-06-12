import React from 'react';
import moment from 'moment';
import './WeatherCard.css';

const WeatherCard = ({ data, theme }) => {
  const { name, main, weather, wind, dt } = data;
  const currentDate = moment().format('LLLL');
  const weatherDate = moment.unix(dt).format('LLLL');
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`; // URL from the weather API

  return (
    <div className={`weather-card ${theme}`}>
      <h2 className="weather-card__title">{name}</h2>
      <p className="weather-card__date">Current Date and Time: {currentDate}</p>
      <p className="weather-card__date">Weather Data Date and Time: {weatherDate}</p>
      <div className="weather-card__details">
        <div className="weather-card__info">
          <p>Temperature: {main.temp} °C</p>
          <p>Humidity: {main.humidity}%</p>
          <p>Wind Speed: {wind.speed} m/s</p>
          <p>Description: {weather[0].description}</p>
        </div>
        <div className="weather-card__icon">
          <img src={weatherIconUrl} alt={weather[0].description} />
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
