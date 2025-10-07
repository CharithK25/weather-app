import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface Props {
  lat: number;
  lon: number;
  city: string;
}

export const CityMap: React.FC<Props> = ({ lat, lon, city }) => {
  return (
    <div style={{ height: "300px", width: "100%", marginTop: "1rem" }}>
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>{city}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
