import React, { Component, useEffect, useState } from 'react';
import axios from "axios";
import SidePanel from "../components/SidePanel";
import { Layout, Breadcrumb } from 'antd';
import '../App.css';
import Regions from '../data/region_food_count.json';
import { map, staticLayers, additionLayers, mapContainer } from '../Map';
import { hideLayer, displayLayer } from '../components/LayerUtils';

const regions = Regions;
const counts = Regions.features.map(region => {
  return parseInt(region.properties.count);
});

const math = require("mathjs");
const maxCount = math.max(counts);
const minCount = math.min(counts);
const add = (maxCount - minCount) / 5;

const { Header, Content, Footer, Sider } = Layout;

export default function Scenario1() {

  const [count, setCountState] = useState({ name: '' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
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

  hideLayer(map, 'hospitals_loc');
  displayLayer(map, 'incomes-layer');

  additionLayers.forEach(layer => {
    if (layer != 'regions-food') {
      hideLayer(map, layer);
    }
  });

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
    additionLayers.push('regions-food')
  } else {
    displayLayer(map, 'regions-food');
  }



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    //console.log(count.name);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SidePanel />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              {count.name}
            </div>
            <div ref={mapContainer} className="map-container" />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      //</Layout>
    );
  }
}