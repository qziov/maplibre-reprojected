import maplibregl from 'maplibre-gl';
import { GeoAlignedImageLayer } from '../dist/index.js';
import {BoundingBox4326} from "../src/types";

new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: [0, 0],
    zoom: 1
}).on('load', function (map) {
    const imageUrl = 'https://yourdomain.com/image.png';
    const coordinate= [
        [-10, 10],  // top-left
        [10, 10],   // top-right
        [10, -10],  // bottom-right
        [-10, -10]  // bottom-left
    ];

    const layer = new GeoAlignedImageLayer('geo-image', imageUrl, {
        coordinates: coordinate,
        opacity: 0.8
    });

    map.addLayer(layer);
});