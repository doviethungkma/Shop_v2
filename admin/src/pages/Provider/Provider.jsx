import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAll, showModal } from "../../redux/features/providerSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import ProviderModal from "./ProviderModal";
import DeletePopup from "../../components/common/DeletePopup/DeletePopup";
import Button from "../../components/common/Button";

const Provider = () => {
  let i = 1;
  const dispatch = useDispatch();
  const providers = useSelector((state) => state.provider.providers);
  const isShowModal = useSelector((state) => state.provider.isShowModal);
  const isDelete = useSelector((state) => state.common.isDelete);
  const [provider, setProvider] = useState();

  useEffect(() => {
    dispatch(getAll())
      .then(unwrapResult)
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }, []);

  return (
    <div className="page provider">
      <h2 className="page__title">All Provider</h2>

      <div className="page__content">
        <table className="provider__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Fax</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {providers &&
              providers.map((item) => (
                <tr key={item._id}>
                  <td>{i++}</td>
                  <td
                    className="text-clickable"
                    onClick={() => {
                      setProvider(item);
                      dispatch(showModal("detail"));
                    }}
                  >
                    {item.name}
                  </td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.fax}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            <tr>
              <td colSpan={6}>
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
      {isShowModal && <ProviderModal provider={provider} />}
      {isDelete.status && <DeletePopup />}
    </div>
  );
};

export default Provider;
