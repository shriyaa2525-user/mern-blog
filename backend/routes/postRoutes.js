const express = require("express");
const router = express.Router();
const slugify = require("slugify");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");

// GET all posts
router.get("/", async (req, res) => {
  try {

    const posts = await Post.find()
      .populate("author", "username email");

    res.json(posts);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE post
router.post("/", authMiddleware, async (req, res) => {
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
      author: userId
    });

    const savedPost = await newPost.save();

    // populate author before returning
    const populatedPost = await Post.findById(savedPost._id)
      .populate("author", "username email");

    res.json(populatedPost);

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
    // Check if identifier is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      post = await Post.findById(identifier).populate("author", "username email");
    } else {
      // Otherwise, treat as a slug
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
    );

    res.json(updatedPost);

  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


// DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  console.log("--- DEBUG: DELETE Route Start ---");
  try {
    const post = await Post.findById(req.params.id);

  if (!post) {
    console.log("Error: Post not found", req.params.id);
    return res.status(404).json({message: "Post not found"});
  }

  const requesterId = req.user.id || req.user.userID;
  console.log("Requester ID from Token:", requesterId);
  console.log("Post Author ID from DB:", post.author ? post.author.toString() : "MISSING");

  if (!post.author || post.author.toString() !== requesterId) {
    console.log("Error: Authorization failed - IDs do not match");
    return res.status(403).json({message: "Not allowed or author missing"});
  }

  await Post.findByIdAndDelete(req.params.id);
  console.log("Success: Post deleted");

  res.json({message: "Post deleted successfully"});

  } catch (error) {
    console.error("Delete Error:", error.message);
    res.status(500).json({message: error.message});
  }
});

module.exports = router;