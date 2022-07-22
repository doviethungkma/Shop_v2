import React, { useState } from "react";
import "./dropdown.scss";

const Dropdown = (props) => {
  const [selectedValue, setSelectedValue] = useState();
  const [isShowSelect, setIsShowSelect] = useState(false);

  return (
    <div
      className="dropdown-bx"
      style={{
        width: props.width === "fullWidth" ? "100%" : `"${props.width}px"`,
      }}
    >
      <label>{props.label}</label>
      <div className={`dropdown ${props.disabled ? "" : "dropdown__active"}`}>
        <div
          className="dropdown__select"
          onClick={
            props.disabled === "disabled"
              ? () => {}
              : () => setIsShowSelect(!isShowSelect)
          }
        >
          <span className="dropdown__value">
            {selectedValue
              ? selectedValue
              : props.list.find((item) => item.value === props.selectedValue)
                  .name}
          </span>
          <i className="bx bx-chevron-down"></i>
        </div>
        {isShowSelect && (
          <ul className="dropdown__list">
            {props.list.map((item, index) => (
              <li
                className="dropdown__item"
                key={index}
                onClick={(e) => {
                  props.onItemClick(e);
                  setSelectedValue(item.name);
                  setIsShowSelect(false);
                }}
                data-value={item.value}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
