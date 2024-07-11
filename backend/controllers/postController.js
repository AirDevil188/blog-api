const asyncHandler = require("express-async-handler");
const validator = require("express-validator");

const Post = require("../models/post");

exports.list_posts_controller_get = asyncHandler(async (req, res, next) => {
  const post = await Post.find().sort({ title: 1 }).exec();
  res.send(Object.values(post));
});

exports.post_create_controller_post = asyncHandler(
  async (req, res, next) => {}
);

exports.post_update_controller_put = asyncHandler(async (req, res, next) => {
  return res.send("Updating Post");
});

exports.post_delete_controller = asyncHandler(async (req, res, next) => {
  return res.send("Deleting Post");
});
