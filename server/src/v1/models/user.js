const mongoose = require("mongoose");
const constant = require("../utils/Constant");
const shemaOptions = require("./modelOptions");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
    },
    DoB: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: Number,
      default: constant.USER_ROLE,
    },
    status: {
      type: "Number",
      default: constant.USER_STATUS_ACTIVE,
    },
  },
  shemaOptions
);

module.exports = mongoose.model("User", userSchema);
