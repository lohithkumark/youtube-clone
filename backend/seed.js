import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import Video from "./src/models/Video.js";
import Channel from "./src/models/Channel.js";
import User from "./src/models/User.js";

dotenv.config();
connectDB();

const seedVideos = async () => {
  try {
    await Video.deleteMany({});
    await Channel.deleteMany({});

    const user = await User.findOne();

    if (!user) {
      console.log("No user found. Create a user first.");
      process.exit();
    }

    const channels = await Channel.insertMany([
      { name: "Tech World", description: "Tech videos", owner: user._id },
      { name: "Sports Arena", description: "Sports content", owner: user._id },
      { name: "Movie Hub", description: "Movies", owner: user._id },
      { name: "Gaming Zone", description: "Gaming videos", owner: user._id },
      { name: "Music Beats", description: "Music channel", owner: user._id },
    ]);

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

    const videoUrls = [
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      "https://media.w3.org/2010/05/sintel/trailer.mp4",
      "https://media.w3.org/2010/05/bunny/trailer.mp4",
      "https://media.w3.org/2010/05/video/movie_300.mp4",
      "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    ];

    const videos = [];

    for (let i = 0; i < 30; i++) {
      const title = titles[i % titles.length];
      const lowerTitle = title.toLowerCase();

      let category;

      if (
        lowerTitle.includes("react") ||
        lowerTitle.includes("node") ||
        lowerTitle.includes("coding") ||
        lowerTitle.includes("javascript") ||
        lowerTitle.includes("mongodb")
      ) {
        category = "Coding";
      } else if (lowerTitle.includes("sports") || lowerTitle.includes("football")) {
        category = "Sports";
      } else if (lowerTitle.includes("gaming")) {
        category = "Gaming";
      } else if (lowerTitle.includes("music")) {
        category = "Music";
      } else {
        category = "Movies";
      }

      const randomChannel =
        channels[Math.floor(Math.random() * channels.length)];

      videos.push({
        title,
        description: "Demo video for YouTube clone project",
        category,
        videoUrl: videoUrls[i % videoUrls.length],
        thumbnailUrl: `https://picsum.photos/500/300?random=${i}`,
        channel: randomChannel._id,
        views: Math.floor(Math.random() * 100000),
      });
    }

    await Video.insertMany(videos);

    console.log("Database reseeded with correct categories!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedVideos();