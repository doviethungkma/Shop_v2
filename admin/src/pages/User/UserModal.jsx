import React, { useState } from "react";
import Input from "../../components/common/Input/Input";
import Moment from "moment";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import Button from "../../components/common/Button";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/features/userSlice";
import userApi from "../../api/userApi";
import { getAll } from "../../redux/features/userSlice";
import { userStatus, roles } from "../../utils/constant";

const UserModal = (props) => {
  const dispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState(props.user.role);
  const [selectedStatus, setSelectedStatus] = useState(props.user.status);

  console.log(`selectedRole: ${selectedRole}`);
  console.log(`selectedStatus: ${selectedStatus}`);

  const onClose = () => {
    dispatch(hideModal());
  };

  const onSave = async () => {
    try {
      await userApi.update(props.user._id, {
        role: selectedRole,
        status: selectedStatus,
      });
      dispatch(getAll());
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <h3 className="popup__title">User Detail</h3>
        <div className="popup__content">
          <Input
            type="text"
            disabled="disabled"
            placeholder={props.user.username}
            label="Username"
          />
          <Input
            type="text"
            disabled="disabled"
            placeholder={props.user.email}
            label="Email"
          />
          <Input
            type="text"
            disabled="disabled"
            placeholder={props.user.name}
            label="Fullname"
          />
          <Input
            type="text"
            disabled="disabled"
            placeholder={props.user.address}
            label="Address"
          />
          <Input
            type="text"
            disabled="disabled"
            placeholder={props.user.phone}
            label="Phone"
          />
          <Input
            type="text"
            disabled="disabled"
            placeholder={props.user.gender}
            label="Gender"
          />
          <Input
            type="text"
            disabled="disabled"
            placeholder={Moment(props.user.DoB).format("DD-MM-YYYY")}
            label="DoB"
          />

          <Dropdown
            list={roles}
            label="Role"
            onItemClick={(e) => {
              setSelectedRole(e.target.dataset.value);
            }}
            selectedValue={props.user.role}
          />
          <Dropdown
            list={userStatus}
            label="Status"
            onItemClick={(e) => setSelectedStatus(e.target.dataset.value)}
            selectedValue={props.user.status}
          />
        </div>
        <div style={{ float: "right", marginTop: "10px" }}>
          <Button
            name="Cancel"
            type="button"
            buttonType="danger"
            size="sm"
            onClick={onClose}
          />
          <Button
            name="Save"
            type="button"
            buttonType="success"
            size="sm"
            onClick={onSave}
          />
        </div>
      </div>
    </div>
  );
};

export default UserModal;
