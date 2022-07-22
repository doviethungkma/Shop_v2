var express = require("express");
var router = express.Router();
const { param, body } = require("express-validator");
const validation = require("../middlewares/validation");
const tokenHandler = require("../middlewares/tokenHandler");
const couponController = require("../controllers/coupon");
const Coupon = require("../models/coupon");
const roleHandler = require("../middlewares/roleHandler");
const constant = require("../utils/Constant");

router.get(
  "/",
  validation.validate,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  couponController.getAll
);

router.post(
  "/",
  body("status").custom((value) => {
    console.log(value);
    if (!validation.isValidCouponStatus(value)) {
      return Promise.reject("Invalid status");
    } else return Promise.resolve();
  }),
  body("available").custom((value) => {
    if (value <= 0) {
      return Promise.reject("Invalid available");
    } else return Promise.resolve();
  }),
  body("startDate").custom((value, { req }) => {
    if (value > req.body.endDate) {
      return Promise.reject("Start date must be before end date");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  couponController.create
);

router.put(
  "/:couponId",
  param("couponId").custom(async (value, { req }) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid coupon id");
    } else {
      const coupon = await Coupon.findById(req.params.couponId);
      if (!coupon) {
        return Promise.reject("Coupon not found");
      } else return Promise.resolve();
    }
  }),
  body("status").custom((value) => {
    if (!validation.isValidCouponStatus(value)) {
      return Promise.reject("Invalid status");
    } else return Promise.resolve();
  }),
  body("available").custom((value) => {
    if (value <= 0) {
      return Promise.reject("Invalid available");
    } else return Promise.resolve();
  }),
  body("startDate").custom((value, { req }) => {
    if (value > req.body.endDate) {
      return Promise.reject("Start date must be before end date");
    } else return Promise.resolve();
  }),

  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  couponController.update
);

router.delete(
  "/:couponId",
  param("couponId").custom(async (value, { req }) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid coupon id");
    } else {
      const coupon = await Coupon.findById(req.params.couponId);
      if (!coupon) {
        return Promise.reject("Coupon not found");
      } else return Promise.resolve();
    }
  }),

  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  couponController.delete
);

module.exports = router;
