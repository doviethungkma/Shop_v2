const mongoose = require("mongoose");
const Provider = require("../models/provider");

exports.getAll = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.status(200).json({
      status: "success",
      providers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res, next) => {
  const { name, address, phone, fax, email } = req.body;
  try {
    const newProvider = await Provider.create({
      name,
      address,
      phone,
      fax,
      email,
    });
    if (!newProvider) {
      return res.status(404).json({
        status: "error",
        message: "Create provider failed",
      });
    }

    res.status(200).json({
      status: "success",
      provider: newProvider,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.update = async (req, res) => {
  const { providerId } = req.params;
  console.log(req.body);
  const { name, address, phone, fax, email } = req.body;

  try {
    const providerUpdated = await Provider.findByIdAndUpdate(
      providerId,
      {
        $set: { name, address, phone, fax, email },
      },
      { new: true }
    );
    if (!providerUpdated)
      return res
        .status(404)
        .json({ status: "error", message: "Update provider failed" });

    res.status(200).json({
      status: "success",
      provider: providerUpdated,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { providerId } = req.params;
  try {
    const providerDeleted = await Provider.deleteOne({ _id: providerId });
    if (!providerDeleted)
      return res
        .status(404)
        .json({ status: "error", message: "Delete provider failed" });

    res.status(200).json({
      status: "success",
      message: "Provider deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
