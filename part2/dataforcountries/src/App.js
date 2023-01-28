import { useState, useEffect } from "react";
import axios from 'axios'

const Countries = ({searchController}) => <p>find countries <input onChange={searchController} /></p>

const ListCountries = ({country, details})=> {return details ? <></> : country.map(x => <p key={x.name.common}>{x.name.common}</p>)}

const DetailedCountries = ({props, details}) => {
  const { area, capital, country, img, languages } = props
  return details ? (
    <>
      <h1>{country}</h1>
      <p>{capital}</p>
      <p>{area}</p>
      <h3>languages</h3>
      <ul>
        {languages ? Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>) : ''}
      </ul>
      <img src={img} alt="Flag" />
    </>
  ) : <></>
}

const App = () => {
  const [listCountries, setListCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
        const tempListCountries = res.data
        setListCountries(tempListCountries)
      })
  }, [])

  if (!listCountries) {
    return null
  }

  const searchController = (event) => {
    const query = event.target.value
    
    if (query === "") {
      const tempCountries = []
      setShowDetails(false)
      return setFilteredCountries(tempCountries)
    }
    let getFilteredCountries = [...listCountries]
    getFilteredCountries = listCountries.filter((x) => {
      return x.name.common.indexOf(query) !== -1;
    })

    if (getFilteredCountries.length > 10) {
      const tempCountries = [{
        name: {
          common: "Too many matches, specify another filter"
        }
      }]
      setShowDetails(false)
      return setFilteredCountries(tempCountries)
    }

    if (getFilteredCountries.length === 1) {
      const selectedCountry = getFilteredCountries[0]
      const showDetails = {
        country: selectedCountry.name.official,
        capital: selectedCountry.capital[0],
        area: selectedCountry.area,
        languages: selectedCountry.languages,
        img: selectedCountry.flags.png,
      }
      setFilteredCountries(showDetails)
      setShowDetails(true)
      return 
    }
    setShowDetails(false)
    setFilteredCountries(getFilteredCountries)
  }
  return (
    <div>
      <Countries searchController={searchController} />
      <DetailedCountries props={filteredCountries} details={showDetails} />
      <ListCountries country={filteredCountries} details={showDetails} />
    </div>
  );
};

export default App;
