import React from 'react';
import {Map, TileLayer, CircleMarker} from 'react-leaflet';
import {LatLngTuple, LatLngBoundsLiteral} from 'leaflet';
import './WorldMap.css';
import {WorldwideStats, IStatData} from '../../Api';
import CountryPopup from './Popup/Popup';
import useSwr from 'swr';

function WorldMap() {
    const {data} = useSwr<WorldwideStats>('api/globalStats', (endpoint: string) => {
        return fetch(`https://us-central1-covid-tracker-api-c2a95.cloudfunctions.net/${endpoint}`)
                    .then(response => response.json());
    })

    const defaultCenter: LatLngTuple = [9.1021, 18.2812];
    const defaultZoom: number = 4.0;
    const bounds = data ? calculateBounds(data?.countries) : undefined;

    return (
        <Map id = "worldmap" center = {defaultCenter} zoom = {defaultZoom} maxBounds = {bounds}>
            <TileLayer 
            attribution= {
                `Map data &copy; 
                <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, 
                <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, 
                Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>`
            }
            url = {
                `https://api.mapbox.com/styles/v1/immanuel-wandeto/ckakxi28w3ajz1io1yelozgq9/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
            }
            maxZoom = {6.5}
            minZoom = {3.0}
            />
            {data && data.countries.map(
                country => {
                    const latLng: LatLngTuple = [country.latLng.latitude, country.latLng.longitude]
                    let averageGlobalCases = data.worldwide.confirmed / data.countries.length;
                    let baseRadius = country.confirmed > averageGlobalCases ? 20 : 15;
                    return (
                        <CircleMarker 
                        key = {data.countries.indexOf(country)}
                        center = {latLng} 
                        radius ={baseRadius + Math.log(country.confirmed / averageGlobalCases)} 
                        fillOpacity = {.1}
                        weight = {2}
                        fillColor = "#EE2934"
                        color = "#EE2934"
                        opacity = {.8}
                        >
                            <CountryPopup 
                            name = {country.countryName}
                            code = {country.countryCode}
                            confirmed = {country.confirmed}
                            active = {country.active}
                            critical = {country.critical}
                            recovered = {country.recovered}
                            deaths = {country.deaths}
                            />
                        </CircleMarker>
                    )
            }
            )}
        </Map>
    );
}

function calculateBounds(countries: IStatData[]) {
    const horizontalPadding = 20;
    const verticalPadding = 10;
    let latitudes: number[] = [];
    let longitudes: number[] = [];

    countries.forEach(country => {
        latitudes.push(country.latLng.latitude);
        longitudes.push(country.latLng.longitude);
    })

    const bounds: LatLngBoundsLiteral = [
        [Math.min(...latitudes) - verticalPadding, Math.min(...longitudes) - horizontalPadding],
        [Math.max(...latitudes) + verticalPadding, Math.max(...longitudes) + horizontalPadding]
    ]
    return bounds;
}

export default WorldMap;