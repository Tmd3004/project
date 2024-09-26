import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Styles from "./MapComponent.module.scss";
import classNames from "classnames/bind";
import customIconUrl from "../img/icon.png";

const cx = classNames.bind(Styles);

// Import icon

// Tạo icon mới
const customIcon = L.icon({
  iconUrl: customIconUrl,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

const markers = [
  { position: [16.0615, 108.2270], popUp: "Cầu Rồng" },
  { position: [16.1039, 108.3001], popUp: "Chùa Linh Ứng" },
  { position: [15.9960, 107.9960], popUp: "Bà Nà Hills" },
];

const MapComponent = () => {
  return (
    <div className={cx("wrapper")}>
      <MapContainer
        center={[16.0615, 108.2270]}
        zoom={13}
        style={{ height: "100vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker position={marker.position} icon={customIcon} key={index}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
