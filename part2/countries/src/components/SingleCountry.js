import React from 'react';


const SingleCountry = ({ name, buttonClick }) => {
    return (
        <>
            <p>{name}  <button onClick={buttonClick} country={name}>Show</button></p>
        </>
    );
}

export default SingleCountry;