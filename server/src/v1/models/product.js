const mongoose = require("mongoose");
const schemaOptions = require("./modelOptions");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Number,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: {
      type: Array,
    },
    trademark: {
      type: String,
    },
  },
  schemaOptions
);

module.exports = mongoose.model("Product", productSchema);
