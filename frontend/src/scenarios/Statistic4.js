import React, { Component } from 'react';
import SidePanel from "../components/SidePanel";
import { Layout, Breadcrumb } from 'antd';
import '../App.css';
import { Bar, Pie, Line } from 'react-chartjs-2';
import region_sentiment_count from '../data/region_sentiment_count.json';
import Income_data from '../data/Income_data.json';
import { Row, Col } from 'antd';
import food_time_count from '../data/food_time_count.json';
import sport_time_count from '../data/sport_time_count.json';


const { Header, Content, Footer, Sider } = Layout;

export default function Statistic4() {


    const data = {
        labels: Object.keys(food_time_count),
        datasets: [
          {
            label: 'Count of tweets related to food',
            data: Object.values(food_time_count),
            fill: false,
                backgroundColor: "#fcae91",
                //'rgba(75, 192, 192)',
               
            borderColor: " #e31a1c"
                    //'rgba(75, 192, 192, 0.2)',
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
    
      const data_sport = {
        labels: Object.keys(sport_time_count),
        datasets: [
          {
            label: 'Count of tweets related to sport',
            data: Object.values(sport_time_count),
            fill: false,
                backgroundColor: '#bdc9e1',
                borderColor: "#0570b0",
          },
        ],
      };

      
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <SidePanel/>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Line data={data} options={options} />
                <div style={{ height: 100 }}></div>
                <Line data={data_sport} options={options} />
                <div style={{ height: 100 }}></div>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      );

}