import React, { Component } from 'react';
import SidePanel from "./components/SidePanel";
import { Layout } from 'antd';

export default function Map() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SidePanel/>
      </Layout>
    );
}