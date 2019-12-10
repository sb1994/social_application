const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../models/Post");

router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

router.get("/", (req, res) => {
  Post.find({})
    .sort({ created: -1 })
    .populate("user")
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);

    const newPost = new Post({
      text: req.body.text,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      postImgURL: req.body.postImgURL,
      user: req.user._id
    });
    // console.log(newPost);

    newPost.save().then(post => res.json(post));
  }
);
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ nopostfound: "No post found with that ID" });
      }
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});
router.get("/user/:id", (req, res) => {
  Post.find({ user: req.params.id })
    .then(posts => {
      if (posts) {
        res.json(posts);
      } else {
        res.status(404).json({ nopostfound: "No post found with that ID" });
      }
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
  console.log(req.params.id);
});
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.user.id }).then(user => {
      // console.log(user);

      // res.json(user)
      // console.log(user._id, req.params.id);

      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
            // console.log(post)
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          // console.log(post);

          // // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});
module.exports = router;
