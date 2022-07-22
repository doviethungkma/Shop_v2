import React, { useState } from "react";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  showModal,
  getAll,
} from "../../redux/features/providerSlice";
import providerApi from "../../api/providerApi";
import { showDeletePopup } from "../../redux/features/commonSlice";
import DeletePopup from "../../components/common/DeletePopup/DeletePopup";

const ProviderModal = (props) => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.provider.modalType);
  const [provider, setProvider] = useState({
    name: modalType === "add" ? "" : props.provider.name,
    address: modalType === "add" ? "" : props.provider.address,
    phone: modalType === "add" ? "" : props.provider.phone,
    fax: modalType === "add" ? "" : props.provider.fax,
    email: modalType === "add" ? "" : props.provider.email,
  });

  const onClose = () => {
    dispatch(hideModal());
  };

  const onEditClick = () => {
    dispatch(showModal("edit"));
  };

  const onChange = (e, key) => {
    setProvider({ ...provider, [key]: e.target.value });
  };

  const onDeleteClick = () => {
    dispatch(
      showDeletePopup({
        type: "provider",
        id: props.provider.id,
      })
    );
  };

  const onSave = async () => {
    try {
      modalType === "edit"
        ? await providerApi.update(props.provider._id, provider)
        : await providerApi.create(provider);

      dispatch(getAll());
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <h3 className="popup__title">Provider Detail</h3>
        <div className="popup__content">
          <Input
            type="text"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={provider.name}
            placeholder={modalType === "detail" ? props.provider.name : ""}
            onChange={(e) => onChange(e, "name")}
            label="Name"
          />
          <Input
            type="text"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={provider.address}
            placeholder={modalType === "detail" ? props.provider.address : ""}
            onChange={(e) => onChange(e, "address")}
            label="Address"
          />
          <Input
            type="text"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={provider.phone}
            placeholder={modalType === "detail" ? props.provider.phone : ""}
            onChange={(e) => onChange(e, "phone")}
            label="Phone"
          />
          <Input
            type="text"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={provider.fax}
            placeholder={modalType === "detail" ? props.provider.fax : ""}
            onChange={(e) => onChange(e, "fax")}
            label="Fax"
          />
          <Input
            type="text"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={provider.email}
            placeholder={modalType === "detail" ? props.provider.email : ""}
            onChange={(e) => onChange(e, "email")}
            label="Email"
          />
        </div>
        <div style={{ float: "right", marginTop: "10px" }}>
          {modalType === "detail" ? (
            <>
              {" "}
              <Button name="Close" type="button" size="sm" onClick={onClose} />
              <Button
                name="Edit"
                type="button"
                buttonType="primary"
                size="sm"
                onClick={onEditClick}
              />
              <Button
                name="Delete"
                type="button"
                buttonType="danger"
                size="sm"
                onClick={onDeleteClick}
              />
            </>
          ) : (
            <>
              <Button
                name="Close"
                type="button"
                size="sm"
                buttonType="danger"
                onClick={() => {
                  modalType === "edit"
                    ? dispatch(showModal("detail"))
                    : onClose();
                }}
              />
              <Button
                name="Save"
                type="button"
                buttonType="success"
                size="sm"
                onClick={onSave}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderModal;
