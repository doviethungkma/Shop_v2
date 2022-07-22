import React, { useEffect } from "react";
import MaterialIcon from "material-icons-react";
import assets from "../../../assets";
import "./navbar.scss";
import { useDispatch } from "react-redux";
import { showMenu } from "../../../redux/features/menuSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <MaterialIcon
        icon="menu"
        color="var(--color-info-dark)"
        className=" navbar__menu-toggle material-icons md-dark"
        onClick={() => {
          dispatch(showMenu());
        }}
      />

      <div className="navbar__theme-toggler">
        <MaterialIcon
          icon="light_mode"
          className="mode material-icons md-dark active"
          color="#FFF"
        />
        <MaterialIcon
          icon="dark_mode"
          className="mode material-icons md-dark"
          color="#FFF"
        />
      </div>
      <div className="navbar__profile">
        <div className="info navbar__profile__txt">
          <p>
            <b>{localStorage.getItem("user")}</b>
          </p>
          <small className="text-muted">
            {localStorage.getItem("username")}
          </small>
        </div>
        <div className="profile-photo">
          <img src={assets.avatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
