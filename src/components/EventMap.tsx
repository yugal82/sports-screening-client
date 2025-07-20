import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

type EventMapProps = {
  coordinates: [number, number]; // [lng, lat]
  venue: string;
};

const EventMap: React.FC<EventMapProps> = ({ coordinates, venue }) => {
  // Leaflet expects [lat, lng]
  const position: [number, number] = [coordinates[1], coordinates[0]];

  return (
    <MapContainer
      className="z-10"
      center={position}
      zoom={15}
      style={{ height: 300, width: '100%', borderRadius: 12, marginTop: 16 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>{venue}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default EventMap;
