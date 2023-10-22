import React, { useState, useEffect } from 'react';

const WeatherCard = ({ data, isFirst, isLast }) => {
  const [time, setTime] = useState(0);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const index = Math.min(Math.floor(time / 3), data.length - 1);
    setSelectedData(data[index]);
  }, [time, data]);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedData(data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (isFirst) {
      // Set time based on the first timestamp in the data
      setTime(extractTimeFromTimestamp(data[0].dt_txt));
      // console.log(extractTimeFromTimestamp(data[0].dt_txt));
    } else if (isLast) {
      // Set time based on the last timestamp in the data
      setTime(extractTimeFromTimestamp(data[data.length - 1].dt_txt));
    }
}, [isFirst, isLast, data]);

// Function to extract time (hours) from a timestamp
const extractTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.getHours();
};

  const handleSliderChange = (e) => {
    const sliderValue = parseInt(e.target.value, 10);
    if (sliderValue % 3 === 0) {
      setTime(sliderValue);
    }
  };

  return (
    <div className="col-md-4 my-2 card w-100">
      {selectedData && (
        <div>
          <h4>Date: {selectedData.dt_txt}</h4>
          <p className="fw-bold">
            <img
              id="wicon"
              src={`http://openweathermap.org/img/w/${selectedData.weather[0].icon}.png`}
              alt="Weather icon"
            />
          </p>
          <p><b>Description:</b> {selectedData.weather[0].description}</p>
          <p><b>Temperature:</b> {selectedData.main.temp}°C</p>
          <p><b>Humidity:</b> {selectedData.main.humidity}%</p>
          <p><b>Wind:</b> {selectedData.wind.speed}ms⁻¹</p>
        </div>
      )}

      <div className="slider">
        <label htmlFor="timeSlider">0</label>
        <input
          type="range"
          min="0"
          max="24"
          step="3"
          className="slider"
          id="timeSlider"
          value={time}
          onChange={handleSliderChange}
        />
        <label htmlFor="timeSlider">24</label>
      </div>
    </div>
  );
};

export default WeatherCard;