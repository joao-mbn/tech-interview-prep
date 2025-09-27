# Weather App

## Difficulty: Medium

## Description

Build a weather application that displays current weather conditions for a searched city. The app should handle loading states, errors, and provide a clean user interface.

## API Information

### WeatherAPI.com

- **Base URL**: `http://api.weatherapi.com/v1`
- **API Key**: Sign up for free at [weatherapi.com](https://www.weatherapi.com/) to get your API key
- **Endpoints**:
  - Current Weather: `GET /current.json?key={apiKey}&q={city}`
  - Parameters:
    - `key`: Your API key (string, required)
    - `q`: City name (string, required)

### API Response Structure

```typescript
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
```

## Requirements

### Core Functionality

- Search input field for city names
- Display current weather information:
  - City name, region, and country
  - Temperature (in Celsius)
  - Weather condition text
  - "Feels like" temperature
  - Humidity percentage
  - Wind speed (in km/h)
  - Weather condition icon
- Handle loading states while fetching data
- Handle and display API errors (invalid city, network issues)
- Add a search button to trigger the API call

### Error Handling

- Show error message for invalid city names (404 responses)
- Show error message for network failures
- Allow users to retry after an error
- Clear previous results when starting a new search
