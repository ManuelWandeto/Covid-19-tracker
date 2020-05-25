import React from 'react';
import { Popup } from 'react-leaflet';

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
            <h1>{props.name}</h1>
            <p>confirmed: {props.confirmed}</p>
            <p>active: {props.active}</p>
            <p>recovered: {props.recovered}</p>
            <p>critical: {props.critical}</p>
            <p>deaths: {props.deaths}</p>
        </Popup>
    )
}
 
export default CountryPopup;