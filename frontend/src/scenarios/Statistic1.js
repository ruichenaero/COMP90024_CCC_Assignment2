import React, { Component } from 'react';
import SidePanel from "../components/SidePanel";
import { Layout, Breadcrumb } from 'antd';
import '../App.css';
import { Bar, Pie } from 'react-chartjs-2';
import region_food_count from '../data/region_food_count.json';
import Income_data from '../data/Income_data.json';
import { Chart } from "react-google-charts";
import { Row, Col } from 'antd';


const { Header, Content, Footer, Sider } = Layout;

export default function Statistic1() {
    const food_data = {
      labels: region_food_count.features.map(row => {
        return row.properties.region_name
        }),
      datasets: [
        {
          label: 'Region food count',
          data: region_food_count.features.map(row => {
            return row.properties.count
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
  
    const food_options = {
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


    const income_data = {
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
    
    const income_options = {
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
  

    const data_pie = {
      labels: region_food_count.features.map(row => {
          return row.properties.region_name
          }),
      datasets: [
        {
          label: 'Region sentiment count',
          data: region_food_count.features.map(row => {
              return row.properties.count
              }),
          backgroundColor: [
            'rgba(255, 0, 0, 0.8)',
            'rgba(255, 153, 0, 0.8)',
            'rgba(255, 204, 0, 0.8)',
            'rgba(0, 153, 0, 0.8)',
            'rgba(0, 102, 204, 0.8)',
            'rgba(102, 0, 204, 0.8)',
            'rgba(255, 80, 132, 0.8)',
          ],
          borderColor: [
            'rgba(255, 0, 0, 0.8)',
            'rgba(255, 153, 0, 0.8)',
            'rgba(255, 204, 0, 0.8)',
            'rgba(0, 153, 0, 0.8)',
            'rgba(0, 102, 204, 0.8)',
            'rgba(102, 0, 204, 0.8)',
            'rgba(255, 80, 132, 0.8)',
          ],
          borderWidth: 1,
        },
      ],
    };
    
    const region_names = region_food_count.features.map(row => {
      return row.properties.region_name
      });
    const count = region_food_count.features.map(row => {
      return row.properties.count
      });
    
      /*
    const data_food = [['region_name', 'count']];

    var i;
    for (i = 0; i < region_names; i++) {
      data_food.push([region_names[i], count[i]]);
      console.log(region_names[i], count[i]);
    }

    console.log(data_food);
*/
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <SidePanel/>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  <Bar data={income_data} options={income_options} style={{ width: 700,height: 300 }}/>
                  <div style={{ height: 100 }}></div>
                  <Bar data={food_data} options={food_options} style={{ width: 850,height: 450}}/>
                  <div style={{ height: 100 }}></div>
                  <Row>
                     <Col span={12} offset={6}>
                     <Pie data={data_pie} style={{ height: 700, width: 700 }}/>
                     </Col>
                  </Row>
                  
                  
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      );

}