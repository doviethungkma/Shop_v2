var express = require("express");
var router = express.Router();
const { param, body } = require("express-validator");
const validation = require("../middlewares/validation");
const tokenHandler = require("../middlewares/tokenHandler");
const providerController = require("../controllers/provider");
const Provider = require("../models/provider");
const roleHandler = require("../middlewares/roleHandler");
const constant = require("../utils/Constant");

router.get("/", validation.validate, providerController.getAll);

router.post(
  "/",
  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE, constant.WAREHOSE_ROLE]),
  providerController.create
);

router.put(
  "/:providerId",
  param("providerId").custom(async (value) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid provider id");
    } else {
      const provider = await Provider.findById(value);
      if (!provider) {
        return Promise.reject("Provider not found");
      } else return Promise.resolve();
    }
  }),

  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE, constant.WAREHOSE_ROLE]),
  providerController.update
);

router.delete(
  "/:providerId",
  param("providerId").custom(async (value) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid provider id");
    } else {
      const provider = await Provider.findById(value);
      if (!provider) {
        return Promise.reject("Provider not found");
      } else return Promise.resolve();
    }
  }),

  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE, constant.WAREHOSE_ROLE]),
  providerController.delete
);

module.exports = router;
