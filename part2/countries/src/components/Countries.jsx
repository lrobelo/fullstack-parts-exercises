import { useState } from 'react';
import Weather from './Weather.jsx';

const Countries = ({ countries, search }) => {
	const [selectedCountry, setSelectedCountry] = useState(null)

	if (!search){
		return  null
	}
	const countriesToShow = countries.filter(country =>
		country.name.common.toLowerCase().includes(search.toLowerCase())
	)

	if (countriesToShow.length > 10) {
		return <div>
			Too many matches, specify another filter
		</div>
	}

	if (selectedCountry) {
		return (
			<div>
				<h2>{selectedCountry.name.common}</h2>
				<div>Capital: {selectedCountry?.capital[0] || 'N/A'}</div>
				<div>Area: {selectedCountry.area} km²</div>
				<h3>Languages:</h3>
				<ul>
					{Object.values(selectedCountry.languages).map((language, index) => (
						<li key={index}>{language}</li>
					))}
				</ul>
				<img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} width="150" />
				{selectedCountry.capital &&
				<Weather capital={selectedCountry.capital[0]} />}
				<br />
				<button onClick={() => setSelectedCountry(null)}>Back</button>
			</div>
		)
	}

	if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
		return (
			<div>
				{countriesToShow.map(country => (
					<div key={country.cca3}>
						{country.name.common}
						<button onClick={() => setSelectedCountry(country)}>Show</button>
					</div>
				))}
			</div>
		)
	}

	if (countriesToShow.length === 1) {
		const country = countriesToShow[0];
		return (
			<div>
				<h2>{country.name.common}</h2>
				<div>Capital: {country.capital ? country.capital[0] : 'N/A'}</div>
				<div>Area: {country.area} km²</div>
				<h3>Languages:</h3>
				<ul>
					{Object.values(country.languages).map((language, index) => (
						<li key={index}>{language}</li>
					))}
				</ul>
				<img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
				{country.capital &&
					<Weather capital={country.capital[0]} />}
			</div>
		)
	}

	return (
		<></>
	)
}

export default Countries