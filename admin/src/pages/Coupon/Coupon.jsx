import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, showModal } from "../../redux/features/couponSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Button from "../../components/common/Button";
import CouponModal from "./CouponModal";
import DeletePopup from "../../components/common/DeletePopup/DeletePopup";
import Moment from "moment";

const Coupon = () => {
  let i = 1;
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupon.coupons);
  const isShowModal = useSelector((state) => state.coupon.isShowModal);
  const isDelete = useSelector((state) => state.common.isDelete);
  const [coupon, setCoupon] = useState();

  useEffect(() => {
    dispatch(getAll())
      .then(unwrapResult)
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }, []);

  return (
    <div className="page coupon">
      <h2 className="page__title">All Coupon</h2>

      <div className="page__content">
        <table className="coupon__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Discount</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Available</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {coupons &&
              coupons.map((item) => (
                <tr key={item._id}>
                  <td>{i++}</td>
                  <td
                    className="text-clickable"
                    onClick={() => {
                      setCoupon(item);
                      dispatch(showModal("detail"));
                    }}
                  >
                    {item.code}
                  </td>
                  <td>{item.discount}</td>
                  <td>{Moment(item.startDate).format("DD-MM-YYYY")}</td>
                  <td>{Moment(item.endDate).format("DD-MM-YYYY")}</td>
                  <td>{item.available}</td>
                  <td
                    style={{
                      color:
                        item.status === "active"
                          ? "var(--color-success)"
                          : "var(--color-danger)",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan={7}>
                <Button
                  buttonType="success"
                  name="Add"
                  size="sm"
                  onClick={() => {
                    dispatch(showModal("add"));
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isShowModal && <CouponModal coupon={coupon} />}
      {isDelete.status && <DeletePopup />}
    </div>
  );
};

export default Coupon;
