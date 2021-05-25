import React, { Component, useRef, useEffect, useState } from 'react';
import SidePanel from "./components/SidePanel";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Layout } from 'antd';
import Hospital_Statistics from './data/Hospital_Statistics.json';
//port hospital from './data/hospital.json';
import Regions from './data/region_covid_count.json';
import axios from "axios";

mapboxgl.accessToken = 'pk.eyJ1IjoieWlmZXlhbmcxIiwiYSI6ImNrb251MG44ZzA0Njkyd3BweWFyMWJvcjYifQ.oEO3lpWd3GLwRu13euHIvA';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
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
  const add = (maxCount-minCount)/5;

   const colors = ['#b3d9ff', '#80bfff','#4da6ff', '#1a8cff', '#0073e6', '#0059b3'];
   const colorClasses = getCountRange(regions, colors);


  function getCountRange(source, colors) {
    var phvals = source.features.map(f => f.properties.count);
    var min = Math.min(...phvals);
    var max = Math.max(...phvals);
    var range = max-min;

    var iter = 0;
    var colorClasses = [];
    var len = colors.length;
    colors.forEach(element => {
        iter += 1;
        colorClasses.push(min+(iter/len)*range)
        colorClasses.push(element)
    });

    return (colorClasses);
  }


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

    console.log(aurinData);

    map.current.on('load', () => {
      map.current.loadImage('https://i.loli.net/2021/05/25/rdNiyRkwZWafj5x.png', function (error, image) {
                    if (error) throw error;
                    map.current.addImage('exclamation', image); //38x55px, shadow adds 5px
        
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
                  coordinates: aurinData.geometry.coordinates,
                },
              };
            }),
          },
        });
      
        map.current.addSource('regions', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: regions.features.map(region => {
              return {
                type: 'Feature',
                properties: {
                  radius: region.properties.radius,
                  count: region.properties.count,
                },
                geometry: {
                  type: 'Point',
                  coordinates: region.geometry.coordinates,
                 },
                };
              }),
            },  
        });
      

        map.current.addLayer({
          'id': 'hospitals_loc',
          /*'type': 'circle',
          'source': 'hospital_location',
          'layout': {
            // Make the layer visible by default.
            'visibility': 'visible'
          },
          'paint': {
            'circle-radius': 8,
            'circle-color': 'rgba(55,148,179,1)',
          },*/
          'type': 'symbol',
          'source': 'hospital_location',
          'layout': {
            // Make the layer visible by default.
            'icon-image': 'exclamation',
            'icon-size': 0.05,
           
          },
          
          //'source-layer': 'museum-cusco'
          //rgba(55,148,179,1)
        });

      map.current.addLayer({
        'id': 'regions',
        'type': 'circle',
        'source': 'regions',
        //'source-layer': 'melbourne_region-4ej08l',
        'paint': {
          //'circle-radius': 100,
          //'circle-color': '#223b53',
            'circle-color': ['interpolate', ['linear'], ['get', 'count'], minCount, '#fdae6bf', math.round(minCount+add), '#fd8d3c', math.round(minCount+add*2), '#f16913', math.round(math.round(minCount+add*3)), '#d94801',  math.round(minCount+add*4), '#a63603', maxCount,  '#7f2704'],
            'circle-opacity': 0.45,
            //'circle-stroke-color': 'black'
        }
      });
    });
  }, []);


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidePanel />
      <Layout>
        <div className='sidebar'>
          <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
        </div>
        <div ref={mapContainer} className="map-container" />
      </Layout>
    </Layout>
  );
}