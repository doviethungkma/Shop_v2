import React, { useState, useEffect } from "react";
import "./login.scss";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/authSlice";
import authUtils from "../../utils/authUtil";
import { unwrapResult } from "@reduxjs/toolkit";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    setUsernameErrText("");
    setPasswordErrText("");

    try {
      dispatch(login({ username, password }))
        .then(unwrapResult)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
          error.forEach((e) => {
            if (e.param === "username") {
              setUsernameErrText(e.msg);
            }
            if (e.param === "password") {
              setPasswordErrText(e.msg);
            }
          });
        });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (!isAuth) {
        navigate("/login");
      } else {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="login">
      <div className="login__content">
        <h1>Welcome</h1>
        <p className="subtitle  text-muted">Login to your account</p>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="Username"
            className="input"
            id="username"
            name="username"
            width="fullWidth"
            error={usernameErrText}
          />
          <Input
            type="password"
            placeholder="Password"
            className="input"
            id="password"
            name="password"
            width="fullWidth"
            error={passwordErrText}
          />
          <Button name="Login" type="submit" />
        </form>
        <h4>
          Dont have account?
          <span
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Login;
