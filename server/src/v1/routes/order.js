var express = require("express");
var router = express.Router();
const { param, body } = require("express-validator");
const validation = require("../middlewares/validation");
const tokenHandler = require("../middlewares/tokenHandler");
const orderController = require("../controllers/order");
const Order = require("../models/order");
const roleHandler = require("../middlewares/roleHandler");
const constant = require("../utils/Constant");

router.get(
  "/",
  validation.validate,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  orderController.getAll
);

router.post(
  "/",
  validation.validate,
  tokenHandler.verifyToken,
  orderController.create
);

router.put(
  "/:orderId",
  param("orderId").custom(async (value) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid order id");
    } else {
      const order = await Order.findById(value);
      if (!order) {
        return Promise.reject("Order not found");
      } else return Promise.resolve();
    }
  }),
  validation.validate,
  tokenHandler.verifyToken,
  orderController.update
);

module.exports = router;
