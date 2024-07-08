const validator = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.list_users_controller = asyncHandler(async (req, res, next) => {
  const users = await User.find({}, "username").sort({ username: 1 }).exec();

  return res.send(Object.values(users));
});

exports.create_user_controller = asyncHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    try {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await user.save();
    } catch {
      next(err);
    }
  });
  return res.send(req.body);
});

exports.update_user_controller = asyncHandler(async (req, res, next) => {
  return res.send("Updating User");
});

exports.delete_user_controller = asyncHandler(async (req, res, next) => {
  return res.send("Deleting User");
});
