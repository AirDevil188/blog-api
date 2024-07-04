const validator = require("express-validator");
const asyncHandler = require("express-async-handler");

const User = require("../models/user");

exports.list_users_controller = asyncHandler(async (req, res, next) => {
  const users = await User.find().sort({ username: 1 }).exec();

  return res.send(Object.values(users));
});

exports.create_user_controller = asyncHandler(async (req, res, next) => {
  return res.send("Creating User");
});

exports.update_user_controller = asyncHandler(async (req, res, next) => {
  return res.send("Updating User");
});

exports.delete_user_controller = asyncHandler(async (req, res, next) => {
  return res.send("Deleting User");
});
