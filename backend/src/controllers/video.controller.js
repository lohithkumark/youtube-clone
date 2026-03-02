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

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("channel", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channel", "name description");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Increment views
    video.views += 1;
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Video (Protected - Only Owner)
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("channel");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check if logged-in user owns the channel
    if (video.channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this video"
      });
    }

    const { title, description, thumbnailUrl } = req.body;

    if (title) video.title = title;
    if (description) video.description = description;
    if (thumbnailUrl) video.thumbnailUrl = thumbnailUrl;

    await video.save();

    res.status(200).json({
      message: "Video updated successfully",
      video
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Video (Protected - Only Owner)
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("channel");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check ownership
    if (video.channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this video"
      });
    }

    await video.deleteOne();

    res.status(200).json({
      message: "Video deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

