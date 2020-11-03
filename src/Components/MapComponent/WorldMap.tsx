import React, {useState} from 'react';
import {Map, TileLayer, AttributionControl, ZoomControl} from 'react-leaflet';
import {LatLngTuple, LatLngBoundsLiteral} from 'leaflet';
import './WorldMap.css';
import {GlobalStats, StateData} from '../../shared/interfaces';
import CountryMarker from './CountryMarker';


function WorldMap(data: GlobalStats) {
    const {countries} = data;
    const defaultCenter: LatLngTuple = [9.1021, 18.2812];
    const defaultZoom: number = 3.0;
    const bounds = data ? calculateBounds(data?.countries) : undefined;
    const [zoomLevel, setZoomLevel] = useState<number>(defaultZoom);
    const minMaxCases = calculateMinMaxCase(data.countries);
    
    return (
        <Map 
        id = "worldmap" 
        center = {defaultCenter}
        zoom = {defaultZoom}
        maxBounds = {bounds} 
        attributionControl = {false}
        zoomControl = {false}
        onViewportChange = {newViewport => {
            if(newViewport.zoom) {
                setZoomLevel(newViewport.zoom);
            }
        }}
        >
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
            <AttributionControl position = {'bottomleft'} />
            <ZoomControl position = {'bottomright'} />
            {countries.map(
                country => <CountryMarker 
                            key = {country.countryCode} 
                            country = {country} 
                            currentZoom = {zoomLevel}
                            minMaxCaseTotal = {minMaxCases}
                            />
            )}
        </Map>
    );
}

function calculateBounds(countries: StateData[]) {
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

function calculateMinMaxCase(countries: StateData[]): [number, number] {
    const casePerCountry: number[] = [];
    countries.forEach(country => casePerCountry.push(country.confirmed));
    return [Math.min(...casePerCountry), Math.max(...casePerCountry)];
}

export default WorldMap;