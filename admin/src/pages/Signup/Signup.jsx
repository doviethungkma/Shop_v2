import React, { useState } from "react";
import "./signup.scss";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errMsg = useSelector((state) => state.auth.errMsg);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    const email = data.get("email").trim();

    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    await dispatch(register({ username, password, confirmPassword, email }))
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
          if (e.param === "confirmPassword") {
            setConfirmPasswordErrText(e.msg);
          }
        });
      });
  };

  return (
    <div className="signup">
      <div className="signup__content">
        <h1>Welcome</h1>
        <p className="subtitle  text-muted">Signup account</p>
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
          <Input
            type="password"
            placeholder="Confirm password"
            className="input"
            id="confirmPassword"
            name="confirmPassword"
            width="fullWidth"
            error={confirmPasswordErrText}
          />
          <Input
            type="email"
            placeholder="Email"
            className="input"
            id="email"
            name="email"
            width="fullWidth"
          />
          <Button name="Signup" type="submit" />
        </form>
        <h4>
          Already have an acount?
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Signup;
