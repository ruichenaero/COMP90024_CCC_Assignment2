import React, { Component, useEffect, useState, useRef } from 'react';
import SidePanel from "../components/SidePanel";
import '../App.css';
import { Layout, Breadcrumb } from 'antd';
import Regions from '../data/sentiment_scatter.json';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

const { Header, Content, Footer, Sider } = Layout;

export default function Scenario5() {
    const regions = Regions;

    var mapContainer = useRef(null);
    var map = useRef(null);
    const [lng, setLng] = useState(145.3607);
    const [lat, setLat] = useState(-37.8636);
    const [zoom, setZoom] = useState(7.96);

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

    useEffect(() => {
        map.current.on('load', () => {
            if (!map.current.getLayer('sentiment-scatter')) {
                map.current.addSource('sentiment-scatter', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: regions.features.map(region => {
                            return {
                                type: 'Feature',
                                properties: {
                                    sentiment_score: region.properties.sentiment_score,
                                },
                                geometry: {
                                    type: 'Point',
                                    coordinates: region.geometry.coordinates,
                                },
                            };
                        }),
                    },
                });

                map.current.loadImage('https://i.loli.net/2021/05/26/jciaY8rfIw49POK.png', function (error, image) {
                    if (error) throw error;
                    map.current.addImage('happy', image); //38x55px, shadow adds 5px
                });

                map.current.loadImage('https://i.loli.net/2021/05/26/FXWktYc1mypvbaD.png', function (error, image) {
                    if (error) throw error;
                    map.current.addImage('normal', image); //38x55px, shadow adds 5px
                });

                map.current.loadImage('https://i.loli.net/2021/05/26/dF6ACq1VQ5rxjNG.png', function (error, image) {
                    if (error) throw error;
                    map.current.addImage('sad', image); //38x55px, shadow adds 5px
                });

                map.current.addLayer({
                    'id': 'sentiment-scatter',
                    'type': 'symbol',
                    'source': 'sentiment-scatter',
                    'layout': {
                        'icon-image': ['interpolate', ['linear'], ['get', 'sentiment_score'], -30, 'sad', -10, 'normal', 10, 'happy'],
                        'icon-size': 0.05,
                    }
                });
            } else {
                displayLayer(map, 'regions-sentiment');
            }
        });
    }, []);


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SidePanel />
            <Layout className="site-layout">
                <div ref={mapContainer} className="map-container" />
            </Layout>
        </Layout>
    );

}