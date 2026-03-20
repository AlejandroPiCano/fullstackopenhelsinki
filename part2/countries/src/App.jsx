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

  const countriesToShow = newFilter === '' ? countries : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <>
      <p> find countries </p> <input value={newFilter} onChange={handleFilterChange} />

      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length !== 1 ? (
        <ul>
          {countriesToShow.map(country => <li key={country.name.common}>{country.name.common} <button onClick={() => setNewFilter(country.name.common)}>show</button> </li>)}
        </ul>
      ) : (
        <div>
          <h1>{countriesToShow[0].name.common}</h1>
          <p>capital {countriesToShow[0].capital}</p>
          <p>area {countriesToShow[0].area}</p>
          <h2>languages:</h2>
          <ul>
            {Object.values(countriesToShow[0].languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={countriesToShow[0].flags.png} />
        </div>
      )
      
      }
    </>
  )
}

export default App
