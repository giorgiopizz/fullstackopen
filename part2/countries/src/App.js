import React, { useState, useEffect } from 'react';
import axios from "axios";
import SingleCountry from "./components/SingleCountry";
import FullCountryView from "./components/FullCountryView";




const Countries = ({ countries, buttonClick}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (countries.length < 10 && countries.length >1) {
    return (
      <>
        { countries.map(item => < SingleCountry name={item.name} buttonClick={buttonClick} key={item.name}/>) }
    </>
    );
  }
  else if (countries.length === 1){
    return <FullCountryView country={countries[0]} />;
  }
  else{
    return <p>No nation found</p>
  }
}



const App = () => {

  const [name, setName] = useState("");
  const [fetched, setFetched] = useState([]);
  useEffect(() => {
    if (name.length>0){
      axios.get(`https://restcountries.eu/rest/v2/name/${name}`).then(
        response => setFetched(response.data)
      ).catch(rej=>{
        console.log(rej);
        setFetched([]);
      })
    }
    
  }, [name]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const buttonClick = (event) =>{
    setName(event.target.attributes.country.value)
  }

  return (
    <div>
      <input onChange={handleNameChange} value={name} />

      <Countries countries={fetched} buttonClick={buttonClick}/>

    </div>
  );
}

export default App;
