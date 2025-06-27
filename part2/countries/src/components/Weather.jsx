import { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
	const [weather, setWeather] = useState(null);
	const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

	useEffect(() => {
		if (!capital) {
			return;
		}

		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`)
			.then(response => {
				setWeather(response.data);
			})
			.catch(error => {
				console.error('Error fetching weather data:', error);
			});
	}, [capital]);

	if (!weather) {
		return <div>Loading weather data...</div>;
	}

	return (
		<div>
			<h3>Weather in {capital}</h3>
			<p>Temperature: {weather.main.temp} °C</p>
			<img
				src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
				alt={weather.weather[0].description}
			/>
			<p>Wind {weather.wind.speed} m/s</p>
		</div>
	);

};
export default Weather;




