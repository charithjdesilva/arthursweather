import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import LottieAnimation from './LottieAnimation';
import WeatherCard from './WeatherCard';
import TimeSlider from './TimeSlider'; // Import the TimeSlider component
import { format } from 'date-fns'; // Import date-fns for date formatting

const Home = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [searchedWeatherData, setSearchedWeatherData] = useState(null);
  const [searched, setSearched] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(''); 

  const apiKey = '46d64485ddd2aef6c83c9ceb10139c30';

  const arrangeForecastsByDay = (forecasts) => {
    const forecastsByDay = {};

    forecasts.forEach((forecast) => {
      const dt_txt = forecast.dt_txt;
      const date = format(new Date(dt_txt), 'yyyy-MM-dd');

      if (!forecastsByDay[date]) {
        forecastsByDay[date] = [];
      }

      forecastsByDay[date].push(forecast);
    });

    return forecastsByDay;
  };

  useEffect(() => {
    fetchWeatherData(6.9271, 79.8612);
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, 'yyyy-MM-dd');
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchSearchedWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      setSearchedWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchForecastData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      const arrangedData = arrangeForecastsByDay(data.list);
      setForecastData(arrangedData);
      setSelectedDate(Object.keys(arrangedData)[0]);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (latitude && longitude) {
      fetchSearchedWeatherData(latitude, longitude);
      fetchForecastData(latitude, longitude);
      setSearched(true);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <NavBar className="w-100" />
        <h1 className='mt-3'>Mickey Arthur's Weather App</h1>
        <div className="current-weather card">
          <h3>Current Weather in Colombo</h3>
          {weatherData && (
            <>
              <p className="fw-bold">
                <img
                  id="wicon"
                  src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  alt="Weather icon"
                />
              </p>
              <p className="fw-bold">Temperature: {weatherData.main.temp}°C</p>
              <p className="fw-bold">Humidity: {weatherData.main.humidity}%</p>
              <p className="fw-bold">Wind Speed: {weatherData.wind.speed} ms⁻¹</p>
              <p className="fw-bold">Description: {weatherData.weather[0].description}</p>
            </>
          )}
        </div>
      </div>
      <div className='container-fluid p-5 pt-0'>
        <div className='row'>
          <div className="search-form col-md-6 p-4 mt-3 text-start">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Latitude</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Longitude</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </form>
          </div>
          {searched && searchedWeatherData && (
            <div className="search-results col-md-6 mt-3 d-flex justify-content-center align-items-center flex-column">
              <h4 className="fw-bold">City: {searchedWeatherData.name}</h4>
              <p className="fw-bold">
                <img
                  id="wicon"
                  src={`http://openweathermap.org/img/w/${searchedWeatherData.weather[0].icon}.png`}
                  alt="Weather icon"
                />
              </p>
              <p className="fw-bold">Temperature: {searchedWeatherData.main.temp}°C</p>
              <p className="fw-bold">Humidity: {searchedWeatherData.main.humidity}%</p>
              <p className="fw-bold">Wind Speed: {searchedWeatherData.wind.speed} ms⁻¹</p>
              <p className="fw-bold">Description: {searchedWeatherData.weather[0].description}</p>
            </div>
          )}
          {!searched && !searchedWeatherData && (
            <div className="not-searched-results col-md-6 mt-3 d-flex justify-content-center align-items-center">
              <LottieAnimation className="z-n1" />
            </div>
          )}
        </div>
        <div className='row' id="ForecastSection">
        {Object.keys(forecastData).map((date, index, array) => (
          <WeatherCard
            key={date}
            data={forecastData[date]}
            isFirst={index === 0}
            isLast={index === array.length - 1}
          />
        ))}
        </div>
      </div>
    </>
  );
};

export default Home;
