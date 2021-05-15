import React, { useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import '../App.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  ProjectOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function SidePanel () {
  
  const [collapsed, setCollapsed] = useState(false);
  /*
  state = {
    collapsed: false,
  };*/
  /*
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  const { collapsed } = this.state;
  */
    function onCollapse() {
      setCollapsed(!collapsed);
    } 

    return (
      
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo"></div>
          <Menu theme="dark" mode="inline" >
            <div style={{ height: 80 }}></div>
            <Menu.Item key="1" icon={<HomeOutlined />}>
                <NavLink to="/" >Visualisation</NavLink>
            </Menu.Item>
            <SubMenu key="sub1" icon={<ProjectOutlined />} title="Scenarios">
              <Menu.Item key="2" icon={<PieChartOutlined />}><NavLink to="/Scenario1">Scenario 1</NavLink></Menu.Item>
              <Menu.Item key="3"><NavLink to="/Scenario2">Scenario 2</NavLink></Menu.Item>
              <Menu.Item key="4">Scenario 3</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      
    );
  
}