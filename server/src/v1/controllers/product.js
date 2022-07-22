const mongoose = require("mongoose");
const Product = require("../models/product");

exports.getAll = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res, next) => {
  const {
    name,
    category,
    price,
    available,
    image,
    description,
    tags,
    trademark,
  } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      category,
      price,
      available,
      image,
      description,
      tags,
      trademark,
    });
    if (!newProduct) {
      return res.status(404).json({
        status: "error",
        message: "Create product failed",
      });
    }

    res.status(200).json({
      status: "success",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

exports.update = async (req, res) => {
  const { productId } = req.params;

  const { name, category, price, image, description, tags, trademark } =
    req.body;

  try {
    const productUpdated = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          //don't update available. It's update when import, export, or order product
          name,
          category,
          price,
          image,
          description,
          tags,
          trademark,
        },
      },
      { new: true }
    );
    if (!productUpdated)
      return res
        .status(404)
        .json({ status: "error", message: "Update product failed" });

    res.status(200).json({
      status: "success",
      product: productUpdated,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { productId } = req.params;
  try {
    const productDeleted = await Product.deleteOne({ _id: productId });
    if (!productDeleted)
      return res
        .status(404)
        .json({ status: "error", message: "Delete product failed" });

    res.status(200).json({
      status: "success",
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
