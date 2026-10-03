import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState(false);

  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = '1031e82180981b48e6b9fba105594774';

  const getWeatherInfo = async (cityName) => {
    try {
      const response = await fetch(
        `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const jsonResponse = await response.json();

      const result = {
        city: cityName,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };

      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      console.log(city);
      const newInfo = await getWeatherInfo(city);
      setCity('');
      setError(false);
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && (
          <p style={{ color: 'red' }}>No Such Place In Our Exists!!</p>
        )}
      </form>
    </div>
  );
}