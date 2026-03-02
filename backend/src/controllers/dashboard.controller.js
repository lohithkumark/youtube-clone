import Video from "../models/Video.js";
import Subscribe from "../models/Subscribe.js";
import Like from "../models/Like.js";
import Comment from "../models/Comment.js";
import Channel from "../models/Channel.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Get user's channel
    const channel = await Channel.findOne({ owner: req.user._id });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Total videos
    const totalVideos = await Video.countDocuments({ channel: channel._id });

    // Total views
    const videos = await Video.find({ channel: channel._id });
    const totalViews = videos.reduce((acc, video) => acc + video.views, 0);

    // Total subscribers
    const totalSubscribers = await Subscribe.countDocuments({
      channel: channel._id,
    });

    // Total likes
    const totalLikes = await Like.countDocuments({
      video: { $in: videos.map((v) => v._id) },
    });

    // Total comments
    const totalComments = await Comment.countDocuments({
      video: { $in: videos.map((v) => v._id) },
    });

    res.status(200).json({
      totalVideos,
      totalViews,
      totalSubscribers,
      totalLikes,
      totalComments,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};