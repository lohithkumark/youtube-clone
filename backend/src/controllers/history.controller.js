import History from "../models/History.js";

export const addToHistory = async (req, res) => {
  try {
    const { videoId } = req.body;

    const history = await History.create({
      user: req.user._id,
      video: videoId,
    });

    res.status(201).json({
      message: "Added to watch history",
      history,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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