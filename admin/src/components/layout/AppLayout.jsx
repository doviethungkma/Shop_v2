import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import userApi from "../../api/userApi";
import authUtils from "../../utils/authUtil";
import Loading from "../common/Loading";
import Navbar from "../common/Navbar/Navbar";
import Right from "../common/Right/Right";
import Sidebar from "../common/Sidebar/Sidebar";
import { USER_STATUS_INACTIVE } from "../../utils/constant";

const AppLayout = ({ allowedRole }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      console.log(`user: ${JSON.stringify(user)}`);

      if (!user) {
        navigate("/login");
      } else {
        const res = await userApi.getRole();
        if (!allowedRole.includes(res.role)) {
          navigate("/notfound");
        } else {
          setLoading(false);
        }
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading />
  ) : (
    <div className="main">
      <Navbar />
      <Sidebar />
      <div className="content">
        <Outlet />
        <Right />
      </div>
    </div>
  );
};

export default AppLayout;
