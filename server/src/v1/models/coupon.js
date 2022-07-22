const mongoose = require("mongoose");
const schemaOptions = require("./modelOptions");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true, //using for admin when create coupon
    },
    endDate: {
      type: Date,
      required: true, //using for admin when create coupon
    },
    available: {
      type: Number,
      required: true,
      default: 1,
    },
    status: {
      type: String,
      default: "active", // active, inactive. Using for admin only
    },
    createdAt: {
      type: Date,
      default: Date.now, //using for user when checkout
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Coupon", couponSchema);
