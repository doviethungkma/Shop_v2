import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "../../redux/features/categorySlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Button from "../../components/common/Button";
import { showModal } from "../../redux/features/categorySlice";
import CategoryModal from "./CategoryModal";
import DeletePopup from "../../components/common/DeletePopup/DeletePopup";
import {
  hideDeletePopup,
  showDeletePopup,
} from "../../redux/features/commonSlice";
import categoryApi from "../../api/categoryApi";

const Category = () => {
  let i = 1;
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const isShowModal = useSelector((state) => state.category.isShowModal);
  const modalType = useSelector((state) => state.category.modalType);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [category, setCategory] = useState();
  const isDelete = useSelector((state) => state.common.isDelete);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    dispatch(getAll())
      .then(unwrapResult)
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }, []);

  const onDelete = async () => {
    try {
      await categoryApi.delete(category._id);
      dispatch(hideDeletePopup());
      dispatch(getAll());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page user">
      <h2 className="page__title">All Users</h2>

      <div className="page__content">
        <table className="user__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((item, index) => (
                <tr key={item._id}>
                  <td>{i++}</td>
                  <td
                    className="text-clickable"
                    onClick={() => {
                      setCategory(item);
                      dispatch(showModal("detail"));
                    }}
                  >
                    {item.name}
                  </td>
                  {windowWidth > 600 && (
                    <td>
                      <Button
                        buttonType="danger"
                        size="sm"
                        name="Delete"
                        onClick={() => {
                          setCategory(item);
                          dispatch(
                            showDeletePopup({ type: "category", id: item._id })
                          );
                        }}
                      />
                      <Button
                        buttonType="primary"
                        size="sm"
                        name="Edit"
                        onClick={() => {
                          setCategory(item);
                          dispatch(showModal("edit"));
                        }}
                      />
                    </td>
                  )}
                </tr>
              ))}
            <tr>
              <td colSpan={windowWidth > 600 ? 3 : 2}>
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
      {isShowModal && <CategoryModal type={modalType} category={category} />}
      {isDelete.status && <DeletePopup />}
    </div>
  );
};

export default Category;
