import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MapComponent from "./components/MapComponent/MapComponent";

const App = () => {
  return (
    <div className="wrapper">
      <div className="header">
        <a href="/" className="home-link">
          <FontAwesomeIcon icon={faHouse} className="home-btn" />
        </a>
        <span className="logo">HY</span>
      </div>
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapComponent />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
