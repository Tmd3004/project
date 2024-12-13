import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import Styles from "./CustomDropdown.module.scss";
import { IoChevronDown } from "react-icons/io5";

const cx = classNames.bind(Styles);

const CustomDropdown = ({ options, onChange, placeHolder, change }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const selectRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    let updateOptions;
    if (selectedOptions.includes(option)) {
      updateOptions = selectedOptions.filter((item) => item !== option);
    } else {
      updateOptions = [...selectedOptions, option];
    }
    console.log(updateOptions);
    setSelectedOptions(updateOptions);
    onChange(updateOptions);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (change.length === 0) {
      setSelectedOptions([]);
    }
  }, [change])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cx("custom-select-wrapper")} ref={selectRef}>
      <div className={cx("custom-select-trigger")} onClick={toggleDropdown}>
        {selectedOptions.length > 0
          ? selectedOptions
              .map((item) =>
                item === "hotel"
                  ? "Khách sạn"
                  : item === "restaurant"
                  ? "Điểm ăn uống"
                  : item === "travel"
                  ? "Điểm du lịch"
                  : "Tất cả"
              )
              .join(", ")
          : placeHolder}
      </div>
      <IoChevronDown className={cx("down-icon")} onClick={toggleDropdown} />
      {isOpen && (
        <div className={cx("custom-options")}>
          {options.map((option, index) => (
            <label
              className={cx("custom-option")}
              key={index}
              onChange={() => handleOptionClick(option)}
            >
              <input
                type="checkbox"
                name="custom-select"
                value={option}
                defaultChecked={selectedOptions.includes(option)}
                className={cx("custom-checkbox")}
              />
              {option === "hotel"
                ? "Khách sạn"
                : option === "restaurant"
                ? "Điểm ăn uống"
                : option === "travel"
                ? "Điểm du lịch"
                : "Tất cả"}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
