import maplibregl from 'maplibre-gl';
import { GeoAlignedImageLayer } from '../dist/geo-aligned-image-layer';

new maplibregl.Map({``
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: [0, 0],
    zoom: 1
}).on('load', function (map) {
    const imageUrl = 'https://yourdomain.com/image.png';
    const coordinates = [
        [-10, 10],  // top-left
        [10, 10],   // top-right
        [10, -10],  // bottom-right
        [-10, -10]  // bottom-left
    ];

    const layer = new GeoAlignedImageLayer('geo-image', imageUrl, {
        coordinates,
        opacity: 0.8
    });

    map.addLayer(layer);
});