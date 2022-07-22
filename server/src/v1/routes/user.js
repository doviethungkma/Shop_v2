var express = require("express");
var router = express.Router();
const { param, body } = require("express-validator");
const validation = require("../middlewares/validation");
const tokenHandler = require("../middlewares/tokenHandler");
const User = require("../models/user");
const roleHandler = require("../middlewares/roleHandler");
const constant = require("../utils/Constant");

var userController = require("../controllers/user");

router.get(
  "/",
  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  userController.getAll
);

router.put(
  "/:userId",
  param("userId").custom((value) => {
    if (!validation.isValidId(value)) {
      return Promise.reject("Invalid user id");
    } else return Promise.resolve();
  }),
  body("role").custom((value) => {
    if (!roleHandler.isValidRole(parseInt(value))) {
      return Promise.reject("Invalid role");
    } else return Promise.resolve();
  }),
  body("status").custom((value) => {
    if (!validation.isValidUserStatus(parseInt(value))) {
      return Promise.reject("Invalid status");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  roleHandler.checkRole([constant.ADMIN_ROLE]),
  userController.update
);

router.get("/role", tokenHandler.verifyToken, userController.getRole);

module.exports = router;
