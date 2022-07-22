var express = require("express");
var router = express.Router();
const { body } = require("express-validator");
const validation = require("../middlewares/validation");
const tokenHandler = require("../middlewares/tokenHandler");
const User = require("../models/user");

var userController = require("../controllers/user");

router.post(
  "/signup",
  body("username")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters long"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("confirmPassword must be at least 8 characters long"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("Username already exists");
      }
    });
  }),
  body("confirmPassword").custom((value, { req }) => {
    console.log(req.body.password, value);
    if (value !== req.body.password) {
      return Promise.reject("Passwords do not match");
    }
    return true;
  }),
  validation.validate,
  userController.register
);

router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters long"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  validation.validate,
  userController.login
);

router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      username: req.user.username,
      role: req.user.role,
      status: req.user.status,
    },
  });
});

module.exports = router;
