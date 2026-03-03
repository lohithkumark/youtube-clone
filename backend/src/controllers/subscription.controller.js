import Subscription from "../models/Subscription.js";

export const toggleSubscription = async (req, res) => {
  try {
    const { channelId } = req.body;

    const existing = await Subscription.findOne({
      user: req.user._id,
      channel: channelId,
    });

    if (existing) {
      await existing.deleteOne();

      return res.status(200).json({
        message: "Unsubscribed",
        subscribed: false,
      });
    }

    await Subscription.create({
      user: req.user._id,
      channel: channelId,
    });

    res.status(201).json({
      message: "Subscribed",
      subscribed: true,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMySubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.user._id })
      .populate("channel");

    res.status(200).json(subs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};