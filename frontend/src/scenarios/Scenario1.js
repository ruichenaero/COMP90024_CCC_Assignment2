import React, { Component, useEffect, useState,useRef } from 'react';
import axios from "axios";
import SidePanel from "../components/SidePanel";
import { Layout, Breadcrumb } from 'antd';
//import { map, staticLayers, additionLayers, mapContainer } from '../Map';
import { hideLayer, displayLayer } from '../components/LayerUtils';
// import { StoreContext } from '../BaseMap';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import regions from '../data/region_food_count.json';

const { Header, Content, Footer, Sider } = Layout;

mapboxgl.accessToken = 'pk.eyJ1IjoieWlmZXlhbmcxIiwiYSI6ImNrb251MG44ZzA0Njkyd3BweWFyMWJvcjYifQ.oEO3lpWd3GLwRu13euHIvA';

export default function Scenario1() {

  var mapContainer = useRef(null);
  var map = useRef(null);
  const [lng, setLng] = useState(145.3607);
  const [lat, setLat] = useState(-37.8636);
  const [zoom, setZoom] = useState(7.96);
  /*
  const { map } = React.useContext(StoreContext);
  const { mapContainer } = React.useContext(StoreContext);
  //const { staticLayers } = React.useContext(StoreContext);
  //const { additionLayers } = React.useContext(StoreContext);

  const regions = Regions;
  const counts = Regions.features.map(region => {
  return parseInt(region.properties.count);
});
*/
const counts = regions.features.map(region =>{
  return region.properties.count
});

const math = require("mathjs");
const maxCount = math.max(counts);
const minCount = math.min(counts);
const add = (maxCount - minCount) / 5;

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


  //const [count, setCountState] = useState({ name: '' });
  //const [isLoaded, setIsLoaded] = useState(false);
  //const [error, setError] = useState(null);
  /*
  const [account, setAccountState] = useState({
    username:'',
    name: '',
    description: '',
    email:'',
    photoUrl: '',
    likeEmail: '',
    commentEmail: '',
  });*/

  // useEffect(() => {
  //   axios.get(`http://172.26.128.51:80/api/region_topic_count/food/`)
  //     .then(res => {
  //       setIsLoaded(true);
  //       setCountState({ name: res.data.name });
  //       console.log(res.data.name);
  //     }, (error) => {
  //       setIsLoaded(true);
  //       setError(error);
  //     });
  // }, [setCountState]);

  /*
  axios.get(`http://localhost:8000/account/${window.location.pathname.split('/')[2]}`)
    .then(res => {
      setIsLoaded(true);
      setAccountState({ username:res.data.account.username, name: res.data.account.name, 
                        description:res.data.account.description, email:res.data.account.email,
                        photoUrl: res.data.account.photoUrl, likeEmail:res.data.account.likeEmail,
                        commentEmail:res.data.account.commentEmail});
      setLikeEmail(res.data.account.likeEmail);
      setCommentEmail(res.data.account.commentEmail);
      if (res.data.account.hasOwnProperty('photoUrl')){
         setHasPhoto(true);
      }
    }, (error) => {
      setIsLoaded(true);
      setError(error);
  });
 }, [setAccountState]); */
 /*
 useEffect(() => {
  hideLayer(map, 'hospitals_loc');
  displayLayer(map, 'incomes-layer');
  /*
  additionLayers.forEach(layer => {
    if (layer != 'regions-food') {
      hideLayer(map, layer);
    }
  });
 */
  useEffect(() => {
    map.current.on('load', () => {
  if (!map.current.getLayer('regions-food')) {
    map.current.addSource('regions-food', {
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
      'id': 'regions-food',
      'type': 'circle',
      'source': 'regions-food',
      'paint': {
        'circle-color': ['interpolate', ['linear'], ['get', 'count'], minCount, '#fdae6b', math.round(minCount + add), '#fd8d3c', math.round(minCount + add * 2), '#f16913', math.round(math.round(minCount + add * 3)), '#d94801', math.round(minCount + add * 4), '#a63603', maxCount, '#7f2704'],
        'circle-opacity': 0.45,
        'circle-radius': ['interpolate', ['linear'], ['get', 'count'], minCount, 10, math.round(minCount + add), 15, math.round(minCount + add * 2), 20, math.round(minCount + add * 3), 25, math.round(minCount + add * 4), 30, maxCount, 35]
      }
    });
    //additionLayers.push('regions-food')
  } else {
    displayLayer(map, 'regions-food');
  }
});

  map.current.addControl(new mapboxgl.NavigationControl());       // add a navigation side bar
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-right');     // add a scale of the map

}, []);

  
    //console.log(count.name);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SidePanel />
        <Layout className="site-layout">
        <div className='sidebar'>
          <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
        </div>
        <div ref={mapContainer} className="map-container" />
          
        </Layout>
      </Layout>
    );
  }
