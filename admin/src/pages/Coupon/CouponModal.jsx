import Moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import couponApi from "../../api/couponApi";
import Button from "../../components/common/Button";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import Input from "../../components/common/Input/Input";
import { showDeletePopup } from "../../redux/features/commonSlice";
import { getAll, hideModal, showModal } from "../../redux/features/couponSlice";

const CouponModal = (props) => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.coupon.modalType);
  const [coupon, setCoupon] = useState({
    code: modalType === "add" ? "" : props.coupon.code,
    discount: modalType === "add" ? "" : props.coupon.discount,
    startDate: modalType === "add" ? "" : props.coupon.startDate,
    endDate: modalType === "add" ? "" : props.coupon.endDate,
    available: modalType === "add" ? "" : props.coupon.available,
    status: modalType === "add" ? "active" : props.coupon.status,
  });

  const listStatus = [
    {
      name: "active",
      value: "active",
    },
    {
      name: "inactive",
      value: "inactive",
    },
  ];

  console.log(`coupon: ${JSON.stringify(coupon)}`);

  const onClose = () => {
    dispatch(hideModal());
  };

  const onEditClick = () => {
    dispatch(showModal("edit"));
  };

  const onChange = (e, key) => {
    setCoupon({ ...coupon, [key]: e.target.value });
  };

  const onDeleteClick = () => {
    dispatch(
      showDeletePopup({
        type: "coupon",
        id: props.coupon._id,
      })
    );
  };

  const onSave = async () => {
    try {
      modalType === "edit"
        ? await couponApi.update(props.coupon._id, coupon)
        : await couponApi.create(coupon);

      dispatch(getAll());
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overlay">
      <div className="popup">
        <h3 className="popup__title">Coupon Detail</h3>
        <div className="popup__content">
          <Input
            type="text"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={coupon.code}
            placeholder={modalType === "detail" ? props.coupon.code : ""}
            onChange={(e) => onChange(e, "code")}
            label="Code"
          />
          <Input
            type="text"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={coupon.discount}
            placeholder={modalType === "detail" ? props.coupon.discount : ""}
            onChange={(e) => onChange(e, "discount")}
            label="Discount"
          />
          <Input
            type="date"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={Moment(coupon.startDate).format("YYYY-MM-DD")}
            placeholder={modalType === "detail" ? props.coupon.startDate : ""}
            onChange={(e) =>
              setCoupon({ ...coupon, startDate: new Date(e.target.value) })
            }
            label="Start Date"
          />
          <Input
            type="date"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={Moment(coupon.endDate).format("YYYY-MM-DD")}
            placeholder={modalType === "detail" ? props.coupon.endDate : ""}
            onChange={(e) =>
              setCoupon({ ...coupon, endDate: new Date(e.target.value) })
            }
            label="End Date"
          />
          <Input
            type="text"
            disabled={modalType === "detail" ? "disabled" : ""}
            value={coupon.available}
            placeholder={modalType === "detail" ? props.coupon.available : ""}
            onChange={(e) => onChange(e, "available")}
            label="Available"
          />

          <Dropdown
            list={listStatus}
            label="Status"
            onItemClick={(e) =>
              setCoupon({ ...coupon, status: e.target.dataset.value })
            }
            disabled={modalType === "detail" ? "disabled" : ""}
            selectedValue={
              modalType === "edit" ? props.coupon.status : "active"
            }
          />
        </div>
        <div style={{ float: "right", marginTop: "10px" }}>
          {modalType === "detail" ? (
            <>
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

export default CouponModal;
