const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const constant = require("../utils/constant");

const listValidUserStatus = [
  constant.USER_STATUS_ACTIVE,
  constant.USER_STATUS_INACTIVE,
];
const listValidCouponStatus = [
  constant.COUPON_STATUS_ACTIVE,
  constant.COUPON_STATUS_INACTIVE,
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  next();
};

exports.isValidId = (value) => mongoose.Types.ObjectId.isValid(value);

exports.isValidUserStatus = (value) => listValidUserStatus.includes(value);

exports.isValidCouponStatus = (value) => listValidCouponStatus.includes(value);
