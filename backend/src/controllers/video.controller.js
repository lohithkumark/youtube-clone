import Video from "../models/Video.js";
import Channel from "../models/Channel.js";


// Create Video (Protected)npm run dev
export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, category } = req.body;

    if (!title || !videoUrl || !category) {
      return res.status(400).json({
        message: "Title, video URL and category are required",
      });
    }

    // Find logged-in user's channel
    const channel = await Channel.findOne({ owner: req.user._id });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found. Create channel first.",
      });
    }

    const video = await Video.create({
      title,
      description,
      category,
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


// Get All Videos (Pagination)
export const getAllVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;  // 🔥 Increased default limit

    const skip = (page - 1) * limit;

    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("channel", "name");

    const totalVideos = await Video.countDocuments();

    res.status(200).json({
      totalVideos,
      currentPage: page,
      totalPages: Math.ceil(totalVideos / limit),
      videos,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Single Video (Increment Views)
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


// Update Video (Only Owner)
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("channel");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check ownership
    if (video.channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this video",
      });
    }

    const { title, description, thumbnailUrl, category } = req.body;

    if (title) video.title = title;
    if (description) video.description = description;
    if (thumbnailUrl) video.thumbnailUrl = thumbnailUrl;
    if (category) video.category = category;

    await video.save();

    res.status(200).json({
      message: "Video updated successfully",
      video,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Video (Only Owner)
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate("channel");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check ownership
    if (video.channel.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this video",
      });
    }

    await video.deleteOne();

    res.status(200).json({
      message: "Video deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Search Videos
export const searchVideos = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .populate("channel", "name");

    res.status(200).json(videos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};