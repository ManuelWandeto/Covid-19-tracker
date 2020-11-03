import React from 'react';
import './Logo.css';

function LogoComponent() {
    return (
        <img id= "logo" src={require('../assets/covid-logo.svg')} alt="Site logo"></img>
    )
}

export default LogoComponent;