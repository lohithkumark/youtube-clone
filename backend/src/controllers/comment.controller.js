import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// ADD COMMENT (Protected)

export const addComment = async (req, res) => {
  try {
    const { text, videoId } = req.body;

    if (!text || !videoId) {
      return res.status(400).json({
        message: "Text and videoId are required"
      });
    }

    // Check if video exists
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found"
      });
    }

    const comment = await Comment.create({
      text,
      video: videoId,
      user: req.user._id
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET COMMENTS BY VIDEO (Public)

export const getCommentsByVideo = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// DELETE COMMENT (Protected)

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    // Only comment owner can delete
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this comment"
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      message: "Comment deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};