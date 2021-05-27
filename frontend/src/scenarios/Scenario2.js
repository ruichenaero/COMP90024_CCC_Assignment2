//
// Team: Team 47
// City: Melbourne
// Xiaoyu Wu (1218098)    
// Yifei Yang (1136477)
// Rui Chen (1100500)
// Wenhai Huo (1101297)
// Jingyuan Ma (988014)
//

import React, { Component, useEffect, useState, useRef } from 'react';
import SidePanel from "../components/SidePanel";
import { Layout, Breadcrumb } from 'antd';
import '../App.css';
//import { Bar } from 'react-chartjs-2';
import Regions from '../data/region_sport_count.json';
//import { map, staticLayers, additionLayers, mapContainer } from '../Map';
import { hideLayer, displayLayer } from '../components/LayerUtils';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
//import { StoreContext } from '../BaseMap';

const regions = Regions;
const counts = Regions.features.map(region => {
  return parseInt(region.properties.count);
});

const math = require("mathjs");
const maxCount = math.max(counts);
const minCount = math.min(counts);
const add = (maxCount - minCount) / 5;

const { Header, Content, Footer, Sider } = Layout;

mapboxgl.accessToken = 'pk.eyJ1IjoieWlmZXlhbmcxIiwiYSI6ImNrb251MG44ZzA0Njkyd3BweWFyMWJvcjYifQ.oEO3lpWd3GLwRu13euHIvA';
export default function Scenario2() {
  var mapContainer = useRef(null);
  var map = useRef(null);
  const [lng, setLng] = useState(145.3607);
  const [lat, setLat] = useState(-37.8636);
  const [zoom, setZoom] = useState(9.4);

  useEffect(() => {
    axios.get(`http://172.26.129.170:80/api/region_topic_count/sport/`)
      .then(res => {
        setIsLoaded(true);
        setCountState({ name: res.data.name });
        console.log(res.data.name);
      }, (error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [setCountState]);

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
      if (!map.current.getLayer('regions-sport')) {
        map.current.addSource('regions-sport', {
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
          'id': 'regions-sport',
          'type': 'circle',
          'source': 'regions-sport',
          'paint': {
            'circle-color': ['interpolate', ['linear'], ['get', 'count'], minCount, '#fdae6b', math.round(minCount + add), '#fd8d3c', math.round(minCount + add * 2), '#f16913', math.round(math.round(minCount + add * 3)), '#d94801', math.round(minCount + add * 4), '#a63603', maxCount, '#7f2704'],
            'circle-opacity': 0.45,
            'circle-radius': ['interpolate', ['linear'], ['get', 'count'], minCount, 15, math.round(minCount + add), 30, math.round(minCount + add * 2), 60, math.round(minCount + add * 3), 90, math.round(minCount + add * 4), 105, maxCount, 120]

          }
        });
        //additionLayers.push('regions-sport')
      } else {
        displayLayer(map, 'regions-sport');
      }
      map.current.addControl(new mapboxgl.NavigationControl());       // add a navigation side bar
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-right');     // add a scale of the map


    });
  }, []);




  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidePanel />
      <Layout className="site-layout">


        <div ref={mapContainer} className="map-container" />


      </Layout>
    </Layout>
  );
}