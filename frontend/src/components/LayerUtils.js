//
// Team: Team 47
// City: Melbourne
// Xiaoyu Wu (1218098)    
// Yifei Yang (1136477)
// Rui Chen (1100500)
// Wenhai Huo (1101297)
// Jingyuan Ma (988014)
//

export function mapboxLayer(map, layerName) {
    if (!map.current.getLayer(layerName)) {
        // Add new layer for map
        map.current.addlayer({
            'id': layerName,
            'type': 'circle',
            'source': '',
            'layout': {
                // Make the layer visible by default.
                'visibility': 'visible'
            }
        });
    }
    return (map.current.getLayer(layerName));
}

export function hideLayer(map, layerName) {
    // Check if layer exist in map
    if (map.current.getLayer(layerName)) {
        // Get visibility of the layer
        var visibility = map.current.getLayoutProperty(
            layerName,
            'visibility'
        );

        // Hiding layer, setting to invisible
        if (visibility === 'visible') {
            map.current.current.setLayoutProperty(
                layerName,
                'visibility',
                'none'
            );
        }
    }
}

export function displayLayer(map, layerName) {
    // Check if layer exist in map
    if (map.current.getLayer(layerName)) {
        // Get visibility of the layer
        var visibility = map.current.getLayoutProperty(
            layerName,
            'visibility'
        );

        // Hiding layer, setting to invisible
        if (visibility === 'none') {
            map.current.setLayoutProperty(
                layerName,
                'visibility',
                'visible'
            );
        }
    }
}