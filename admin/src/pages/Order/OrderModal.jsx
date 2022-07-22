import React, { useState, useEffect } from "react";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, showModal, getAll } from "../../redux/features/orderSlice";
import orderApi from "../../api/orderApi";
import { showDeletePopup } from "../../redux/features/commonSlice";
import DeletePopup from "../../components/common/DeletePopup/DeletePopup";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import { statusList } from "../../utils/constant";
import userApi from "../../api/userApi";
import Moment from "moment";

const OrderModal = (props) => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.order.modalType);
  const [order, setOrder] = useState({
    status: modalType === "add" ? "" : props.order.status,
    shipper: modalType === "add" ? "" : props.order.shipper,
  });
  const [users, setUsers] = useState();

  const onClose = () => {
    dispatch(hideModal());
  };

  const onEditClick = () => {
    dispatch(showModal("edit"));
  };

  const onChange = (e, key) => {
    setOrder({ ...order, [key]: e.target.value });
  };

  const onDeleteClick = () => {
    dispatch(
      showDeletePopup({
        type: "order",
        id: props.order.id,
      })
    );
  };

  const onSave = async () => {
    try {
      modalType === "edit"
        ? await orderApi.update(props.order._id, order)
        : await orderApi.create(order);

      dispatch(getAll());
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <div className="popup">
        <h3 className="popup__title">Order Detail</h3>
        <div className="popup__content">
          <Input
            type="text"
            disabled="disabled"
            value={props.order.shippingDetail.fullName}
            label="Name"
          />
          <Input
            type="text"
            disabled="disabled"
            value={props.order.shippingDetail.address}
            label="Address"
          />
          <Input
            type="text"
            disabled="disabled"
            value={props.order.shippingDetail.phone}
            label="Phone"
          />
          <Input
            type="text"
            disabled={"disabled"}
            value={props.order.shippingDetail.email}
            label="Email"
          />
          <Input
            type="text"
            disabled={"disabled"}
            placeholder={Moment(props.order.dateCreated).format(
              "HH:MM DD/MM/YYYY"
            )}
            label="Date created"
          />
          <Input
            type="text"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={props.order.products.length}
            placeholder={
              modalType === "detail" ? props.order.products.length : ""
            }
            onChange={(e) => onChange(e, "fax")}
            label="products"
          />
          <Dropdown
            list={statusList}
            label="Status"
            onItemClick={(e) => {}}
            selectedValue={props.order.status}
          />
          <Input
            type="text"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={order.shipper}
            placeholder={modalType === "detail" ? props.order.shipper : ""}
            onChange={(e) => onChange(e, "fax")}
            label="Shipper"
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

export default OrderModal;
