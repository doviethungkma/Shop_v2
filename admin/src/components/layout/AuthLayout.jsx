import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import authUtils from "../../utils/authUtil";
import Loading from "../common/Loading";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      console.log(`isAuth: ${JSON.stringify(isAuth)}`);
      if (!isAuth) {
        setLoading(false);
        navigate("/login");
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading />
  ) : (
    <div className="auth">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
