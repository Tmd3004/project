import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import classNames from "classnames/bind";
import Styles from "./MapPointing.module.scss";
import axios from "axios";

const cx = classNames.bind(Styles);

mapboxgl.accessToken =
  "pk.eyJ1IjoidG1kdWMiLCJhIjoiY20zOHdxbGV0MHB4cDJsczU0cGRmNTNxbCJ9.oZhLOU3RCPxrC5md6PgIuA";
const apiKey = "rszoRtOE3Bm3ihRyvOY4ycp2tG22VvhgL9ki5Yu3mZM";

const MapPointing = () => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(108.2203);
  const [lat, setLat] = useState(16.0471);
  const [zoom, setZoom] = useState(12);
  const [locations, setLocations] = useState([]);
  const activeItems = JSON.parse(localStorage.getItem("dataPoints")) || [];

  const extractCoordinates = (data) => {
    return data
      .split(",")
      .map((coord) => parseFloat(coord.trim()))
      .reverse();
  };

  const getLatLng = async (address) => {
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
      address
    )}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (
        response.data &&
        response.data.items &&
        response.data.items.length > 0
      ) {
        const { lat, lng } = response.data.items[0].position;
        return [lng, lat];
      }
    } catch (err) {
      console.log("Đã xảy ra lỗi ", err);
      return null;
    }
  };

  const getLocations = async () => {
    const locations = await Promise.all(
      activeItems?.map(async (item) => {
        const coordinates = item?.latlng
          ? extractCoordinates(item.latlng)
          : await getLatLng(item.address);
        return {
          name: item.title,
          coordinates,
        };
      })
    );
    return locations;
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const locationData = await getLocations();
      setLocations(locationData);
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (locations.length === 0) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("load", () => {
      locations.forEach((location) => {
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
  }, [locations]);

  return (
    <div className={cx("wrapper")}>
      <div ref={mapContainerRef} style={{ width: "100%", height: "600px" }} />
    </div>
  );
};

export default MapPointing;
