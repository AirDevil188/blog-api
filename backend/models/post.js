import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: Schema.ObjectId, ref: "User", required: true },
  comments: { type: Schema.ObjectId, ref: "Comment", required: true },
  published: { type: Boolean, required: true },
});

postSchema.virtual("url").get(function () {
  return `/post/${this._id}`;
});

module.exports(mongoose.model("Post", postSchema));
