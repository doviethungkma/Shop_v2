import React, { useState, useEffect } from "react";
import { randomImage } from "../../../utils/common";
import "./recent-update-item.scss";

const RecentUpdateItem = ({ name, time, image, qty, productName, type }) => {
  const [profileImage, setProfileImage] = useState("");

  const getRandomImage = async () => {
    const imagePath = await randomImage();
    setProfileImage(imagePath);
  };
  useEffect(() => {
    getRandomImage();
  }, []);
  return (
    <div className="recent-updates-item">
      <div>
        <img src={profileImage} alt={profileImage} />
      </div>
      <div className="message">
        <p>
          {type === "order" ? (
            <>
              <b>{name}</b> has ordered {qty} item
            </>
          ) : (
            <>
              <b>{name}</b> has comment on {productName}
            </>
          )}
        </p>
        <small className="text-muted">{time}</small>
      </div>
    </div>
  );
};

export default RecentUpdateItem;
