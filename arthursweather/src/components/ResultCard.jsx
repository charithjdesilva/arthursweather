import React from 'react';

const ResultCard = ({ title, icon, temperature, humidity, windSpeed, description }) => {
    return (
      <div className="card border-dark mb-3 p-0 result-card">
        <div className="card-header">{title}</div>
        <div className="card-body px-5 py-0">
          {/* <h5 className="card-title">{title}</h5> */}
          <p className="card-text">
            <img
              id="wicon"
              src={`http://openweathermap.org/img/w/${icon}.png`}
              alt="Weather icon"
              className="d-inline"
            />
            <span className="fw-bold ml-2">{description}</span>
          </p>
          <p><b>Temperature:</b> {temperature}°C</p>
          <p><b>Humidity:</b> {humidity}%</p>
          <p><b>Wind Speed:</b> {windSpeed} ms⁻¹</p>
        </div>
      </div>
    );
  };

export default ResultCard;
