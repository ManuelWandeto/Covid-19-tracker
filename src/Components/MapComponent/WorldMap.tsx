import React, {useEffect, useState} from 'react';
import {Map, TileLayer, CircleMarker, Popup} from 'react-leaflet';
import {LatLngTuple} from 'leaflet';
import './WorldMap.css';
import {getWorldWideStats, WorldwideStats} from '../../Api';

function WorldMap() {
    const defaultCenter: LatLngTuple = [9.1021, 18.2812];
    const defaultZoom: number = 4.0;
    
    const [globalStats, setGlobalStats] = useState<WorldwideStats>();

    useEffect(() => {
        (async() => {
            const stats = await getWorldWideStats();
            if(stats) 
                setGlobalStats(stats);
            else 
                console.error(`Failed to fetch country Stats`);
        })();
    }, []);

    return (
        <Map id = "worldmap" center = {defaultCenter} zoom = {defaultZoom}>
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
            {globalStats && globalStats.countries.map(country => {
                const latLng: LatLngTuple = [country.latLng.latitude, country.latLng.longitude]
                let baseRadius = 15;
                let averageGlobalCases = globalStats.worldwide.confirmed / globalStats.countries.length;
                return (
                    <CircleMarker 
                    key = {globalStats.countries.indexOf(country)}
                    center = {latLng} 
                    radius ={baseRadius + Math.log(country.confirmed / averageGlobalCases)} 
                    fillOpacity = {.1}
                    weight = {2}
                    fillColor = "#EE2934"
                    color = "#EE2934"
                    opacity = {.8}
                    >
                        <Popup>
                            <h1>{country.countryName}</h1>
                        </Popup>
                    </CircleMarker>
                )
            })}
        </Map>
    );
}

export default WorldMap;