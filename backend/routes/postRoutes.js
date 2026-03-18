const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email");
    console.log(`Fetched ${posts.length} posts from database`);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE post
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const slug = slugify(title, {lower: true});
    const excerpt = content.substring(0, 120);
    const userId = req.user.id || req.user.userID;
    
    if (!userId) {
        return res.status(401).json({ message: "User ID missing from token" });
    }

    const newPost = new Post({
      title,
      content,
      slug,
      excerpt,
      author: userId,
      image: req.file ? req.file.filename : null
    });

    const savedPost = await newPost.save();
    const populatedPost = await Post.findById(savedPost._id)
      .populate("author", "username email");

    res.json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET logged-in user's posts
router.get("/my-posts", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id || req.user.userID;

    const posts = await Post.find({ author: userId })
      .populate("author", "username email");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single post (by ID or Slug)
router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    const mongoose = require("mongoose");

    let post;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      post = await Post.findById(identifier).populate("author", "username email");
    } else {
      post = await Post.findOne({ slug: identifier }).populate("author", "username email");
    }

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({message: "Post not found!"});
    }

    const requesterId = req.user.id || req.user.userID;
    if (!post.author || post.author.toString() !== requesterId) {
      return res.status(403).json({message: "Not allowed or author missing"});
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("author", "username email");

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({message: "Post not found"});
    }

    const requesterId = req.user.id || req.user.userID;
    if (!post.author || post.author.toString() !== requesterId) {
      return res.status(403).json({message: "Not allowed or author missing"});
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({message: "Post deleted successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

module.exports = router;