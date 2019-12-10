const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String
  },
  longitude: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  postImgURL: {
    type: String
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("posts", PostSchema);
