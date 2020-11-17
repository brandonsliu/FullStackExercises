import Axios from 'axios';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const [countries , setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    Axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
  }

  const countriesToShow = (newFilter === (''))
    ? countries
    : countries.filter(country => country
        .name
          .toLowerCase()
            .includes(newFilter.toLowerCase()))

  return (
    <div>
      <form value={newFilter} onChange={handleFilterChange}>
        <div>
          Find Countries <input value={newFilter}
            onChange={handleFilterChange}/>
        </div>
      </form>
      <DisplayList countriesToShow={countriesToShow}/>
    </div>
  )
}

const DisplayList = ({countriesToShow}) => {
  if(countriesToShow.length > 10){
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if(countriesToShow.length > 1){
      const countryNames = countriesToShow.map((country, index) => {
        return (
          <div key={index}>
            {country.name}
          </div>
        )
      })
      return countryNames
  }
  else if(countriesToShow.length === 1){
    return (
      <DisplayData country={countriesToShow[0]}/>
    )
  }
  else{
    return (
      <div>No matches, specify another filter</div>
    )
  }
}

const DisplayData = ({country}) => {
  return (
    <div>
      <h1>
        {country.name}
      </h1>
      Capital: {country.capital} <br/>
      Population: {country.population} <br/>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language, index) => 
          <li key={index}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt='' width="200"/>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);