function setAllTools() {

    // mouse pointer for every layer
    for (let index = 0; index < layerSets.length; index++) {
        let layerName = layerSets[index];

        // Change the icon to a pointer icon when you mouse over a building
        map.on('mouseenter', layerName, function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pan icon when it leaves.     
        map.on('mouseleave', layerName, function () {
            map.getCanvas().style.cursor = '';
        });

        // Onclick events
        map.on('click', layerName, function (e) {
            // create a popup card for accident and pedestrian points
            if (layerName === 'regions') {
                // popup card for accident points
                new mapboxgl.Popup()
                    // popup attributes on the popup card
                    .setLngLat(e.lngLat)
                    .setHTML('<h3> Region Details</h3>'
                        + '<p>Region Name: ' + e.features[0].properties.region_name + '</p>'
                        + '<p>Tweets Count: ' + e.features[0].properties.count + '</p>'
                    )
                    .addTo(map);
            } else if (layerName === 'incomes') {
                // popup card for pedestrian points
                new mapboxgl.Popup()
                    // popup attributes on the popup card
                    .setLngLat(e.lngLat)
                    .setHTML('<h3> SA3 Region Details </h3>'
                        + '<p>SA3 Name: ' + e.features[0].properties.sa3_name16 + '</p>'
                        + '<p>SA3 Code: ' + e.features[0].properties.sa3_code_2016 + '</p>'
                        + '<p>Total Incomes: ' + e.features[0].properties.income_aud + '</p>')
                    .addTo(map);
            }

            // functions that move the camera to the selected location
            map.flyTo({
                center: e.features[0].geometry.coordinates,
                zoom: 15
            });
        });
    }
    map.addControl(new mapboxgl.NavigationControl());       // add a navigation side bar
    map.addControl(new mapboxgl.ScaleControl(), 'bottom-right');     // add a scale of the map
}