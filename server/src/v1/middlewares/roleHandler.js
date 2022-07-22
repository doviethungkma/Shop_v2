const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/user");
const tokenHandler = require("./tokenHandler");
const constant = require("../utils/Constant");

const listValidRole = [
  constant.ADMIN_ROLE,
  constant.USER_ROLE,
  constant.SHIPPER_ROLE,
  constant.WAREHOSE_ROLE,
];

exports.checkRole = (acceptRole) => {
  return async (req, res, next) => {
    try {
      const tokenDecoded = tokenHandler.tokenDecode(req);
      if (tokenDecoded) {
        const user = await User.findById(tokenDecoded.id);
        if (!user) return res.status(401).json("Unauthorized");
        if (acceptRole.includes(user.role)) {
          next();
          return;
        } else {
          return res.status(401).json("You cant access this resource");
        }
      }
    } catch (error) {
      return res.status(401).json("Unauthorized");
    }
  };
};

exports.isValidRole = (role) => {
  console.log(`role: ${role}`);
  console.log(`listValidRole: ${listValidRole}`);
  console.log(listValidRole.includes(role));
  return listValidRole.includes(role);
};
