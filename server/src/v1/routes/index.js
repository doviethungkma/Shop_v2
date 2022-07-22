var express = require("express");
var router = express.Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./user"));
router.use("/product", require("./product"));
router.use("/category", require("./category"));
router.use("/coupon", require("./coupon"));
router.use("/order", require("./order"));
router.use("/upload", require("./upload"));
router.use("/provider", require("./provider"));
router.use("/import", require("./import"));
router.use("/export", require("./export"));

module.exports = router;
