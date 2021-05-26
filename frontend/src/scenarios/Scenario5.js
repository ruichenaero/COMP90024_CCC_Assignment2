import React, { Component, useEffect, useState, useRef } from 'react';
import SidePanel from "../components/SidePanel";
import '../App.css';
import { Layout } from 'antd';
import Regions from '../data/sentiment_scatter.json';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { hideLayer, displayLayer } from '../components/LayerUtils';

const { Header, Content, Footer, Sider } = Layout;

mapboxgl.accessToken = 'pk.eyJ1IjoieWlmZXlhbmcxIiwiYSI6ImNrb251MG44ZzA0Njkyd3BweWFyMWJvcjYifQ.oEO3lpWd3GLwRu13euHIvA';

export default function Scenario5() {
    const regions = Regions;

    const scores = Regions.features.map(region => {
        return parseInt(region.properties.sentiment_score);
    });

    const sentiment_neg = Regions.features.filter(region => 
             region.properties.sentiment_score < 0
       
    );

    const sentiment_normal = Regions.features.filter(region =>
             region.properties.sentiment_score > 10 && region.properties.sentiment_score < 30
       
    );

    const sentiment_pos = Regions.features.filter(region => 
             region.properties.sentiment_score > 30
       );

    console.log(sentiment_neg);
    console.log(sentiment_normal);
    console.log(sentiment_pos);


    const math = require("mathjs");
    const maxScore = math.max(scores);
    const minScore = math.min(scores);
    const add = (maxScore - minScore) / 2;

    var mapContainer = useRef(null);
    var map = useRef(null);
    const [lng, setLng] = useState(145.3607);
    const [lat, setLat] = useState(-37.8636);
    const [zoom, setZoom] = useState(9.4);

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
            map.current.loadImage('https://i.loli.net/2021/05/27/fdgFmaCWxSXhy6O.png', function (error, image) {
                    if (error) throw error;
                    map.current.addImage('happy', image); //38x55px, shadow adds 5px
                });

                map.current.loadImage('https://i.loli.net/2021/05/27/vt8ngBa6jk1dW9i.png', function (error, image) {
                    if (error) throw error;
                    map.current.addImage('normal', image); //38x55px, shadow adds 5px
                });

                map.current.loadImage('https://i.loli.net/2021/05/27/hKVx2iHMswZo1Dt.png', function (error, image) {
                    if (error) throw error;
                    map.current.addImage('sad', image); //38x55px, shadow adds 5px
                });
            if (!map.current.getLayer('sentiment-scatter-neg')) {
                map.current.addSource('sentiment-scatter-neg', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: sentiment_neg.map(region => {
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

                map.current.addLayer({
                    'id': 'sentiment-scatter-neg',
                    'type': 'symbol',
                    'source': 'sentiment-scatter-neg',
                    'layout': {
                        'icon-image': 'sad',
                        'icon-size': 0.05,
                    }
                });

            }

             if (!map.current.getLayer('sentiment-scatter-normal')) {
                    map.current.addSource('sentiment-scatter-normal', {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: sentiment_normal.map(region => {
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


                map.current.addLayer({
                    'id': 'sentiment-scatter-normal',
                    'type': 'symbol',
                    'source': 'sentiment-scatter-normal',
                    'layout': {
                        'icon-image': 'normal',
                        'icon-size': 0.05,
                    }
                });
            } else {
                displayLayer(map, 'sentiment-scatter');
            }
            
            if (!map.current.getLayer('sentiment-scatter-pos')) {
                map.current.addSource('sentiment-scatter-pos', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: sentiment_pos.map(region => {
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
                
                map.current.addLayer({
                    'id': 'sentiment-scatter-pos',
                    'type': 'symbol',
                    'source': 'sentiment-scatter-pos',
                    'layout': {
                        'icon-image': 'happy',
                        'icon-size': 0.05,
                    }
                });
            } else {
                displayLayer(map, 'sentiment-scatter');
            }
            map.current.addControl(new mapboxgl.NavigationControl());       // add a navigation side bar
            map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-right');     // add a scale of the map
        
        });
    }, []);
    //['interpolate', ['linear'], ['get', 'sentiment_score'], -30, 'sad', -10, 'normal', 10, 'happy'],

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SidePanel />
            <Layout className="site-layout">
                <div ref={mapContainer} className="map-container" />
            </Layout>
        </Layout>
    );

}