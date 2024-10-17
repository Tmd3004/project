import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import classNames from "classnames/bind";
import Styles from "./MapComponent.module.scss";

const cx = classNames.bind(Styles)

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Routing = ({ pointA, pointB, pointC }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(pointA[0], pointA[1]),
        L.latLng(pointB[0], pointB[1]),
        L.latLng(pointC[0], pointC[1]),
      ],
      routeWhileDragging: true,
    }).addTo(map);

    // return () => {
    //   if (map && routingControl) {
    //     map.removeControl(routingControl);
    //   }
    // };
  }, [map, pointA, pointB, pointC]);

  return null;
};

const MapComponent = () => {
  const pointA = [16.061501216128715, 108.22759738994057];
  const pointB = [16.00438243560803, 108.26433785346067]; 
  const pointC = [15.995342053911218, 107.99608495160751]; 

  return (
    <div className={cx("wrapper")}>
      <MapContainer
        center={pointA}
        zoom={13}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={pointA}></Marker>
        <Marker position={pointB}></Marker>
        <Marker position={pointC}></Marker>

        <Routing pointA={pointA} pointB={pointB} pointC={pointC} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
