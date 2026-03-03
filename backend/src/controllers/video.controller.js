import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// ===============================
// CREATE VIDEO (Protected)
// ===============================
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, category } = req.body;

    if (!title || !videoUrl || !category) {
      return res.status(400).json({
        message: "Title, video URL and category are required",
      });
    }

    // Find user's channel
    const channel = await Channel.findOne({ user: req.user._id });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found. Create channel first.",
      });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      channel: channel._id,
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET ALL VIDEOS
// ===============================
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .populate("channel", "name");

    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET VIDEO BY ID
// ===============================
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channel");   // 🔥 THIS MUST EXIST

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// SEARCH VIDEOS
// ===============================
export const searchVideos = async (req, res) => {
  try {
    const query = req.query.query;

    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).populate("channel", "name");

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// GET VIDEOS BY CHANNEL
// ===============================
export const getVideosByChannel = async (req, res) => {
  try {
    const videos = await Video.find({
      channel: req.params.channelId,
    })
      .sort({ createdAt: -1 })
      .populate("channel", "name");

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// UPDATE VIDEO
// ===============================
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    Object.assign(video, req.body);
    await video.save();

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// DELETE VIDEO
// ===============================
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.deleteOne();

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};