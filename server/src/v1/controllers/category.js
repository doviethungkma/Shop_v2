const mongoose = require("mongoose");
const Category = require("../models/category");

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "success",
      categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    if (!newCategory) {
      res.status(404).json({
        status: "error",
        message: "Create category failed",
      });
    }

    res.status(200).json({
      status: "success",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { categoryId } = req.params;
  const name = req.body;

  try {
    const categoryUpdated = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: name,
      },
      { new: true }
    );
    if (!categoryUpdated)
      return res
        .status(404)
        .json({ status: "error", message: "Update category failed" });

    res.status(200).json({
      status: "success",
      category: categoryUpdated,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const categoryDeleted = await Category.deleteOne({ _id: categoryId });
    if (!categoryDeleted)
      return res
        .status(404)
        .json({ status: "error", message: "Delete category failed" });

    res.status(200).json({
      status: "success",
      message: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
