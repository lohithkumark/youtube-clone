import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// Create Video (Protected)
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl } = req.body;

    if (!title || !videoUrl) {
      return res
        .status(400)
        .json({ message: "Title and video URL are required" });
    }

    // Find logged-in user's channel
    const channel = await Channel.findOne({ owner: req.user._id });

    if (!channel) {
      return res
        .status(404)
        .json({ message: "Channel not found. Create channel first." });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      channel: channel._id,
    });

    res.status(201).json({
      message: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};