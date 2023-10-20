import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import LottieAnimation from './LottieAnimation';

const Home = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [searchedWeatherData, setSearchedWeatherData] = useState(null);
  const [searched, setSearched] = useState(false); // Flag to track whether the form has been submitted
  const apiKey = '46d64485ddd2aef6c83c9ceb10139c30'; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    fetchWeatherData(6.9271, 79.8612); // Initial load with Colombo's coordinates
  }, []);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
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
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const data = await response.json();
      setSearchedWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (latitude && longitude) {
      fetchSearchedWeatherData(latitude, longitude);
      setSearched(true);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <NavBar className="w-100" />
        <h1 className='mt-3'>Weather Details</h1>
        <div className="current-weather card">
          <h3>Current Weather in Colombo</h3>
          {weatherData && (
            <>
              <p className="fw-bold">Temperature: {weatherData.main.temp} Kelvin</p>
              <p className="fw-bold">Humidity: {weatherData.main.humidity}%</p>
              <p className="fw-bold">Description: {weatherData.weather[0].description}</p>
            </>
          )}
        </div>
      </div>
      <div className='container-fluid p-5 pt-0'>
        <div className='row'>
          <div className="search-form col-6 p-4 mt-3 text-start">
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
          {/* Separate section to display search results */}
          {searched && searchedWeatherData && (
            <div className="search-results col-6 mt-3 d-flex justify-content-center align-items-center flex-column">
              <h3>Search Results</h3>
              <p className="fw-bold">Temperature: {searchedWeatherData.main.temp} Kelvin</p>
              <p className="fw-bold">Humidity: {searchedWeatherData.main.humidity}%</p>
              <p className="fw-bold">Description: {searchedWeatherData.weather[0].description}</p>
            </div>
          )}
          {!searched && !searchedWeatherData && (
            <div className="not-searched-results col-6 mt-3 d-flex justify-content-center align-items-center">
              <LottieAnimation />
            </div>
          )}
        </div>
      </div>
      </>
  );
};

export default Home;
