import React from "react";
import "./delete-popup.scss";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { hideDeletePopup } from "../../../redux/features/commonSlice";
import categoryApi from "../../../api/categoryApi";
import { getAll as getAllCategory } from "../../../redux/features/categorySlice";
import {
  getAll as getAllProvider,
  hideModal as hideProviderModal,
} from "../../../redux/features/providerSlice";
import providerApi from "../../../api/providerApi";
import couponApi from "../../../api/couponApi";
import {
  getAll as getAllCoupon,
  hideModal as hideCouponModal,
} from "../../../redux/features/couponSlice";

const DeletePopup = (props) => {
  const dispatch = useDispatch();
  const isDelete = useSelector((state) => state.common.isDelete);

  const onDelete = async () => {
    switch (isDelete.type) {
      case "category":
        await categoryApi.delete(isDelete.id);
        dispatch(hideDeletePopup());
        dispatch(getAllCategory());
        break;
      case "provider":
        await providerApi.delete(isDelete.id);
        dispatch(hideDeletePopup());
        dispatch(getAllProvider());
        dispatch(hideProviderModal());
        break;
      case "coupon":
        await couponApi.delete(isDelete.id);
        dispatch(hideDeletePopup());
        dispatch(getAllCoupon());
        dispatch(hideCouponModal());
        break;
    }
  };

  return (
    <div className="overlay">
      <div className="popup delete__popup">
        <div className="popup__content delete__popup__content">
          <h4>Are you sure you want delete this {isDelete.type}?</h4>
        </div>
        <div className="delete__popup__button">
          <Button
            name="Cancel"
            type="button"
            buttonType="primary"
            size="sm"
            onClick={() => dispatch(hideDeletePopup())}
          />
          <Button
            name="Delete"
            type="button"
            buttonType="danger"
            size="sm"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
