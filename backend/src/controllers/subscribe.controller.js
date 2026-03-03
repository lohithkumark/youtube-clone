import Subscribe from "../models/Subscribe.js";

// =================================
// SUBSCRIBE / UNSUBSCRIBE
// =================================
export const toggleSubscription = async (req, res) => {
  try {
    const { channelId } = req.body;

    if (!channelId) {
      return res.status(400).json({
        message: "Channel ID is required",
      });
    }

    const existing = await Subscribe.findOne({
      user: req.user._id,
      channel: channelId,
    });

    // If already subscribed → Unsubscribe
    if (existing) {
      await existing.deleteOne();

      return res.status(200).json({
        subscribed: false,
      });
    }

    // Otherwise → Subscribe
    await Subscribe.create({
      user: req.user._id,
      channel: channelId,
    });

    res.status(201).json({
      subscribed: true,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =================================
// GET CHANNEL SUBSCRIBER COUNT
// =================================
export const getChannelSubscribers = async (req, res) => {
  try {
    const count = await Subscribe.countDocuments({
      channel: req.params.channelId,
    });

    res.status(200).json({
      subscribers: count,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};