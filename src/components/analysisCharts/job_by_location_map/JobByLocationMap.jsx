import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './job_by_location_map.css';

const LocationMarkersLayer = ({ data }) => {
    const map = useMap();

    React.useEffect(() => {
        if (!map || !data) return;

        const offersByLocationName = data.reduce((acc, offer) => {
            const key = offer.name;
            if (!acc[key]) {
                acc[key] = {
                    count: offer.count,
                    lat: offer.Coordinates.lat,
                    lng: offer.Coordinates.lng,
                    name: offer.name
                };
            } else {
                acc[key].count += offer.count;
                acc[key].lat = (acc[key].lat + offer.Coordinates.lat) / 2;
                acc[key].lng = (acc[key].lng + offer.Coordinates.lng) / 2;
            }
            return acc;
        }, {});

        Object.values(offersByLocationName).forEach(location => {
            if (location.count > 100) {
                const marker = L.marker([location.lat, location.lng])
                    .bindPopup(`${location.name}, ${location.count} ofert`)
                    .addTo(map);
            }
        });

        return () => {
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
        };
    }, [map, data]);

    return null;
};

const JobByLocationMap = ({ data }) => {
    const position = [52.0693, 19.4803];

    return (
        <div className="map-container">
            <h2 className="map-title">Najpopularniejsze lokalizacje ofert pracy</h2>
            <MapContainer center={position} zoom={6} className="leaflet-container">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarkersLayer data={data} />
            </MapContainer>
        </div>
    );
};

export default JobByLocationMap;
