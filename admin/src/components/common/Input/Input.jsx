import React from "react";
import "./input.scss";

const Input = (props) => {
  return (
    <div
      className="input-bx"
      style={{
        width: props.width === "fullWidth" ? "100%" : `"${props.width}px"`,
      }}
    >
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={props.className}
        id={props.id}
        name={props.name}
        disabled={props.disabled ? "disabled" : ""}
        value={props.value}
      />
      <span>{props.error}</span>
    </div>
  );
};

export default Input;
