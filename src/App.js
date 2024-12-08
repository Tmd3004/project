import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MapComponent from "./components/MapComponent/MapComponent";
import MapPointing from "./components/MapPointing/MapPointing";
import MapTrending from "./components/MapTrending/MapTrending";

const App = () => {
  return (
    <div className="wrapper">
      <div className="header">
        <a href="/travel" className="home-link">
          <FontAwesomeIcon icon={faHouse} className="home-btn" />
        </a>
        <span className="logo">Travel Maps</span>
      </div>
      <div className="body">
        <Routes>
          <Route path="/travel" element={<Home />} />
          <Route path="/travel/map" element={<MapComponent />} />
          <Route path="/travel/map-point" element={<MapPointing />} />
          <Route path="/travel/map-trending" element={<MapTrending />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
