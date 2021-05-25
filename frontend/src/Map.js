import React, { Component, useRef, useEffect, useState } from 'react';
import SidePanel from "./components/SidePanel";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Layout } from 'antd';
import Hospital_Statistics from './data/Hospital_Statistics.json';
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

  /*
  const getData=()=>{
    fetch('/Hospital_Statistics.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        //console.log(myJson);
        setAurinData(myJson.features)
        console.log(myJson.features);
      });
  }
  */


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/yifeyang1/ckoo0ifyg0vrn17o15ro2bicw/draft',
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

  /*
  useEffect(()=>{
      getData();
      setIsLoaded(true);
      
  }, [setAurinData]);*/
  /*
    useEffect(()=>{
    axios.get('/Hospital_Statistics.json')
        .then(res => {
          setIsLoaded(true);
          setAurinData(res.data.features);
          console.log(aurinData);
        }, (error) => {
          setIsLoaded(true);
          //setError(error);
      });
     }, [setAurinData]);*/

  useEffect(() => {

    console.log(aurinData);

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