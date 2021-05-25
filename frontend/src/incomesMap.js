





function incomeMap(){
    map.current.on('load', () => {
        map.current.addSource('hospital_location', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: aurinData.map(hospital => {
              return {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: hospital.geometry.coordinates,
                },
              };
            }),
          },
        });
  
        map.current.addLayer({
          'id': 'hospitals_loc',
          'type': 'circle',
          'source': 'hospital_location',
          'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
          },
          'paint': {
            'circle-radius': 8,
            'circle-color': 'rgba(55,148,179,1)',
          },
          //'source-layer': 'museum-cusco'
          //rgba(55,148,179,1)
        });
        })
}