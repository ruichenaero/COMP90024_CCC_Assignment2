import React, { Component, useEffect, useState } from 'react';
import SidePanel from "../components/SidePanel";
import { Layout, Breadcrumb } from 'antd';
import '../App.css';
import { Bar } from 'react-chartjs-2';
import Income_data from '../data/Income_data.json';
import Regions from '../data/region_sport_count.json';
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

export default function Scenario2() {

  const [count, setCountState] = useState({ name: '' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

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


  hideLayer(map, 'hospitals_loc');
  displayLayer(map, 'incomes-layer');

  additionLayers.forEach(layer => {
    if (layer != 'regions-sport') {
      hideLayer(map, layer);
    }
  });

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
        'circle-radius': ['interpolate', ['linear'], ['get', 'count'], minCount, 10, math.round(minCount + add), 15, math.round(minCount + add * 2), 20, math.round(minCount + add * 3), 25, math.round(minCount + add * 4), 30, maxCount, 35]
      }
    });
    additionLayers.push('regions-sport')
  } else {
    displayLayer(map, 'regions-sport');
  }

















  const data = {
    labels: Income_data.features.map(income => {
      return income.properties.sa3_name16
    }),
    datasets: [
      {
        label: 'Income aud',
        data: Income_data.features.map(income => {
          return income.properties.income_aud
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };





  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidePanel />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Bar data={data} options={options} />
          </div>
          <div ref={mapContainer} className="map-container" />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}