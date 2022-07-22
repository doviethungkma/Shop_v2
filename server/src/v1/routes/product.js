var express = require("express");
var router = express.Router();
const { param, body } = require("express-validator");
const validation = require("../middlewares/validation");
const tokenHandler = require("../middlewares/tokenHandler");
const productController = require("../controllers/product");
const Product = require("../models/product");
const Category = require("../models/category");
const roleHandler = require("../middlewares/roleHandler");
const constant = require("../utils/Constant");

router.get("/", validation.validate, productController.getAll);

router.post(
  "/",
  body("category").custom(async (value, { req }) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid category id");
    } else {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return Promise.reject("Category not found");
      } else return Promise.resolve();
    }
  }),
  body("price").custom((value) => {
    if (value <= 0) {
      return Promise.reject("Price must be greater than 0");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  productController.create
);

router.put(
  "/:productId",
  param("productId").custom(async (value) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid product id");
    } else {
      const product = await Product.findById(value);
      if (!product) {
        return Promise.reject("Product not found");
      } else return Promise.resolve();
    }
  }),
  body("category").custom(async (value) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid category id");
    } else {
      const category = await Category.findById(value);
      if (!category) {
        return Promise.reject("Category not found");
      } else return Promise.resolve();
    }
  }),
  body("price").custom((value) => {
    if (value <= 0) {
      return Promise.reject("Price must be greater than 0");
    } else return Promise.resolve();
  }),
  body("available").custom((value) => {
    if (value <= 0) {
      return Promise.reject("Available must be greater than 0");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  productController.update
);

router.delete(
  "/:productId",
  param("productId").custom(async (value) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid product id");
    } else {
      const product = await Product.findById(value);
      if (!product) {
        return Promise.reject("Product not found");
      } else return Promise.resolve();
    }
  }),

  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE, constant.WAREHOSE_ROLE]),
  productController.delete
);

module.exports = router;
