import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faStar } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const App = () => {
  const [search, setSearch] = useState(false);

  return (
    <div className="wrapper">
      <div className="header">
        <a href="/" className="home-link">
          <FontAwesomeIcon icon={faHouse} className="home-btn" />
        </a>
        <span className="logo">HY</span>
      </div>
      <div className="body">
        <h3 className="body-title">Gợi ý các địa điểm bạn có thể lựa chọn</h3>
        <div className="location-list">
          <div className="location-item">
            <img
              src="/assets/image/cau-rong.jpg"
              alt="location"
              className="location-item-img"
            />
            <div className="location-item-body">
              <div className="location-item-desc">
                <span className="location-item-name">Cầu Rồng</span>
                <span className="location-item-title">Mô tả: </span>
                <span className="location-item-content">
                  Cầu Rồng là cây cầu nổi tiếng bắc qua sông Hàn, với thiết kế
                  hình rồng khổng lồ phun lửa và nước vào các buổi tối cuối
                  tuần, là biểu tượng hiện đại của Đà Nẵng.
                </span>
              </div>
              <div className="location-item-review">
                <span className="location-item-title">Đánh giá:</span>
                <span className="location-item-content">
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                </span>
              </div>
            </div>
          </div>

          <div className="location-item">
            <img
              src="/assets/image/chua-linh-ung.jpg"
              alt="location"
              className="location-item-img"
            />
            <div className="location-item-body">
              <div className="location-item-desc">
                <span className="location-item-name">Chùa Linh Ứng</span>
                <span className="location-item-title">Mô tả: </span>
                <span className="location-item-content">
                  Nằm trên bán đảo Sơn Trà, chùa Linh Ứng là ngôi chùa lớn nhất
                  tại Đà Nẵng với tượng Phật Quan Thế Âm cao 67m nhìn ra biển,
                  thu hút rất nhiều du khách và phật tử.
                </span>
              </div>
              <div className="location-item-review">
                <span className="location-item-title">Đánh giá:</span>
                <span className="location-item-content">
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                </span>
              </div>
            </div>
          </div>

          <div className="location-item">
            <img
              src="/assets/image/bana-hill.jpg"
              alt="location"
              className="location-item-img"
            />
            <div className="location-item-body">
              <div className="location-item-desc">
                <span className="location-item-name">Bà Nà Hills</span>
                <span className="location-item-title">Mô tả: </span>
                <span className="location-item-content">
                  Là khu du lịch nổi tiếng với khí hậu mát mẻ quanh năm, Bà Nà
                  Hills được biết đến với Cầu Vàng (Golden Bridge) độc đáo và
                  các công trình kiến trúc đậm chất châu Âu.
                </span>
              </div>
              <div className="location-item-review">
                <span className="location-item-title">Đánh giá:</span>
                <span className="location-item-content">
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                  <FontAwesomeIcon icon={faStar} className="star-icon" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-wrapper">
          <button className="btn-send" onClick={() => setSearch(true)}>
            Tìm kiếm trên bản đồ
          </button>
        </div>
      </div>
      {search && <MapComponent />}
    </div>
  );
};

export default App;
