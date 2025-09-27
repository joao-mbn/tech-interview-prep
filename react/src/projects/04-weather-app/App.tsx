import './App.css';

function App() {
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
            />
            <button className="search-button">
              Search
            </button>
          </div>
        </div>

        <div className="weather-content">
          <div className="weather-card">
            <div className="weather-header">
              <h2>London</h2>
              <div className="weather-icon">
                <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather" />
              </div>
            </div>

            <div className="weather-main">
              <div className="temperature">
                <span className="temp-value">22</span>
                <span className="temp-unit">°C</span>
              </div>
              <div className="weather-description">
                Light Rain
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <span className="detail-label">Feels like</span>
                <span className="detail-value">25°C</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">65%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Wind</span>
                <span className="detail-value">3.2 m/s</span>
              </div>
            </div>
          </div>

          <div className="error-message">
            <p>City not found. Please try a different city name.</p>
            <button className="retry-button">Try Again</button>
          </div>

          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
