import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import LottieAnimation from './LottieAnimation';
import WeatherCard from './WeatherCard';
import { format } from 'date-fns'; // Import date-fns for date formatting
import ResultCard from './ResultCard';

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
      <section className="container-fluid">
        <NavBar className="w-100" />
        <h1 className='mt-3'>Mickey Arthur's Weather App</h1>
        <div className="current-weather card p-3">
          <h3>Current Weather in Colombo</h3>
          {weatherData && (
            <>
              <div className='row'>
                <div className='col-xs-12 col-sm-6 col-md-3 mb-3 mb-md-0'>
                  <div className="card text-bg-dark p-2" style={{ minHeight: "100%" }}>
                    <div className="card-header">Temperature</div>
                    <div className="card-body">
                      <h3 className="fw-bold"><i className="fa-solid fa-temperature-half"></i> {weatherData.main.temp}°C</h3>
                    </div>
                  </div>
                </div>
                <div className='col-xs-12 col-sm-6 col-md-3 mb-3 mb-md-0'>
                  <div className="card text-bg-dark p-2" style={{ minHeight: "100%" }}>
                    <div className="card-header">Humidity</div>
                    <div className="card-body">
                      <h3 className="fw-bold"><i className="fa-solid fa-droplet"></i> {weatherData.main.humidity}%</h3>
                    </div>
                  </div>
                </div>
                <div className='col-xs-12 col-sm-6 col-md-3 mb-3 mb-md-0'>
                  <div className="card text-bg-dark p-2" style={{ minHeight: "100%" }}>
                    <div className="card-header">Wind Speed</div>
                    <div className="card-body">
                      <h3 className="fw-bold"><i className="fa-solid fa-wind"></i> {weatherData.wind.speed} ms⁻¹</h3>
                    </div>
                  </div>
                </div>
                <div className='col-xs-12 col-sm-6 col-md-3'>
                  <div className="card text-bg-dark p-2" style={{ minHeight: "100%" }}>
                    <div className="card-header">Description</div>
                    <div className="card-body">
                      <img
                        id="wicon"
                        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                        alt="Weather icon"
                        className='d-inline mx-2'
                      />
                      <h5 className="fw-bold d-inline">{weatherData.weather[0].description}</h5>
                      {/* <p className="fw-bold d-inline">{weatherData.weather[0].description}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <section className='container-fluid p-5 pt-0' id="SearchSection">
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
              <ResultCard
                title={`City: ${searchedWeatherData.name}`}
                icon={searchedWeatherData.weather[0].icon}
                temperature={searchedWeatherData.main.temp}
                humidity={searchedWeatherData.main.humidity}
                windSpeed={searchedWeatherData.wind.speed}
                description={searchedWeatherData.weather[0].description}
              />
            </div>
          )}
          {!searched && !searchedWeatherData && (
            <div className="not-searched-results col-md-6 mt-3 d-flex justify-content-center align-items-center">
              <LottieAnimation className="z-n1" />
            </div>
          )}
        </div>
      </section>
      <section className='row' id="ForecastSection">
      {Object.keys(forecastData).map((date, index, array) => (
        <WeatherCard
          key={date}
          data={forecastData[date]}
          isFirst={index === 0}
          isLast={index === array.length - 1}
        />
      ))}
      </section>
    </>
  );
};

export default Home;
