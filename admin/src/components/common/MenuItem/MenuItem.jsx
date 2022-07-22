import React from "react";
import { NavLink } from "react-router-dom";

const MenuItem = (props) => {
  return (
    <NavLink
      to={props.link}
      className={({ isActive }) =>
        isActive
          ? "sidebar__menu__item sidebar__menu__item--active"
          : "sidebar__menu__item"
      }
      onClick={props.onClick}
      key={props.id}
    >
      <i className={props.icon}></i>
      <h3>{props.name}</h3>
    </NavLink>
  );
};

export default MenuItem;
