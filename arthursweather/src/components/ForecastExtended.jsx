import WeatherCard from './WeatherCard';

const ForecastExtended = ({ forecastData, onExtendClick }) => {
  return (
    <div className='row'>
      {Object.keys(forecastData).map((date, index, array) => (
        <div className='col-xs-12 col-sm-6 col-md-4' key={date}>
          <WeatherCard key={date} data={forecastData[date]} isFirst={index === 0} isLast={index === array.length - 1}  />
        </div>
      ))}
      <button className='btn btn-primary mb-3' onClick={onExtendClick}>Collapse Forecast</button>
    </div>
  );
};

export default ForecastExtended;