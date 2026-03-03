import Like from "../models/Like.js";
import Video from "../models/Video.js";

// LIKE / UNLIKE VIDEO (Protected)
export const toggleLike = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({
        message: "videoId is required",
      });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Check if already liked
    const existingLike = await Like.findOne({
      user: req.user._id,
      video: videoId,
    });

    if (existingLike) {
      // Unlike
      await existingLike.deleteOne();

      const totalLikes = await Like.countDocuments({
        video: videoId,
      });

      return res.status(200).json({
        message: "Video unliked",
        totalLikes,
        liked: false,
      });
    }

    // Like
    await Like.create({
      user: req.user._id,
      video: videoId,
    });

    const totalLikes = await Like.countDocuments({
      video: videoId,
    });

    res.status(201).json({
      message: "Video liked",
      totalLikes,
      liked: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET VIDEO LIKE COUNT (Public)
export const getVideoLikes = async (req, res) => {
  try {
    const totalLikes = await Like.countDocuments({
      video: req.params.videoId,
    });

    res.status(200).json({
      totalLikes,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};