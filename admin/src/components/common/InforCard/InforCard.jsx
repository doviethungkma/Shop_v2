import React from "react";
import MaterialIcon from "material-icons-react";
import "./infor-card.scss";

const InforCard = ({ title, number, icon, color }) => {
  return (
    <div className="inforcard">
      <MaterialIcon icon={icon} color="var(--color-white)" />
      <div className="inforcard__middle">
        <div className="left">
          <h3>{title}</h3>
          <h1>${number}</h1>
        </div>
        <div className="progress">
          <svg>
            <circle cx="38" cy="38" r="36" />
          </svg>
          <div className="number">
            <p>81%</p>
          </div>
        </div>
      </div>
      <small className="text-muted">Last 24 Hours</small>
    </div>
  );
};

export default InforCard;
