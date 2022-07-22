import MaterialIcon from "material-icons-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import assets from "../../../assets";
import { menuModel } from "../../../models/Menu";
import MenuItem from "../MenuItem/MenuItem";
import "./sidebar.scss";
import { logout } from "../../../redux/features/authSlice";
import userApi from "../../../api/userApi";
import { hideMenu } from "../../../redux/features/menuSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [role, setRole] = useState();
  const isShowMenu = useSelector((state) => state.menu.isShowMenu);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    const getRole = async () => {
      const res = await userApi.getRole();
      setRole(res.role);
    };
    getRole();
  }, []);

  return (
    <>
      {isShowMenu || windowWidth >= 600 ? (
        <div className="sidebar">
          <div className="sidebar__top">
            <div className="sidebar__top__logo">
              <div onClick={() => {}}>
                <img src={assets.logo.default} alt="" />
              </div>
              <h2>
                EGA<span className="danger">TOR</span>
              </h2>
            </div>
            <div className="close" onClick={() => dispatch(hideMenu())}>
              <MaterialIcon icon="close" color="var(--color-info-dark)" />
            </div>
          </div>
          <ul className="sidebar__menu">
            {menuModel.map((item) =>
              item.acceptedRole.includes(role) ? (
                <MenuItem
                  link={item.link}
                  icon={item.icon}
                  name={item.name}
                  key={item.id}
                />
              ) : (
                ""
              )
            )}

            <li
              className="sidebar__menu__item"
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            >
              <MaterialIcon icon="logout" color="#7d8da1" />
              <h3>Logout</h3>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
