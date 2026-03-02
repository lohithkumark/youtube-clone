import Channel from "../models/Channel.js";

// Create Channel (Protected)
export const createChannel = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Channel name is required" });
    }

    // Create channel linked to logged-in user
    const channel = await Channel.create({
      name,
      description,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Channel created successfully",
      channel,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Channel By ID
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id).populate(
      "owner",
      "username email"
    );

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};