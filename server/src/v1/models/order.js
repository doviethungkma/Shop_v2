const mongoose = require("mongoose");
const schemaOptions = require("./modelOptions");

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
    shippingDetail: {
      fullName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
    },
    total: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending", //when user create order, status is pending. when admin confirm order, status is confirmed. when user or admin cancel order, status is canceled. When order is shipped , status is completed. when order is shipping, status is shipping.
    },

    shipper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    exportDate: {
      type: Date,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Order", orderSchema);
