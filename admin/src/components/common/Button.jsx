import React from "react";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={`btn-${props.buttonType} btn-${props.size}`}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};

export default Button;
