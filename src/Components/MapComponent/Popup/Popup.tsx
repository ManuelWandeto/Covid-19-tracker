import React from 'react';
import { Popup } from 'react-leaflet';
import ReactCountryFlag from 'react-country-flag';
import './Popup.css';

interface IPopupProps {
    name: string,
    code: string,
    confirmed: number,
    active: number,
    recovered: number,
    critical: number,
    deaths: number
    
}


const CountryPopup :React.FC<IPopupProps> = (props) => {
    return (
        <Popup>
            <div className = "popup-content">
                <h2>
                    <ReactCountryFlag 
                    svg = {true}
                    className = "countryFlag" 
                    countryCode = { props.code } 
                    aria-label = {props.name}/>
                    {props.name}
                </h2>
            </div>
        </Popup>
    )
}
 
export default CountryPopup;