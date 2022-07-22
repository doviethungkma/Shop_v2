const mongoose = require("mongoose");
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const jsonwebtoken = require("jsonwebtoken");
const tokenHandler = require("../middlewares/tokenHandler");
const constant = require("../utils/Constant");

exports.register = async (req, res) => {
  const { username, password, confirmPassword, email } = req.body;

  try {
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    );
    const newUser = await User.create({
      username,
      password: encryptedPassword.toString(),
      email,
    });

    const token = jsonwebtoken.sign(
      {
        id: newUser._id,
      },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      status: "success",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select(
      "username password role status"
    );

    //check user exist
    if (!user) {
      return res.status(200).json({
        status: "error",
        message: "Invalid username or password",
      });
    }

    //check user inactive
    if (user.status === constant.USER_STATUS_INACTIVE) {
      return res.status(200).json({
        status: "error",
        message: "Your account is inactive",
      });
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPassword !== password) {
      return res.status(200).json({
        status: "error",
        message: "Invalid username or password",
      });
    }

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      status: "success",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select(
      "username email name address phone gender DoB role status"
    );
    res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRole = async (req, res) => {
  try {
    const tokenDecoded = tokenHandler.tokenDecode(req);
    if (tokenDecoded) {
      const user = await User.findById(tokenDecoded.id);
      if (!user) return res.status(401).json("Unauthorized");
      return res.status(200).json({
        status: "success",
        role: user.role,
      });
    }
  } catch (error) {
    return res.status(401).json("Unauthorized");
  }
};

exports.update = async (req, res) => {
  const { userId } = req.params;
  const user = req.body;
  try {
    const userUpdated = await User.findByIdAndUpdate(
      userId,
      {
        $set: user,
      },
      // return new updated user instead of original user
      { new: true }
    ).select("username email address phone gender DoB role status");
    console.log(userUpdated);
    if (!userUpdated) return res.status(404).json("Update user failed");
    res.status(200).json({
      status: "success",
      user: userUpdated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
