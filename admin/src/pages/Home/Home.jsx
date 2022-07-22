import React from "react";
import DashboardFooter from "../../components/common/DashboardFooter/DashboardFooter";
import DashboardInsight from "../../components/common/DashboardInsight/DashboardInsight";
import "./home.scss";

const Home = () => {
  return (
    <div className="dashboard">
      <h1 style={{ animation: "slideLeft 0.8s ease" }}>Dashboard</h1>
      <DashboardInsight />
      <DashboardFooter />
    </div>
  );
};

export default Home;
