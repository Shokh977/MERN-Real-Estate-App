const User = require("../Models/User.module");
const bcryptjs = require("bcryptjs");
const { errorHandler } = require("../Utils/error");
const jwt = require("jsonwebtoken");
const setToken = require("../Utils/setToken");

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!email || !password || !username) {
      throw new Error("All fields are required to be filled in");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already has an account" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      username,
    });
    await user.save();
    setToken(res, user._id);
    res.status(201).json({
      message: "User is created!",
      success: true,
      user: { ...user._doc, password: undefined },
    });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User Not Found!"));
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHandler(401, "Email or Password is wrong!"));
    }
    setToken(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    res
      .status(200)
      .json({
        success: true,
        message: "logged in successfully",
        user: { ...user._doc, password: undefined },
      });
  } catch (err) {
    next(err);
  }
};

exports.checkAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user });  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
exports.google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    let user = await User.findOne({ email });

    if (user) {
      setToken(res, user._id);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const userName = `${name.replace(/\s+/g, "").toLowerCase()}${Math.random()
        .toString(36)
        .slice(-4)}`;

      user = new User({
        userName,
        email,
        password: hashedPassword,
        avatar: photo,
      });
      await user.save();
      setToken(res, user._id);
    }
  } catch (err) {
    console.error("Error in Google authentication:", err);
    next(err);
  }
};

exports.signout = async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json("User has been logged out!");
  } 

  exports.deleteProfile = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return next(errorHandler(404, "User not found"));
      }
        await User.findByIdAndDelete(req.user.id);
  
      res.status(200).json({
        success: true,
        message: "Your profile has been deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  };
