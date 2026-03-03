import History from "../models/History.js";

// ADD TO HISTORY (Protected)
export const addToHistory = async (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({
        message: "videoId is required",
      });
    }

    // Check if already in history
    const existing = await History.findOne({
      user: req.user._id,
      video: videoId,
    });

    if (existing) {
      // Update timestamp instead of duplicate
      existing.createdAt = Date.now();
      await existing.save();

      return res.status(200).json({
        message: "History updated",
      });
    }

    // Create new history entry
    await History.create({
      user: req.user._id,
      video: videoId,
    });

    res.status(201).json({
      message: "Added to watch history",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER HISTORY (Protected)
export const getMyHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id })
      .populate({
        path: "video",
        populate: {
          path: "channel",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(history);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};