import React, { useState, useEffect } from 'react';
import axios from "axios";


const Weather = ({ city}) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState('');
    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
            .then(response => {
                if ("error" in response.data){
                    setWeather('')
                }
                else{
                    setWeather(response.data);
                }
                
            })
            .catch(reason =>{
                console.log(reason);
                setWeather('');
            })
            ;
    },[city,api_key]);

    if (weather) {
        return (
            <>
                <h2>Weather in {city}</h2>
                <p><b>temperature:</b>{weather.current.temperature} Celsius</p>
                <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions} />
                <p><b>wind:</b>{weather.current.wind_speed} mph, direction {weather.current.wind_dir}</p>
            </>
        );
        
    }
    else {
        return (<>
            <h2>Weather in {city}</h2>
            No weather found</>);
    }
}

export default Weather;