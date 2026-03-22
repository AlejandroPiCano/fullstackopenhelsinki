import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')


  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const api_key =  import.meta.env.OPENWEATHERMAP_API_KEY
  console.log('API key:', api_key);
  console.log(api_key.length);

  const countriesToShow = newFilter === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
 
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);

  const country = countriesToShow.length === 1
    ? countriesToShow[0]
    : null;

  useEffect(() => {
    if (!country) return;


    //const openweatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,daily&=${api_key}`;
const openweatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`
    axios.get(openweatherUrl).then(response => {
      console.log('Weather API response:', response.data);
      console.log('Temperature in Kelvin:', response.data.main.temp);

      setTemperature(response.data.main.temp);
      setWind(response.data.wind.speed);
    });
  }, [country, api_key])

  // ---- RENDER ----

   
  if (countriesToShow.length > 10) {
    return(
     <div>
        <p> find countries </p> <input value={newFilter} onChange={handleFilterChange} />
        <p>Too many matches, specify another filter</p>
     </div>
    )
  }

  if (countriesToShow.length !== 1) {
    return (
      <div>
        <p> find countries </p> <input value={newFilter} onChange={handleFilterChange} />
         <ul>
        {countriesToShow.map(country => (
          <li key={country.name.common}>
            {country.name.common}
            <button
              onClick={() => setNewFilter(country.name.common)}
            >
              show
            </button>
          </li>
        ))}
      </ul>
      </div>
     
    )
  }

  return (
    <div>
      <p> find countries </p> <input value={newFilter} onChange={handleFilterChange} />
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt="flag" />

      <h2>Weather in {country.capital}</h2>
      <p>temperature in Kelvin (K) {temperature}</p>
      <p>wind speed (m/s) {wind}</p>
    </div>
  )
}



export default App
