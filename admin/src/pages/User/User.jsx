import React, { useState, useEffect } from "react";
import "./user.scss";
import UserModal from "./UserModal";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../redux/features/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Moment from "moment";
import { SHIPPER_ROLE } from "../../utils/constant";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import { showModal } from "../../redux/features/userSlice";
import { roles, userStatus } from "../../utils/constant";
import Input from "../../components/common/Input/Input";

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const isShowModal = useSelector((state) => state.user.isShowModal);
  const [user, setUser] = useState();
  let i = 1;

  useEffect(() => {
    dispatch(getAll())
      .then(unwrapResult)
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }, []);

  return (
    <div className="page user">
      <h2 className="page__title">All Users</h2>

      <div className="page__content">
        <table className="user__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item, index) => (
                <tr key={item._id}>
                  <td>{i++}</td>
                  <td
                    className="text-clickable"
                    onClick={() => {
                      setUser(item);
                      dispatch(showModal());
                    }}
                  >
                    {item.username}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {roles.find((e) => e.value === item.role).name}
                  </td>
                  <td
                    style={{
                      color:
                        item.status === 1
                          ? "var(--color-success)"
                          : "var(--color-danger)",
                      textTransform: "capitalize",
                    }}
                  >
                    {userStatus.find((e) => e.value === item.status).name}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isShowModal && <UserModal user={user} />}
    </div>
  );
};

export default User;
