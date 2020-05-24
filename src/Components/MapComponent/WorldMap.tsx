import React, {useEffect, useState} from 'react';
import {Map, TileLayer, CircleMarker, Popup} from 'react-leaflet';
import {LatLngTuple} from 'leaflet';
import './WorldMap.css';
import {getCountryStats, IStatData} from '../../Api';

function WorldMap() {
    const defaultCenter: LatLngTuple = [9.1021, 18.2812];
    const defaultZoom: number = 3.2;

    const [countryStats, setCountryStats] = useState<IStatData[]>();

    useEffect(() => {
        (async() => {
            const stats = await getCountryStats();
            if(stats) 
                setCountryStats(stats);
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
            maxZoom = {4.2}
            minZoom = {3.0}
            />
            {countryStats && countryStats.map(country => {
                const latLng: LatLngTuple = [country.latLng.latitude, country.latLng.longitude]
                return (
                    <CircleMarker center = {latLng} radius ={15} key = {countryStats.indexOf(country)}>
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