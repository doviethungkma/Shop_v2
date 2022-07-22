import React, { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input/Input";
import { useDispatch } from "react-redux";
import { getAll, hideModal } from "../../redux/features/categorySlice";
import categoryApi from "../../api/categoryApi";
import "./category.scss";

const CategoryModal = (props) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState(
    props.type === "edit" ? props.category.name : ""
  );

  const onSave = async () => {
    try {
      props.type === "edit"
        ? await categoryApi.update(props.category._id, {
            name: categoryName,
          })
        : await categoryApi.create({ name: categoryName });
      dispatch(getAll());
      dispatch(hideModal());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overlay">
      <div className="popup category__modal">
        <h3 className="popup__title">Category Detail</h3>
        <div className="popup__content category__modal__content">
          {props.type === "detail" ? (
            <Input
              type="text"
              disabled="disabled"
              placeholder={props.category.name}
              label="Category name"
            />
          ) : (
            <Input
              type="text"
              label="Category name"
              value={categoryName}
              placeholder={props.type === "edit" ? "" : "Name"}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          )}
        </div>
        <div style={{ float: "right", marginTop: "10px" }}>
          <Button
            name={props.type === "detail" ? "Close" : "Cancle"}
            type="button"
            buttonType="danger"
            size="sm"
            onClick={() => dispatch(hideModal())}
          />
          {props.type === "edit" ||
            (props.type === "add" && (
              <Button
                name="Save"
                type="button"
                buttonType="success"
                size="sm"
                onClick={onSave}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
