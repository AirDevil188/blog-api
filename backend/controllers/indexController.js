const asyncHandler = require("express-async-handler");

const Post = require("../models/post");

exports.blog_index_controller = asyncHandler(async (req, res, next) => {
  const post = await Post.find().sort({ title: 1 }).exec();

  res.send(Object.values(post));
});
