import React, { Component, useRef, useEffect, useState } from 'react';
import SidePanel from "./components/SidePanel";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Layout } from 'antd';
import Hospital_Statistics from './data/Hospital_Statistics.json';
//port hospital from './data/hospital.json';
import Regions from './data/region_food_count.json';
import axios from "axios";
import { MenuFoldOutlined } from '@ant-design/icons';

var mapContainer;
var map;
var staticLayers = [];
var additionLayers = [];
mapboxgl.accessToken = 'pk.eyJ1IjoieWlmZXlhbmcxIiwiYSI6ImNrb251MG44ZzA0Njkyd3BweWFyMWJvcjYifQ.oEO3lpWd3GLwRu13euHIvA';

//export { mapContainer };
//export { map };
//export { staticLayers };
//export { additionLayers };


export default function Map() {
  var mapContainer = useRef(null);
  var map = useRef(null);
  const [lng, setLng] = useState(145.3607);
  const [lat, setLat] = useState(-37.8636);
  const [zoom, setZoom] = useState(7.96);

  //const [aurinData,setAurinData]=useState([]);
  //const [isLoaded, setIsLoaded] = useState(false);
  //const [isAdded, setIsAdded] = useState(false);
  const aurinData = Hospital_Statistics.features;


  const regions = Regions;
  const counts = Regions.features.map(region => {
    return parseInt(region.properties.count);
  });

  const math = require("mathjs");
  const maxCount = math.max(counts);
  const minCount = math.min(counts);
  const add = (maxCount - minCount) / 5;
  // const colors = ['#b3d9ff', '#80bfff', '#4da6ff', '#1a8cff', '#0073e6', '#0059b3'];
  // const colorClasses = getCountRange(regions, colors);


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/yifeyang1/ckp41vh7i0pli19o3x6fe84jh/draft',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });



  useEffect(() => {
    map.current.on('load', () => {
      map.current.loadImage('https://i.loli.net/2021/05/25/rdNiyRkwZWafj5x.png', function (error, image) {
        if (error) throw error;
        map.current.addImage('exclamation', image); //38x55px, shadow adds 5px
      });

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
        'type': 'symbol',
        'source': 'hospital_location',
        'layout': {
          // Make the layer visible by default.
          'icon-image': 'exclamation',
          'icon-size': 0.05,
        },
      });
      staticLayers.push('hospitals_loc');

      map.current.getLayer('income-layer');
      staticLayers.push('income-layer');

      // mouse pointer for every layer
      // for (let index = 0; index < staticLayers.length; index++) {
      //   let layerName = staticLayers[index];

      // // Change the icon to a pointer icon when you mouse over a building
      // map.current.on('mouseenter', layerName, function () {
      //   map.current.getCanvas().style.cursor = 'pointer';
      // });

      // // Change it back to a pan icon when it leaves.     
      // map.current.on('mouseleave', layerName, function () {
      //   map.current.getCanvas().style.cursor = '';
      // });

      // // Onclick events
      // map.current.on('click', layerName, function (e) {
      //   // create a popup card for accident and pedestrian points
      //   if (layerName === 'regions') {
      //     // popup card for accident points
      //     new mapboxgl.Popup()
      //       // popup attributes on the popup card
      //       .setLngLat(e.lngLat)
      //       .setHTML('<h3> Region Details</h3>'
      //         + '<p>Region Name: ' + e.features[0].properties.region_name + '</p>'
      //         + '<p>Tweets Count: ' + e.features[0].properties.count + '</p>'
      //       )
      //       .addTo(map);
      //   } else if (layerName === 'incomes') {
      //     // popup card for pedestrian points
      //     new mapboxgl.Popup()
      //       // popup attributes on the popup card
      //       .setLngLat(e.lngLat)
      //       .setHTML('<h3> SA3 Region Details </h3>'
      //         + '<p>SA3 Name: ' + e.features[0].properties.sa3_name16 + '</p>'
      //         + '<p>SA3 Code: ' + e.features[0].properties.sa3_code_2016 + '</p>'
      //         + '<p>Total Incomes: ' + e.features[0].properties.income_aud + '</p>')
      //       .addTo(map);
      //   }

      //   // functions that move the camera to the selected location
      //   map.current.flyTo({
      //     center: e.features[0].geometry.coordinates,
      //     zoom: 15
      //   });
      // });
      // }
    });

    map.current.addControl(new mapboxgl.NavigationControl());       // add a navigation side bar
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-right');     // add a scale of the map

    
  }, []);

  

  return (
    

    <Layout style={{ minHeight: '100vh' }}>
      <SidePanel />
      <Layout>
        <div className='sidebar'>
          <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
        </div>
        <div ref={mapContainer} className="map-container" />

        <div id="income-legend" class="legend">
          <div>Total amount of incomes</div>
          <div class="bar" style={{ background: 'linear-gradient', color: '#08306b' }}></div>
          <p1>0</p1>
          <p2>280000000</p2>
        </div>
      </Layout>
    </Layout>


  );

  
}