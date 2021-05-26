import React, { useEffect, useState, useRef } from 'react';
import SidePanel from "../components/SidePanel";
import { Layout, Breadcrumb } from 'antd';
import '../App.css';
import Regions from '../data/region_covid_count.json';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { displayLayer, hideLayer } from '../components/LayerUtils';
import Hospital_Statistics from '../data/Hospital_Statistics.json';


const { Header, Content, Footer, Sider } = Layout;

export default function Scenario6() {
    //const { map } = React.useContext(StoreContext);
    //const { mapContainer } = React.useContext(StoreContext);
    const aurinData = Hospital_Statistics.features;
    const regions = Regions;
    const counts = Regions.features.map(region => {
        return parseInt(region.properties.count);
    });

    const math = require("mathjs");
    const maxCount = math.max(counts);
    const minCount = math.min(counts);
    const add = (maxCount - minCount) / 5;

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
/*
    useEffect(() => {
        map.current.on('load', () => {
            hideLayer(map, 'income-layer');
            displayLayer(map, 'hospitals-loc');

            if (!map.current.getLayer('regions-sentiment')) {
                map.current.addSource('regions-sentiment', {
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
                    'id': 'regions-sentiment',
                    'type': 'circle',
                    'source': 'regions-sentiment',
                    'paint': {
                        'circle-color': ['interpolate', ['linear'], ['get', 'count'], minCount, '#fdae6b', math.round(minCount + add), '#fd8d3c', math.round(minCount + add * 2), '#f16913', math.round(math.round(minCount + add * 3)), '#d94801', math.round(minCount + add * 4), '#a63603', maxCount, '#7f2704'],
                        'circle-opacity': 0.45,
                        'circle-radius': ['interpolate', ['linear'], ['get', 'count'], minCount, 10, math.round(minCount + add), 15, math.round(minCount + add * 2), 20, math.round(minCount + add * 3), 25, math.round(minCount + add * 4), 30, maxCount, 35]
                    }
                });
                //additionLayers.push('regions-sport')
            } else {
                displayLayer(map, 'regions-sentiment');
            }
        });
    }, []);*/
    useEffect(() => {
        map.current.on('load', () => {
          map.current.loadImage('https://i.loli.net/2021/05/25/rdNiyRkwZWafj5x.png', function (error, image) {
            if (error) throw error;
            map.current.addImage('exclamation', image); //38x55px, shadow adds 5px
          });
    
          map.current.addSource('hospital_location', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: aurinData.map(hospital => {
                return {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: hospital.geometry.coordinates,
                  },
                };
              }),
            },
          });
    
          map.current.addLayer({
            'id': 'hospitals_loc',
            'type': 'symbol',
            'source': 'hospital_location',
            'layout': {
              // Make the layer visible by default.
              'icon-image': 'exclamation',
              'icon-size': 0.05,
            },
          });
          //staticLayers.push('hospitals_loc');
    
          map.current.getLayer('income-layer');
          //staticLayers.push('income-layer');
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