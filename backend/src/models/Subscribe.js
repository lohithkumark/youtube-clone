import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate subscriptions
subscribeSchema.index({ subscriber: 1, channel: 1 }, { unique: true });

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

export default Subscribe;