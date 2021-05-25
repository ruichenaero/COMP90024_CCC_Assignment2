import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

function mapboxLayer(map, layerName) {
    if (!map.getLayer(layerName)) {
        // Add new layer for map
        map.addlayer({
            'id': layerName,
            'type': 'circle',
            'source': '',
            'layout': {
                // Make the layer visible by default.
                'visibility': 'visible'
            }
        });
    }
    return (map.getLayer(layerName));
}

function hideLayer(map, layerName) {
    // Check if layer exist in map
    if (map.getLayer(layerName)) {
        // Get visibility of the layer
        var visibility = map.getLayoutProperty(
            layerName,
            'visibility'
        );

        // Hiding layer, setting to invisible
        if (visibility === 'visible') {
            map.setLayoutProperty(
                clickedLayer,
                'visibility',
                'none'
            );
        }
    }
}

function displayLayer(map, layerName) {
    // Check if layer exist in map
    if (map.getLayer(layerName)) {
        // Get visibility of the layer
        var visibility = map.getLayoutProperty(
            layerName,
            'visibility'
        );

        // Hiding layer, setting to invisible
        if (visibility === 'none') {
            map.setLayoutProperty(
                clickedLayer,
                'visibility',
                'visible'
            );
        }
    }
}