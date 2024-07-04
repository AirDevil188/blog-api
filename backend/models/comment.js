const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema({
  text: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: Schema.ObjectId, ref: "User", required: true },
});

commentSchema.virtual("url").get(function () {
  return `/comment/${this._id}`;
});

module.exports = mongoose.model("Comment", commentSchema);
