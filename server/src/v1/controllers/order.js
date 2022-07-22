const mongoose = require("mongoose");
const Order = require("../models/order");
const Coupon = require("../models/coupon");

exports.getAll = async (req, res) => {
  try {
    const orders = await Order.find()
      .select(
        "_id products dateCreated coupon shippingDetail status shipper exportDate"
      )
      .sort({ dateCreated: -1 })
      .populate("products.product", "name price image")
      .populate("shipper", "name");
    res.status(200).json({
      status: "success",
      orders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res, next) => {
  const products = req.body.products;
  const shippingDetail = req.body.shippingDetail;
  const coupon = req.body.coupon;
  const orderId = req.body.orderId;

  try {
    const newOrder = await Order.create({
      orderId,
      products,
      shippingDetail,
      coupon: coupon ? coupon : null,
    });

    if (newOrder) {
      //if success, decrease coupon quantity
      if (coupon) {
        await Coupon.updateOne({ _id: coupon }, { $inc: { available: -1 } });
      }

      res.status(200).json({
        status: "success",
        order: newOrder,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Create order failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { orderId } = req.params;
  const { code, discount, startDate, endDate, available, status } = req.body;

  try {
    const orderUpdated = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!orderUpdated)
      return res
        .status(404)
        .json({ status: "error", message: "Update order failed" });

    res.status(200).json({
      status: "success",
      order: orderUpdated,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// exports.delete = async (req, res) => {
//   const { couponId } = req.params;
//   try {
//     const couponDeleted = await Coupon.deleteOne({ _id: couponId });
//     if (!couponDeleted)
//       return res
//         .status(404)
//         .json({ status: "error", message: "Delete coupon failed" });

//     res.status(200).json({
//       status: "success",
//       message: "Coupon deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };
