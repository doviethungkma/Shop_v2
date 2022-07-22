const mongoose = require("mongoose");
const schemaOptions = require("./modelOptions");

const providerSchema = new mongoose.Schema(
  {
    name: {
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
    fax: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  schemaOptions.schemaOptions
);

module.exports = mongoose.model("Provider", providerSchema);
