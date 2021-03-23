import React from "react";
import Weather from "./Weather";

const FullCountryView = ({ country}) =>{
  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>{country.languages.map(element => <li key={element.name}>{element.name}</li>)}</ul>
    
      <Weather city={country.capital}/>

    </>
  );
}

export default FullCountryView;