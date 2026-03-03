import Channel from "../models/Channel.js";

// Create Channel
export const createChannel = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Channel.findOne({ user: req.user._id });

    if (existing) {
      return res.status(400).json({
        message: "Channel already exists",
      });
    }

    const channel = await Channel.create({
      name,
      description,
      user: req.user._id,
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get channel by ID
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};