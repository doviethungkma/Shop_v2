import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAll,
  showModal,
  showProductModal,
} from "../../redux/features/orderSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import DeletePopup from "../../components/common/DeletePopup/DeletePopup";
import Button from "../../components/common/Button";
import OrderModal from "./OrderModal";
import Moment from "moment";
import OrderProduct from "./OrderProduct";

const Order = () => {
  let i = 1;
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const isShowModal = useSelector((state) => state.order.isShowModal);
  const isShowProductModal = useSelector(
    (state) => state.order.isShowProductModal
  );
  const isDelete = useSelector((state) => state.common.isDelete);

  const [order, setOrder] = useState();

  useEffect(() => {
    dispatch(getAll())
      .then(unwrapResult)
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }, []);

  return (
    <div className="page order">
      <h2 className="page__title">All Provider</h2>

      <div className="page__content">
        <table className="order__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fullname</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Date created</th>
              <th>Products</th>
              <th>Status</th>
              <th>Shipper</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((item) => (
                <tr key={item._id}>
                  <td>{i++}</td>
                  <td
                    className="text-clickable"
                    onClick={() => {
                      setOrder(item);
                      dispatch(showModal("detail"));
                    }}
                  >
                    {item.shippingDetail.fullName}
                  </td>
                  <td>{item.shippingDetail.address}</td>
                  <td>{item.shippingDetail.phone}</td>

                  <td>{Moment(item.dateCreated).format("HH:MM DD-MM-YYYY")}</td>
                  <td
                    className="text-clickable"
                    onClick={() => dispatch(showProductModal())}
                  >
                    {item.products.reduce((total, item) => {
                      return total + item.quantity;
                    }, 0)}
                  </td>
                  <td>{item.status}</td>
                  <td>{item.shipper}</td>
                </tr>
              ))}
            <tr>
              <td colSpan={8}>
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
      {isShowModal && <OrderModal order={order} />}
      {isShowProductModal && <OrderProduct />}
      {isDelete.status && <DeletePopup />}
    </div>
  );
};

export default Order;
