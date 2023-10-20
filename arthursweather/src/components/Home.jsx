import React, { useState, useEffect } from 'react';

const Home = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    fetchWeatherData(6.9271, 79.8612);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(latitude, longitude);
  };

  return (
    <div className="container">
      <h1>Weather Details</h1>
      <div className="current-weather">
        {weatherData && (
          <div>
            <h3>Current Weather in Colombo</h3>
            <p className="fw-bold">Temperature: {weatherData.main.temp} Kelvin</p>
            <p className="fw-bold">Humidity: {weatherData.main.humidity}%</p>
            <p className="fw-bold">Description: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
      <div className="search-form mt-3">
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
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
