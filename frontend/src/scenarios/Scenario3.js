import React, { Component } from 'react';
import SidePanel from "../components/SidePanel";
import { Layout, Breadcrumb } from 'antd';
import '../App.css';
import { Bar } from 'react-chartjs-2';
import Income_data from '../data/Income_data.json';
import Regions from '../data/region_sentiment_count.json';
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

export default function Scenario3() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SidePanel />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

          </div>
          <div ref={mapContainer} className="map-container" />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );

}