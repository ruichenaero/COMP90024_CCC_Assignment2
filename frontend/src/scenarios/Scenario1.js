import React, { Component, useEffect, useState } from 'react';
import axios from "axios";
import SidePanel from "../components/SidePanel";
import { Layout, Breadcrumb } from 'antd';
import '../App.css';

const { Header, Content, Footer, Sider } = Layout;

export default function Scenario1() {

  const [count, setCountState] = useState({name:''});
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

  useEffect(() => {
    
    axios.get(`http://172.26.128.51:80/api/region_topic_count/food/`)
      .then(res => { 
        setIsLoaded(true); 
        setCountState({name: res.data.name});
        console.log(res.data.name);
      }, (error) => {
          setIsLoaded(true);
          setError(error);
        });
    }, [setCountState]);

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
          </Content>
          
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      
      //</Layout>
    );
  }
}