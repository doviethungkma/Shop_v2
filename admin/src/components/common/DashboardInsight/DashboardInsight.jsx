import React from "react";
import InforCard from "../InforCard/InforCard";
import "./dashboard-insight.scss";

const DashboardInsight = () => {
  return (
    <div className="dashboard__insights">
      <InforCard
        title="Total Sales"
        number="25,024"
        icon="analytics"
        color="#7380ec"
      />
      <InforCard
        title="Total Expenses"
        number="14,160"
        icon="bar_chart"
        color="#ff7782"
      />
      <InforCard
        title="Total Income"
        number="10,864"
        icon="stacked_line_chart"
        color="#41f1b6"
      />
    </div>
  );
};

export default DashboardInsight;
