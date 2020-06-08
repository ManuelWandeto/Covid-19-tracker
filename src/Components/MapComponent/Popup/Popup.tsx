import React from 'react';
import { Popup } from 'react-leaflet';
import ReactCountryFlag from 'react-country-flag';
import './Popup.css';
import {StateData} from '../../../shared/interfaces';


const CountryPopup :React.FC<StateData> = (props) => {
    const {name, countryCode, active, tests, confirmed, critical, deaths, recovered} = props;

    return (
        <Popup>
            <div className = "popup-content">
                <h2>
                    <ReactCountryFlag 
                    svg = {true}
                    className = "countryFlag" 
                    countryCode = { countryCode } 
                    aria-label = {name}/>
                    {name}
                </h2>
                <li>Tests:<span>{formatter(tests)}</span></li>
                <li>Confirmed:<span>{formatter(confirmed)}</span></li>
                <li>Active:<span>{formatter(active)}</span></li>
                <li>Recovered:<span>{formatter(recovered)}</span></li>
                <li>critical:<span>{formatter(critical)}</span></li>
                <li>Deaths:<span>{formatter(deaths)}</span></li>
            </div>
        </Popup>
    )
}

function formatter(value: number): string {
    if(value < 0) {
        return 'Unknown';
    } else {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
 
export default CountryPopup;