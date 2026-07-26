const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Post = require("../models/Post");

const storage = multer.memoryStorage();
const upload = multer({ storage });


// Upload Image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {

    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
    );

    res.json({
      imageUrl: result.secure_url,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
});



// Create Post
router.post("/create", async (req, res) => {

  try {

    const { author, userId, content, image } = req.body;

    const post = new Post({
      author,
      userId,
      content,
      image,
    });

    await post.save();

    res.status(201).json({
      message: "Post Created Successfully",
      post,
    });

  } catch (error) {

    console.log("CREATE POST ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }

});



// Get User Posts
router.get("/user/:userId", async (req, res) => {

  try {

    const posts = await Post.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(posts);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



// Like Post
router.put("/like/:id", async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    res.json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



// Comment
router.put("/comment/:id", async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    post.comments.push(req.body.comment);

    await post.save();

    res.json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



// Edit Post
router.put("/:id", async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    post.content = req.body.content;

    await post.save();

    res.json(post);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



// Delete Post
router.delete("/:id", async (req, res) => {

  try {

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      message: "Post Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;