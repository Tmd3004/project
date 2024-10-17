import React, { useEffect, useState } from "react";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { IoClose } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Styles from "./Home.module.scss";

const cx = classNames.bind(Styles);

const locations = [
  "Hải Châu",
  "Thanh Khê",
  "Sơn Trà",
  "Ngũ Hành Sơn",
  "Cẩm Lệ",
  "Liên Chiểu",
  "Hòa Vang",
  "Hoàng Sa",
];

const data = [
  {
    name: "Cầu Rồng",
    desc: "Cầu Rồng là cây cầu nổi tiếng bắc qua sông Hàn, với thiết kế hình rồng khổng lồ phun lửa và nước vào các buổi tối cuối tuần, là biểu tượng hiện đại của Đà Nẵng.",
    address: "29 Cầu Rồng, An Hải Trung, Sơn Trà, Đà Nẵng, Vietnam",
    location: {
      long: "16.061501216128715",
      lat: "108.22759738994057",
    },
    review: 5,
  },
  {
    name: "Chùa Linh Ứng",
    desc: "Nằm trên bán đảo Sơn Trà, chùa Linh Ứng là ngôi chùa lớn nhất tại Đà Nẵng với tượng Phật Quan Thế Âm cao 67m nhìn ra biển, thu hút rất nhiều du khách và phật tử.",
    address: "Hòn Thủy Sơn, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng, Vietnam",
    location: {
      long: "16.00438243560803",
      lat: "108.26433785346067",
    },
    review: 5,
  },
  {
    name: "Bà Nà Hills",
    desc: "Là khu du lịch nổi tiếng với khí hậu mát mẻ quanh năm, Bà Nà Hills được biết đến với Cầu Vàng (Golden Bridge) độc đáo và các công trình kiến trúc đậm chất châu Âu.",
    address: "Thôn An Sơn, Hòa Vang, Da Nang, Vietnam",
    location: {
      long: "15.995342053911218",
      lat: "107.99608495160751",
    },
    review: 5,
  },
];

const DetailModal = ({ show, onHide, dataDetail }) => {
  useEffect(() => {
    if (show) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show]);

  return (
    <div
      className={cx("modal", show ? "show-modal" : "hidden-modal")}
      onClick={onHide}
    >
      <div
        className={cx("modal-container", show ? "slide-in" : "slide-out")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cx("modal-header")}>
          <h5 className={cx("modal-title")}>{dataDetail.name}</h5>
          <button className={cx("close-btn")} onClick={onHide}>
            <IoClose className={cx("close-icon")} />
          </button>
        </div>
        <div className={cx("modal-body")}>
          <div className={cx("modal-address")}>
            <span className={cx("modal-address-title")}>Địa chỉ:</span>
            <span className={cx("modal-address-conten")}>
              {dataDetail.address}
            </span>
          </div>
          <div className={cx("modal-desc")}>
            <span className={cx("modal-desc-title")}>Mô tả:</span>
            <span className={cx("modal-desc-content")}>{dataDetail.desc}</span>
          </div>
          <div className={cx("modal-review")}>
            <span className={cx("modal-review-title")}>
              Đánh giá trung bình:
            </span>
            <span className={cx("location-item-content-item")}>
              {dataDetail.review >= 1 ? (
                <FontAwesomeIcon icon={faStar} className={cx("star-icon")} />
              ) : dataDetail.review >= 0.5 ? (
                <FontAwesomeIcon
                  icon={faStarHalfStroke}
                  className={cx("star-icon")}
                />
              ) : (
                <FontAwesomeIcon icon={faStar} className={cx("star-icon")} />
              )}
            </span>
            <span className={cx("location-item-content-item")}>
              {dataDetail.review >= 2 ? (
                <FontAwesomeIcon icon={faStar} className={cx("star-icon")} />
              ) : dataDetail.review >= 1.5 ? (
                <FontAwesomeIcon
                  icon={faStarHalfStroke}
                  className={cx("star-icon")}
                />
              ) : (
                <FontAwesomeIcon icon={faStar} className={cx("star-icon")} />
              )}
            </span>
            <span className={cx("location-item-content-item")}>
              {dataDetail.review >= 3 ? (
                <FontAwesomeIcon icon={faStar} className={cx("star-icon")} />
              ) : dataDetail.review >= 2.5 ? (
                <FontAwesomeIcon
                  icon={faStarHalfStroke}
                  className={cx("star-icon")}
                />
              ) : (
                <FontAwesomeIcon icon={faStar} className={cx("star-icon")} />
              )}
            </span>
            <span className={cx("location-item-content-item")}>
              {dataDetail.review >= 4 ? (
                <FontAwesomeIcon icon={faStar} className={cx("star-icon")} />
              ) : dataDetail.review >= 3.5 ? (
                <FontAwesomeIcon
                  icon={faStarHalfStroke}
                  className={cx("star-icon")}
                />
              ) : (
                <FontAwesomeIcon icon={faStar} className={cx("star-icon")} />
              )}
            </span>
            <span className={cx("location-item-content-item")}>
              {dataDetail.review >= 5 ? (
                <FontAwesomeIcon icon={faStar} className={cx("star-icon")} />
              ) : dataDetail.review >= 4.5 ? (
                <FontAwesomeIcon
                  icon={faStarHalfStroke}
                  className={cx("star-icon")}
                />
              ) : (
                <FontAwesomeIcon icon={faStar} className={cx("star-icon")} />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [location, setLocation] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [activeItem, setActiveItem] = useState([]);

  const handleShowDetail = (data) => {
    setShowDetail(true);
    setDataDetail(data);
  };

  const handleActiveItem = (index) => {
    if (activeItem.includes(index)) {
      setActiveItem(activeItem.filter((item) => item !== index));
    } else {
      setActiveItem([...activeItem, index]);
    }
  };

  const handleSearch = () => {
    window.open("/map", "_blank");
  };

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("body-title")}>
        Gợi ý các địa điểm bạn có thể lựa chọn
      </h3>
      <div className={cx("select")}>
        <span className={cx("select-title")}>Lựa chọn khu vực</span>
        <CustomSelect
          options={locations}
          onChange={(option) => setLocation(option)}
          placeHolder="Lựa chọn khu vực"
        />
      </div>
      <div className={cx("location-list")}>
        {data.map((item, index) => (
          <div
            className={cx(
              "location-item",
              activeItem.includes(index) ? "active-item" : ""
            )}
            key={index}
          >
            <div className={cx("location-item-body")}>
              <div className={cx("location-item-desc")}>
                <span className={cx("location-item-name")}>{item.name}</span>
                <span className={cx("location-item-title")}>Mô tả: </span>
                <span className={cx("location-item-content")}>{item.desc}</span>
              </div>
              <div className={cx("location-item-review")}>
                <span className={cx("location-item-title")}>Đánh giá:</span>
                <span className={cx("location-item-content")}>
                  <span className={cx("location-item-content-item")}>
                    {item.review >= 1 ? (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={cx("star-icon")}
                      />
                    ) : item.review >= 0.5 ? (
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        className={cx("star-icon")}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={cx("star-icon")}
                      />
                    )}
                  </span>
                  <span className={cx("location-item-content-item")}>
                    {item.review >= 2 ? (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={cx("star-icon")}
                      />
                    ) : item.review >= 1.5 ? (
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        className={cx("star-icon")}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={cx("star-icon")}
                      />
                    )}
                  </span>
                  <span className={cx("location-item-content-item")}>
                    {item.review >= 3 ? (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={cx("star-icon")}
                      />
                    ) : item.review >= 2.5 ? (
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        className={cx("star-icon")}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={cx("star-icon")}
                      />
                    )}
                  </span>
                  <span className={cx("location-item-content-item")}>
                    {item.review >= 4 ? (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={cx("star-icon")}
                      />
                    ) : item.review >= 3.5 ? (
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        className={cx("star-icon")}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={cx("star-icon")}
                      />
                    )}
                  </span>
                  <span className={cx("location-item-content-item")}>
                    {item.review >= 5 ? (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={cx("star-icon")}
                      />
                    ) : item.review >= 4.5 ? (
                      <FontAwesomeIcon
                        icon={faStarHalfStroke}
                        className={cx("star-icon")}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faStar}
                        className={cx("star-icon")}
                      />
                    )}
                  </span>
                </span>
              </div>
            </div>
            <div className={cx("location-footer")}>
              <button
                className={cx("location-detail-btn")}
                onClick={() => handleShowDetail(item)}
              >
                Chi tiết
              </button>
              <button
                className={cx("location-choose-btn")}
                onClick={() => handleActiveItem(index)}
              >
                Chọn
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={cx("btn-wrapper")}>
        <button className={cx("btn-send")} onClick={handleSearch}>
          Tìm kiếm trên bản đồ
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={cx("search-icon")}
          />
        </button>
      </div>
      <DetailModal 
        show={showDetail}
        onHide={() => setShowDetail(false)}
        dataDetail={dataDetail}
      />
    </div>
  );
};

export default Home;
