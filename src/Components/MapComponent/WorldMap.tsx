import React from 'react';
import {Map, TileLayer} from 'react-leaflet';
import {LatLngTuple} from 'leaflet';
import './WorldMap.css';

function WorldMap() {
    const defaultCenter: LatLngTuple = [9.1021, 18.2812];
    const defaultZoom: number = 3.0;

    return (
        <Map id = "worldmap" center = {defaultCenter} zoom = {defaultZoom}>
            <TileLayer 
            attribution= "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </Map>
    );
}

export default WorldMap;