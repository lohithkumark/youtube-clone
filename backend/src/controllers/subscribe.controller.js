import Subscribe from "../models/Subscribe.js";
import Channel from "../models/Channel.js";

/* SUBSCRIBE / UNSUBSCRIBE (Protected) */
export const toggleSubscribe = async (req, res) => {
  try {
    const { channelId } = req.body;

    if (!channelId) {
      return res.status(400).json({
        message: "channelId is required"
      });
    }

    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found"
      });
    }

    // Prevent subscribing to own channel
    if (channel.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot subscribe to your own channel"
      });
    }

    const existingSubscription = await Subscribe.findOne({
      subscriber: req.user._id,
      channel: channelId
    });

    if (existingSubscription) {
      await existingSubscription.deleteOne();

      return res.status(200).json({
        message: "Unsubscribed successfully"
      });
    }

    await Subscribe.create({
      subscriber: req.user._id,
      channel: channelId
    });

    res.status(201).json({
      message: "Subscribed successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET SUBSCRIBER COUNT (Public)

export const getSubscriberCount = async (req, res) => {
  try {
    const count = await Subscribe.countDocuments({
      channel: req.params.channelId
    });

    res.status(200).json({
      subscribers: count
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};