const express = require("express");
const asyncHandler = require("express-async-handler");

const Post = require("../models/post");

const mongoose = require("mongoose");

exports.posts_get_controller = asyncHandler(async (req, res, next) => {
  const post = await Post.find().sort({ title: 1 }).exec();

  res.send(Object.values(post));
});

exports.post_create_controller = asyncHandler(async (req, res, next) => {
  return res.send("Creating Post");
});

exports.post_update_controller = asyncHandler(async (req, res, next) => {
  return res.send("Updating Post");
});

exports.post_delete_controller = asyncHandler(async (req, res, next) => {
  return res.send("Deleting Post");
});
