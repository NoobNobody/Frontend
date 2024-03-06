import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import './heat_map_chart.css';

const HeatmapLayer = ({ data }) => {
    const map = useMap();

    React.useEffect(() => {
        if (!map) return;

        const maxEarnings = Math.max(...data.map(item => item.AverageEarnings));
        const minEarnings = Math.min(...data.map(item => item.AverageEarnings));

        const points = data.map(item => {
            const intensity = (item.AverageEarnings - minEarnings) / (maxEarnings - minEarnings);
            return [item.Coordinates.lat, item.Coordinates.lng, intensity];
        });

        const heatLayer = L.heatLayer(points, {
            radius: 30,
            blur: 25,
            maxZoom: 1,
            max: 1,
            minOpacity: 0.7
        }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map, data]);

    return null;
};


const HeatMapChart = ({ data }) => {
    const position = [52.0693, 19.4803];

    return (

        <div className="heatmap-container">
            <h2 className="heatmap-title">Rozmieszczenie średniej zarobków w lokalizacjach</h2>
            <MapContainer center={position} zoom={6} className="leaflet-container">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <HeatmapLayer data={data} />
            </MapContainer>
        </div>
    );
};

export default HeatMapChart;
