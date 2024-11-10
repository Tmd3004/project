// import React, { useEffect } from "react";
// import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import classNames from "classnames/bind";
// import Styles from "./MapComponent.module.scss";

// const cx = classNames.bind(Styles)

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

// const Routing = ({ pointA, pointB, pointC }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (!map) return;

//     const routingControl = L.Routing.control({
//       waypoints: [
//         L.latLng(pointA[0], pointA[1]),
//         L.latLng(pointB[0], pointB[1]),
//         L.latLng(pointC[0], pointC[1]),
//       ],
//       routeWhileDragging: true,
//     }).addTo(map);

//     // return () => {
//     //   if (map && routingControl) {
//     //     map.removeControl(routingControl);
//     //   }
//     // };
//   }, [map, pointA, pointB, pointC]);

//   return null;
// };

// const MapComponent = () => {
//   const pointA = [16.061501216128715, 108.22759738994057];
//   const pointB = [16.00438243560803, 108.26433785346067];
//   const pointC = [15.995342053911218, 107.99608495160751];

//   return (
//     <div className={cx("wrapper")}>
//       <MapContainer
//         center={pointA}
//         zoom={13}
//         style={{ height: "600px", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={pointA}></Marker>
//         <Marker position={pointB}></Marker>
//         <Marker position={pointC}></Marker>

//         <Routing pointA={pointA} pointB={pointB} pointC={pointC} />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapComponent;

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import classNames from "classnames/bind";
import Styles from "./MapComponent.module.scss";

const cx = classNames.bind(Styles);

mapboxgl.accessToken =
  "pk.eyJ1IjoidG1kdWMiLCJhIjoiY20zOHdxbGV0MHB4cDJsczU0cGRmNTNxbCJ9.oZhLOU3RCPxrC5md6PgIuA"; // Thay bằng API Key của bạn

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(108.2203);
  const [lat, setLat] = useState(16.0471);
  const [zoom, setZoom] = useState(12);
  const activeItems = JSON.parse(localStorage.getItem("activeItem")) || [];

  console.log(activeItems);

  const locations = activeItems?.map((item) => ({
    name: item.name,
    coordinates: [
      parseFloat(item.location.lat),
      parseFloat(item.location.long),
    ],
  }));

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
      alternatives: true,
      interactive: false,
      congestion: true,
      language: "vi",
    });

    map.addControl(directions, "top-left");

    map.on("load", () => {
      locations.forEach((location, index) => {
        if (index === 0) {
          directions.setOrigin(location.coordinates);
        } else if (index === locations.length - 1) {
          directions.setDestination(location.coordinates);
        } else {
          directions.addWaypoint(index - 1, location.coordinates);
        }

        new mapboxgl.Marker()
          .setLngLat(location.coordinates)
          .setPopup(new mapboxgl.Popup().setText(location.name))
          .addTo(map);
      });
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "600px" }} />
    </div>
  );
};

export default MapComponent;
