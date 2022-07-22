var express = require("express");
var router = express.Router();
const { param, body } = require("express-validator");
const validation = require("../middlewares/validation");
const tokenHandler = require("../middlewares/tokenHandler");
const categoryController = require("../controllers/category");
const Category = require("../models/category");
const roleHandler = require("../middlewares/roleHandler");
const constant = require("../utils/Constant");

router.get("/", validation.validate, categoryController.getAll);

router.post(
  "/",
  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  categoryController.create
);

router.put(
  "/:categoryId",
  param("categoryId").custom(async (value, { req }) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid category id");
    } else {
      const category = await Category.findById(req.params.categoryId);
      if (!category) {
        return Promise.reject("Category not found");
      } else return Promise.resolve();
    }
  }),

  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  categoryController.update
);

router.delete(
  "/:categoryId",
  param("categoryId").custom(async (value, { req }) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid category id");
    } else {
      const category = await Category.findById(req.params.categoryId);
      if (!category) {
        return Promise.reject("Category not found");
      } else return Promise.resolve();
    }
  }),

  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  categoryController.delete
);

module.exports = router;
