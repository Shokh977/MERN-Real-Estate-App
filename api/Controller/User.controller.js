const User = require("../Models/User.module");
const { errorHandler } = require("../Utils/error");
const bcryptjs = require("bcryptjs");

exports.test = (req, res) => {
  res.send("love you babe");
};

exports.updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return (
      console.log(req.user, "req.user"), console.log(req.params, "req.params")
    );
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (err) {
    console.error(err);
    return next(errorHandler(500, "Error updating user"));
  }
};

exports.deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!")
  } catch (err) {
    next(err);
  }
};
