import React, { useEffect, useState } from "react";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { IoClose } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import Styles from "./Home.module.scss";
import Paginate from "../../components/Paginate/Paginate";
import { Link } from "react-router-dom";
import { IoLink } from "react-icons/io5";
import axios from "axios";
import { AiFillFire } from "react-icons/ai";

const cx = classNames.bind(Styles);

const radiuses = [100, 500, 1000, 2000];

const types = ["Khách sạn", "Điểm ăn uống", "Điểm du lịch", "Tất cả"];

const locations = [
  "Hải Châu",
  "Thanh Khê",
  "Sơn Trà",
  "Ngũ Hành Sơn",
  "Cẩm Lệ",
  "Liên Chiểu",
  "Hòa Vang",
  "Hoàng Sa",
  "Khác",
];

const top10travels = [
  "Sun World Bà Nà Hills",
  "Phố cổ Hội An",
  "Công Viên Châu Á Đà Nẵng",
  "Công Viên Suối Khoáng Nóng Núi Thần Tài",
  "Chùa Linh Ứng",
  "Bãi biển Mỹ Khê",
  "Thánh địa Mỹ Sơn",
  "Cầu Rồng",
  "Cù lao Chàm",
  "Cầu khóa tình yêu",
];

const sortHotels = ["Tăng dần", "Giảm dần"];

const apiUrl = "http://localhost:8000/api/destinations/get_data";

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
          <h5 className={cx("modal-title")}>{dataDetail.title}</h5>
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
          {dataDetail.describe ? (
            <div className={cx("modal-desc")}>
              <span className={cx("modal-desc-title")}>Mô tả:</span>
              <span className={cx("modal-desc-content")}>
                {dataDetail.describe}
              </span>
            </div>
          ) : (
            ""
          )}

          {dataDetail.rate ? (
            <div className={cx("modal-review")}>
              <span className={cx("modal-review-title")}>Đánh giá:</span>
              <span className={cx("location-item-content-item")}>
                {dataDetail.rate}
              </span>
            </div>
          ) : (
            ""
          )}

          {dataDetail.overall_review ? (
            <div className={cx("modal-review")}>
              <span className={cx("modal-review-title")}>Nhận xét:</span>
              <span className={cx("location-item-content-item")}>
                {dataDetail.overall_review}
              </span>
            </div>
          ) : (
            ""
          )}
          {dataDetail.link ? (
            <div className={cx("modal-review")}>
              <span className={cx("modal-review-title")}>Link:</span>
              <Link
                to={dataDetail.link}
                className={cx("location-item-content-item")}
                target="_blank"
              >
                <IoLink className={cx("link-icon")} />
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

function deg2rad(degrees) {
  var pi = Math.PI;

  return degrees * (pi / 180);
}

const haversineDistance = (coord1, coord2) => {
  const R = 6371000;
  const dLat = deg2rad(coord2.lat - coord1.lat);
  const dLng = deg2rad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.lat)) *
      Math.cos(deg2rad(coord2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.asin(Math.sqrt(a));
  return R * c;
};

const Home = () => {
  const [dataHotels, setDataHotels] = useState([]);
  const [dataRestaurants, setDataRestaurants] = useState([]);
  const [dataTravels, setDataTravels] = useState([]);

  const [searchHotelValue, setSearchHotelValue] = useState([]);
  const [searchRestaurantValue, setSearchRestaurantValue] = useState([]);
  const [searchTravelValue, setSearchTravelValue] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const [showDetail, setShowDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [activeItem, setActiveItem] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState("");
  const [locationsSearch, setLocationSearch] = useState([]);
  const [locationOrigin, setLocationOrigin] = useState({ lat: 0, lng: 0 });
  const [radius, setRadius] = useState(100);
  const [type, setType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFilterLocation, setIsOpenFilterLocation] = useState(false);
  const [isOpenFilterDistrict, setIsOpenFilterDistrict] = useState(false);
  const [sortHotel, setSortHotel] = useState("");

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(apiUrl, { "Content-Type": "application/json" })
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get("/travel/data.json")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeSearch = (e) => {
    const result = e.target.value;
    if (result.trim().length > 0) {
      setSearchValue(e.target.value);
      const searchData = data.filter((item) =>
        item.title.toLowerCase().includes(result.toLowerCase())
      );
      setLocationSearch(searchData);
      setIsOpen(true);
    } else {
      setSearchValue("");
      setIsSubmit(false);
      setIsOpen(false);
    }
  };

  const handleClickOption = (data) => {
    localStorage.setItem("dataLocation", JSON.stringify(data));

    setLocationSearch([]);
    setSearchValue(data.title);
    const [lat, lng] = data.latlng.split(",").map(Number);
    setLocationOrigin({ lat: lat, lng: lng });
    setIsOpen(false);
  };

  useEffect(() => {
    setDataHotels(data.filter((item) => item.type === "hotel"));
    setDataRestaurants(data.filter((item) => item.type === "restaurant"));
    setDataTravels(data.filter((item) => item.type === "travel"));
  }, [data]);

  const handleChangeLocation = () => {
    const nearbyPlaces = data.filter((place) => {
      if (!place.latlng) return false;
      const [lat, lng] = place.latlng.split(",").map(Number);
      const distance = haversineDistance(locationOrigin, { lat, lng });

      const typeFilter =
        type === "Khách sạn"
          ? place.type.includes("hotel")
          : type === "Điểm ăn uống"
          ? place.type.includes("restaurant")
          : type === "Điểm du lịch"
          ? place.type.includes("travel")
          : "all";

      return distance <= radius && typeFilter;
    });

    const hotelData = nearbyPlaces.filter((item) => item.type === "hotel");
    const restaurantData = nearbyPlaces.filter(
      (item) => item.type === "restaurant"
    );

    const travelData = nearbyPlaces.filter((item) => item.type === "travel");
    setSearchHotelValue(hotelData);
    setSearchRestaurantValue(restaurantData);
    setSearchTravelValue(travelData);
    setIsSubmit(true);

    localStorage.setItem("dataPoints", JSON.stringify(nearbyPlaces));
    window.open("/travel/map-point", "_blank");
  };

  const handleChangeDistrict = () => {
    const searchData = data.filter((item) => {
      const locationFilter =
        location === "Khác"
          ? !locations.some(
              (value) => value !== "Khác" && item.address.includes(value)
            )
          : location === ""
          ? "all"
          : item.address.includes(location);
      const typeFilter =
        type === "Khách sạn"
          ? item.type.includes("hotel")
          : type === "Điểm ăn uống"
          ? item.type.includes("restaurant")
          : type === "Điểm du lịch"
          ? item.type.includes("travel")
          : "all";
      return locationFilter && typeFilter;
    });

    const hotelData = searchData.filter((item) => item.type === "hotel");
    const restaurantData = searchData.filter(
      (item) => item.type === "restaurant"
    );
    const travelData = searchData.filter((item) => item.type === "travel");
    setSearchHotelValue(hotelData);
    setSearchRestaurantValue(restaurantData);
    setSearchTravelValue(travelData);
    setIsSubmit(true);

    localStorage.setItem("dataPoints", JSON.stringify(searchData));

    if (searchData.length > 0) {
      window.open("/travel/map-point-district", "_blank");
    }
  };

  const handleTop = () => {
    const searchData = dataTravels.filter((item) =>
      top10travels.some(
        (travel) => travel.toLowerCase() === item.title.toLowerCase()
      )
    );
    setDataTravels(searchData);
    localStorage.setItem("dataPoints", JSON.stringify(searchData));
    window.open("/travel/map-trending", "_blank");
  };

  useEffect(() => {
    if (sortHotel) {
      if (isSubmit) {
        const sortedHotels = [...searchHotelValue].sort((a, b) =>
          sortHotel === "Tăng dần"
            ? Number(a.rate) - Number(b.rate)
            : Number(b.rate) - Number(a.rate)
        );
        setSearchHotelValue(sortedHotels);
      } else {
        const sortedHotels = [...dataHotels].sort((a, b) =>
          sortHotel === "Tăng dần"
            ? Number(a.rate) - Number(b.rate)
            : Number(b.rate) - Number(a.rate)
        );
        setDataHotels(sortedHotels);
      }
    }
  }, [sortHotel]);

  // Pagination Hotel
  const [currentHotelPage, setCurrentHotelPage] = useState(0);
  const [recordsHotelPerPage, setRecordsHotelPerPage] = useState(5);
  const startHotelIndex = currentHotelPage * recordsHotelPerPage;
  const endHotelIndex = Math.min(
    startHotelIndex + recordsHotelPerPage,
    isSubmit ? searchHotelValue.length : dataHotels.length
  );
  const recordsHotel = isSubmit
    ? searchHotelValue.slice(startHotelIndex, endHotelIndex)
    : dataHotels.slice(startHotelIndex, endHotelIndex);
  const npageHotel = isSubmit
    ? Math.ceil(searchHotelValue.length / recordsHotelPerPage)
    : Math.ceil(dataHotels.length / recordsHotelPerPage);

  const handlePageHotelClick = (data) => {
    setCurrentHotelPage(data.selected);
  };

  // Pagination Restaurant
  const [currentRestaurantPage, setCurrentRestaurantPage] = useState(0);
  const [recordsRestaurantPerPage, setRecordsRestaurantPerPage] = useState(5);
  const startRestaurantIndex = currentRestaurantPage * recordsRestaurantPerPage;
  const endRestaurantIndex = Math.min(
    startRestaurantIndex + recordsRestaurantPerPage,
    isSubmit ? searchRestaurantValue.length : dataRestaurants.length
  );
  const recordsRestaurant = isSubmit
    ? searchRestaurantValue.slice(startRestaurantIndex, endRestaurantIndex)
    : dataRestaurants.slice(startRestaurantIndex, endRestaurantIndex);
  const npageRestaurant = isSubmit
    ? Math.ceil(searchRestaurantValue.length / recordsRestaurantPerPage)
    : Math.ceil(dataRestaurants.length / recordsRestaurantPerPage);

  const handlePageRestaurantClick = (data) => {
    setCurrentRestaurantPage(data.selected);
  };

  // Pagination Travel
  const [currentTravelPage, setCurrentTravelPage] = useState(0);
  const [recordsTravelPerPage, setRecordsTravelPerPage] = useState(5);
  const startTravelIndex = currentTravelPage * recordsTravelPerPage;
  const endTravelIndex = Math.min(
    startTravelIndex + recordsTravelPerPage,
    isSubmit ? searchTravelValue.length : dataTravels.length
  );
  const recordsTravel = isSubmit
    ? searchTravelValue.slice(startTravelIndex, endTravelIndex)
    : dataTravels.slice(startTravelIndex, endTravelIndex);
  const npageTravel = isSubmit
    ? Math.ceil(searchTravelValue.length / recordsTravelPerPage)
    : Math.ceil(dataTravels.length / recordsTravelPerPage);

  const handlePageTravelClick = (data) => {
    setCurrentTravelPage(data.selected);
  };

  const handleShowDetail = (data) => {
    setShowDetail(true);
    setDataDetail(data);
  };

  const handleActiveItem = (data) => {
    setActiveItem((prevActiveItem) => {
      const isItemActive = prevActiveItem.some(
        (item) => item.title === data.title
      );

      if (isItemActive) {
        return prevActiveItem.filter((item) => item.title !== data.title);
      } else {
        return [...prevActiveItem, data];
      }
    });
  };

  const handleSearch = () => {
    localStorage.setItem("activeItem", JSON.stringify(activeItem));
    window.open("/travel/map", "_blank");
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("filter")}>
        {isOpenFilterLocation ? (
          <div className={cx("select")}>
            <span className={cx("select-title")}>Địa điểm</span>
            <div className={cx("search-wrapper")}>
              <input
                type="search"
                placeholder="Địa điểm"
                className={cx("search-input")}
                value={searchValue}
                onChange={handleChangeSearch}
              />
              {isOpen ? (
                <div className={cx("search-options")}>
                  {locationsSearch.map((item, index) => (
                    <div
                      key={index}
                      className={cx("search-option")}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
            <span className={cx("select-title")}>Bán kính (m)</span>
            <CustomSelect
              options={radiuses}
              onChange={(option) => setRadius(option)}
              placeHolder="Bán kính"
            />
            <span className={cx("select-title")}>Loại hình</span>
            <CustomSelect
              options={types}
              onChange={(option) => setType(option)}
              placeHolder="Loại hình"
            />
            <button className={cx("btn-search")} onClick={handleChangeLocation}>
              Tìm kiếm
            </button>
          </div>
        ) : (
          <button
            className={cx("filter-btn")}
            onClick={() => {
              setIsOpenFilterLocation(true);
              setIsOpenFilterDistrict(false);
            }}
          >
            Địa điểm bạn muốn đến
          </button>
        )}
        {isOpenFilterDistrict ? (
          <div className={cx("select")}>
            <span className={cx("select-title")}>Quận/huyện</span>
            <CustomSelect
              options={locations}
              onChange={(option) => setLocation(option)}
              placeHolder="Quận/huyện"
            />
            <span className={cx("select-title")}>Loại hình</span>
            <CustomSelect
              options={types}
              onChange={(option) => setType(option)}
              placeHolder="Loại hình"
            />
            <button className={cx("btn-search")} onClick={handleChangeDistrict}>
              Tìm kiếm
            </button>
          </div>
        ) : (
          <button
            className={cx("filter-btn")}
            onClick={() => {
              setIsOpenFilterLocation(false);
              setIsOpenFilterDistrict(true);
            }}
          >
            Quận bạn muốn đến
          </button>
        )}
      </div>

      <h3 className={cx("body-title")}>
        Gợi ý các địa điểm bạn có thể lựa chọn
      </h3>

      <div className={cx("location-list-display")}>
        <div className={cx("location-list-header")}>
          <span className={cx("location-list-title")}>Địa điểm vui chơi</span>
          <button className={cx("btn-highlight")} onClick={handleTop}>
            Top 10 địa điểm du lịch không thể bỏ qua
          </button>
        </div>
        <Paginate
          npage={npageTravel}
          handlePageClick={handlePageTravelClick}
          currentPage={currentTravelPage}
        />
      </div>
      {recordsTravel.length > 0 ? (
        <div className={cx("location-list")}>
          {recordsTravel.map((item, index) => (
            <div
              className={cx(
                "location-item",
                activeItem.some((active) => active.title === item.title)
                  ? "active-item"
                  : ""
              )}
              key={index}
            >
              <div className={cx("location-item-body")}>
                <div className={cx("location-item-header")}>
                  <span className={cx("location-item-name")}>{item.title}</span>
                </div>
                <span className={cx("location-item-title")}>Địa chỉ: </span>
                <span className={cx("location-item-content")}>
                  {item.address}
                </span>
                <div className={cx("location-item-desc")}>
                  <span className={cx("location-item-title")}>Mô tả: </span>
                  <span className={cx("location-item-content")}>
                    {item.describe}
                  </span>
                  <div className={cx("location-item-review")}>
                    <span className={cx("location-item-title")}>Link: </span>
                    <Link
                      to={item.link}
                      className={cx("location-item-content-item")}
                      target="_blank"
                    >
                      <IoLink className={cx("link-icon")} />
                    </Link>
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
                      onClick={() => handleActiveItem(item)}
                    >
                      Chọn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className={cx("notify")}>
          Không có địa chỉ nằm trong khu vực tìm kiếm
        </span>
      )}

      <div className={cx("location-list-display")}>
        <div className={cx("location-list-header")}>
          <span className={cx("location-list-title")}>Khách sạn</span>
          <CustomSelect
            options={sortHotels}
            onChange={(option) => setSortHotel(option)}
            placeHolder="Đánh giá"
          />
        </div>
        <Paginate
          npage={npageHotel}
          handlePageClick={handlePageHotelClick}
          currentPage={currentHotelPage}
        />
      </div>
      {recordsHotel.length > 0 ? (
        <div className={cx("location-list")}>
          {recordsHotel.map((item, index) => (
            <div
              className={cx(
                "location-item",
                activeItem.some((active) => active.title === item.title)
                  ? "active-item"
                  : ""
              )}
              key={index}
            >
              <div className={cx("location-item-body")}>
                <div className={cx("location-item-header")}>
                  <span className={cx("location-item-name")}>{item.title}</span>
                </div>
                <div className={cx("location-item-desc")}>
                  <span className={cx("location-item-title")}>Mô tả: </span>
                  <span className={cx("location-item-content")}>
                    {item.describe}
                  </span>
                  <div className={cx("location-item-review")}>
                    <span className={cx("location-item-title")}>
                      Đánh giá:{" "}
                    </span>
                    <span className={cx("location-item-content")}>
                      <span className={cx("location-item-content-item")}>
                        {item.rate}
                      </span>
                    </span>
                  </div>
                  <div className={cx("location-item-review")}>
                    <span className={cx("location-item-title")}>
                      Nhận xét:{" "}
                    </span>
                    <span className={cx("location-item-content")}>
                      <span className={cx("location-item-content-item")}>
                        {item.overall_review}
                      </span>
                    </span>
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
                      onClick={() => handleActiveItem(item)}
                    >
                      Chọn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className={cx("notify")}>
          Không có địa chỉ nằm trong khu vực tìm kiếm
        </span>
      )}

      <div className={cx("location-list-display")}>
        <span className={cx("location-list-title")}>Địa điểm ăn uống</span>
        <Paginate
          npage={npageRestaurant}
          handlePageClick={handlePageRestaurantClick}
          currentPage={currentRestaurantPage}
        />
      </div>
      {recordsRestaurant.length > 0 ? (
        <div className={cx("location-list")}>
          {recordsRestaurant.map((item, index) => (
            <div
              className={cx(
                "location-item",
                activeItem.some((active) => active.title === item.title)
                  ? "active-item"
                  : ""
              )}
              key={index}
            >
              <div className={cx("location-item-body")}>
                <div className={cx("location-item-header")}>
                  <span className={cx("location-item-name")}>{item.title}</span>
                </div>
                <div className={cx("location-item-desc")}>
                  <span className={cx("location-item-title")}>Địa chỉ: </span>
                  <span className={cx("location-item-content")}>
                    {item.address}
                  </span>

                  {item.overall_review ? (
                    <div className={cx("location-item-review")}>
                      <span className={cx("location-item-title")}>
                        Nhận xét:{" "}
                      </span>
                      <span className={cx("location-item-content")}>
                        <span className={cx("location-item-content-item")}>
                          {item.overall_review}
                        </span>
                      </span>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className={cx("location-item-review")}>
                    <span className={cx("location-item-title")}>Link: </span>
                    <Link
                      to={item.link}
                      className={cx("location-item-content-item")}
                      target="_blank"
                    >
                      <IoLink className={cx("link-icon")} />
                    </Link>
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
                      onClick={() => handleActiveItem(item)}
                    >
                      Chọn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className={cx("notify")}>
          Không có địa chỉ nằm trong khu vực tìm kiếm
        </span>
      )}

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
