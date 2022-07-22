import React from "react";
import "./dashboard-table.scss";

//Get data from DB to table

const Table = () => {
  return (
    <div className="table">
      <h2>Top Order Product</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Number</th>
            <th>Payment</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="warning">Pending</td>
            <td className="primary">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="warning">Pending</td>
            <td className="primary">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="warning">Pending</td>
            <td className="primary">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="warning">Pending</td>
            <td className="primary">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="warning">Pending</td>
            <td className="primary">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="warning">Pending</td>
            <td className="primary">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="warning">Pending</td>
            <td className="primary">Details</td>
          </tr>
          <tr>
            <td>Foldable Mini Drone</td>
            <td>85631</td>
            <td>Due</td>
            <td className="warning">Pending</td>
            <td className="primary">Details</td>
          </tr>
        </tbody>
      </table>
      <p>Show All</p>
    </div>
  );
};

export default Table;
