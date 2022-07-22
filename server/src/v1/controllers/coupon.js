const mongoose = require("mongoose");
const Coupon = require("../models/coupon");

exports.getAll = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({
      status: "success",
      coupons,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res, next) => {
  const { code, discount, startDate, endDate, available } = req.body;
  try {
    const newCoupon = await Coupon.create({
      code,
      discount,
      startDate,
      endDate,
      available,
    });
    if (!newCoupon) {
      res.status(404).json({
        status: "error",
        message: "Create coupon failed",
      });
    }

    res.status(200).json({
      status: "success",
      coupon: newCoupon,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { couponId } = req.params;
  const { code, discount, startDate, endDate, available, status } = req.body;

  try {
    const couponUpdated = await Coupon.findByIdAndUpdate(
      couponId,
      {
        $set: {
          code,
          discount,
          startDate,
          endDate,
          available,
          status,
        },
      },
      { new: true }
    );
    if (!couponUpdated)
      return res
        .status(404)
        .json({ status: "error", message: "Update coupon failed" });

    res.status(200).json({
      status: "success",
      coupon: couponUpdated,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { couponId } = req.params;
  try {
    const couponDeleted = await Coupon.deleteOne({ _id: couponId });
    if (!couponDeleted)
      return res
        .status(404)
        .json({ status: "error", message: "Delete coupon failed" });

    res.status(200).json({
      status: "success",
      message: "Coupon deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
