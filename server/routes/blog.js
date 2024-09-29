const express = require("express");
const router = express.Router();
const blogPost = require("../models/blogPost");

// Blog List Page (display multiple posts)
router.get("/", async (req, res) => {
  try {
    const posts = await blogPost.find().sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading blog list.");
  }
});

// recent Blog List
router.get("/recent", async (req, res) => {
  try {
    const recentPosts = await blogPost.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json(recentPosts);
  } catch (error) {
    console.error(err);
    res.status(500).send("Error loading blog list.");
  }
});

// Single Blog Post Page (display individual post)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await blogPost.findById(id);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new blog
router.post("/", async (req, res) => {
  try {
    const blogs = await blogPost.create(req.body);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Add a comment to a blog post
// router.put("/:id/comment", async (req, res) => {
//   const { id } = req.params;
//   const comment = req.body.comment;
//   const addComment = await blogPost.findByIdAnd(
//     { _id: id },
//     { $push: { comments: comment } },
//     {
//       new: true,
//     }
//   );
//   res.status(200).json(addComment);
// });

// update blog
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await blogPost.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete blog
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await blogPost.findByIdAndDelete(id);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a comment
router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { username, text } = req.body;

  try {
    const post = await blogPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add comment to the comments array
    post.comments.push({ username, text, createdAt: new Date() });

    await post.save();
    res.status(201).json({ message: "Comment added successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
});

// Delete a comment
router.delete("/:id/comments/:commentId", async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const post = await blogPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment
    comment.remove();
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
});

module.exports = router;
