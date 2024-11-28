import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
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
  const [selectedPoints, setSelectedPoints] = useState([]);

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
        console.log(item);
        const coordinates = item?.latlng
          ? extractCoordinates(item.latlng)
          : await getLatLng(item.address);
        return {
          name: item.title,
          address: item.address,
          description: item.describe,
          review: item.overall_review,
          rate: item.rate,
          type: item.type,
          link: item.link,
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
      locations.forEach((location) => {
        const popup = new mapboxgl.Popup({ offset: 0 }).setHTML(
          `</p><div style="font-size: 14px; line-height: 1.5">
          <h3 style="margin: 0;">${location.name}</h3>
          <p><strong>Địa chỉ:</strong> ${location.address}</p>
          <p><strong>Mô tả:</strong> ${location.description}</p>
          <p><strong>Nhận xét:</strong> ${location.review}</p>
          <p><strong>Đánh giá:</strong> ${location.rate}</p>
          <p><strong>Điểm đến:</strong> ${location.type}</p>
          ${
            location.link
              ? `<p><a href="${location.link}" target="_blank" style="color: #1E90FF;">Link</a></p>`
              : ""
          }
        </div>`
        );

        const marker = new mapboxgl.Marker()
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map);

        marker.getElement().addEventListener("click", () => {
          setSelectedPoints((prev) => {
            const updatedPoints = [...prev, location.coordinates];
            if (updatedPoints.length === 1) {
              directions.setOrigin(updatedPoints[0]);
            } else if (updatedPoints.length === 2) {
              directions.setDestination(updatedPoints[1]);
            } else {
              directions.setDestination(
                updatedPoints[updatedPoints.length - 1]
              );
              directions.addWaypoint(
                updatedPoints.length - 2,
                updatedPoints[updatedPoints.length - 2]
              );
            }
            return updatedPoints;
          });
        });
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
