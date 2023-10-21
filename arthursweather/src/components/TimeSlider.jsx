import React from 'react';

const TimeSlider = ({ selectedTime, onTimeChange }) => {
  // Create an array of time slices from 00:00 to 21:00 (inclusive) in 3-hour increments
  const timeSlices = Array.from({ length: 9 }, (_, index) => `${index * 3}:00`);

  return (
    <div className="time-slider">
      <label>Select Time: </label>
      <select value={selectedTime} onChange={onTimeChange}>
        {timeSlices.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSlider;
