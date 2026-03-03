import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import Video from "./src/models/Video.js";
import Channel from "./src/models/Channel.js";
import User from "./src/models/User.js";

dotenv.config();
connectDB();

const seedVideos = async () => {
  try {
    await Video.deleteMany();
    await Channel.deleteMany();

    const user = await User.findOne();

    if (!user) {
      console.log("No user found. Create a user first.");
      process.exit();
    }

    // Create multiple channels under same user
    const channels = await Channel.insertMany([
      { name: "Tech World", description: "Tech videos", owner: user._id },
      { name: "Sports Arena", description: "Sports content", owner: user._id },
      { name: "Movie Hub", description: "Movies", owner: user._id },
      { name: "Gaming Zone", description: "Gaming videos", owner: user._id },
      { name: "Music Beats", description: "Music channel", owner: user._id },
    ]);
const categories = ["Coding", "Sports", "Movies", "Gaming", "Music"];

const titles = [
  "React Crash Course 2025",
  "Node.js Complete Guide",
  "Top 10 Football Goals",
  "Latest Tech News Today",
  "Epic Gaming Highlights",
  "Best Movie Trailers 2025",
  "Top Music Hits 2025",
  "Learn MongoDB in 30 Minutes",
  "Champions League Highlights",
  "Top Coding Tricks Every Developer Should Know",
  "JavaScript Advanced Concepts",
  "Sports News Update",
  "Gaming Strategy Guide",
  "Movie Review Breakdown",
  "Chill Music Playlist",
];

const videos = [];

for (let i = 0; i < 30; i++) {
  const randomChannel =
    channels[Math.floor(Math.random() * channels.length)];

  videos.push({
    title: titles[i % titles.length],
    description: "Demo video for YouTube clone project",
    category: categories[i % categories.length],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnailUrl: `https://picsum.photos/500/300?random=${i}`,
    channel: randomChannel._id,
    views: Math.floor(Math.random() * 100000),
  });
}

await Video.insertMany(videos);

    await Video.insertMany(videos);

    console.log("Multiple channels and videos seeded!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedVideos();