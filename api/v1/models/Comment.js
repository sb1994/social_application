const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String
  },
  // longitude: {
  //   type: String,
  //   required: true
  // },
  // latitude: {
  //   type: String,
  //   required: true
  // },
  post: {
    type: Schema.Types.ObjectId,
    ref: "posts"
  },
  postImgURL: {
    type: String
  },

  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model("comments", CommentSchema);
