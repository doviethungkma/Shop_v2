const mongoose = require("mongoose");
const shemaOptions = require("./modelOptions");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  shemaOptions
);

module.exports = mongoose.model("Category", categorySchema);
