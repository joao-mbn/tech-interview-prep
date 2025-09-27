import { useState } from 'react';
import './App.css';

interface WeatherResponse {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    humidity: number;
    wind_kph: number;
    wind_mph: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
}

function getWeather(city: string) {
  const searchParams = new URLSearchParams({
    key: import.meta.env.VITE_WEATHER_APP_API_KEY,
    q: city,
    aqi: 'no',
  }).toString();
  const url = 'https://api.weatherapi.com/v1/current.json?' + searchParams;
  return fetch(url, {
    method: 'GET',
    mode: 'cors',
  });
}

function App() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherResponse>();
  const [city, setCity] = useState('');

  const searchWeather = async () => {
    if (!city.trim().length) {
      setError('You must type a city name first');
      return;
    }

    try {
      setError('');
      setLoading(true);

      const response = await getWeather(city);
      const results = await response.json();
      if (!response.ok) {
        if ('error' in results && 'message' in results['error']) {
          setError(results.error.message);
        } else {
          setError(JSON.stringify(results));
        }
        return;
      }
      setWeatherData(results);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(String(e));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <div className="weather-app">
      <header className="app-header">
        <h1>Weather App</h1>
        <p>Search for current weather conditions in any city</p>
      </header>

      <main className="app-main">
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter city name..."
              className="search-input"
              onChange={handleCityChange}
              disabled={loading}
            />
            <button className="search-button" onClick={searchWeather}>
              Search
            </button>
          </div>
        </div>

        <div className="weather-content">
          {!loading && weatherData && (
            <div className="weather-card">
              <div className="weather-header">
                <h2>{`${weatherData.location.name},${weatherData.location.region},${weatherData.location.country}`}</h2>
                <div className="weather-icon">
                  <img src={weatherData.current.condition.icon} alt="weather" />
                </div>
              </div>

              <div className="weather-main">
                <div className="temperature">
                  <span className="temp-value">{weatherData.current.temp_c}</span>
                  <span className="temp-unit">°C</span>
                </div>
                <div className="weather-description">{weatherData.current.condition.text}</div>
              </div>

              <div className="weather-details">
                <div className="detail-item">
                  <span className="detail-label">Feels like</span>
                  <span className="detail-value">{weatherData.current.feelslike_c}°C</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Humidity</span>
                  <span className="detail-value">{weatherData.current.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Wind</span>
                  <span className="detail-value">{weatherData.current.wind_kph} m/s</span>
                </div>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="error-message">
              <p>{error}</p>
              <button className="retry-button" onClick={searchWeather}>
                Try Again
              </button>
            </div>
          )}

          {loading && (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading weather data...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
