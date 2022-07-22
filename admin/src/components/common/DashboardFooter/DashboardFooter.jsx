import React from "react";
import RecentUpdateItem from "../RecentUpdateItem/RecentUpdateItem";
import Table from "../DashboardTable/DashboardTable";
import "./dashboard-footer.scss";

const DashboardFooter = () => {
  return (
    <div className="dashboard__footer">
      <Table />
      <div className="recent-comment">
        <h2>Recent Comment</h2>
        <div className="recent-comment__content">
          <RecentUpdateItem image="profile-3" />
          <RecentUpdateItem image="profile-3" />
          <RecentUpdateItem image="profile-3" />
          <RecentUpdateItem image="profile-3" />
          <RecentUpdateItem image="profile-3" />
          <RecentUpdateItem image="profile-3" />
        </div>
      </div>
    </div>
  );
};

export default DashboardFooter;
