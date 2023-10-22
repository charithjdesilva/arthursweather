import WeatherCard from './WeatherCard';

const ForecastLimited = ({ forecastData, onExtendClick }) => {
  const limitedForecast = Object.keys(forecastData).slice(0, 3);

  return (
    <div className='row'>
      {limitedForecast.map((date, index, array) => (
        <div className='col-xs-12 col-sm-6 col-md-4' key={date}>
          <WeatherCard key={date} data={forecastData[date]} isFirst={index === 0} />
        </div>
      ))}
      <button className='btn btn-primary mb-3' onClick={onExtendClick}>Extend Forecast</button>
    </div>
  );
};

export default ForecastLimited;