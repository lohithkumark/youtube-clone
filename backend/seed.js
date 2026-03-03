import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./src/config/db.js";
import Video from "./src/models/Video.js";
import Channel from "./src/models/Channel.js";

dotenv.config();
connectDB();

const seedVideos = async () => {
  try {
    console.log("Deleting old videos...");
    await Video.deleteMany();

    const channel = await Channel.findOne();

    if (!channel) {
      console.log("❌ No channel found. Create a channel first.");
      process.exit();
    }

    const videosData = [
      {
        title: "React Crash Course 2025",
        category: "Coding",
        thumbnailUrl:
          "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
      },
      {
        title: "Top 10 Football Goals Ever",
        category: "Sports",
        thumbnailUrl:
          "https://i.ytimg.com/vi/6t2lR3f5e8E/maxresdefault.jpg",
      },
      {
        title: "Epic Gaming Highlights",
        category: "Gaming",
        thumbnailUrl:
          "https://i.ytimg.com/vi/2g811Eo7K8U/maxresdefault.jpg",
      },
      {
        title: "Breaking News Today",
        category: "News",
        thumbnailUrl:
          "https://i.ytimg.com/vi/1qgskxgZK7A/maxresdefault.jpg",
      },
      {
        title: "Top Movie Trailers 2025",
        category: "Movies",
        thumbnailUrl:
          "https://i.ytimg.com/vi/EXeTwQWrcwY/maxresdefault.jpg",
      },
      {
        title: "Top Music Hits 2025",
        category: "Music",
        thumbnailUrl:
          "https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
      },
      {
        title: "Learn Node.js in 1 Hour",
        category: "Coding",
        thumbnailUrl:
          "https://i.ytimg.com/vi/TlB_eWDSMt4/maxresdefault.jpg",
      },
      {
        title: "Champions League Highlights",
        category: "Sports",
        thumbnailUrl:
          "https://i.ytimg.com/vi/3tmd-ClpJxA/maxresdefault.jpg",
      },
      {
        title: "Top 5 Open World Games",
        category: "Gaming",
        thumbnailUrl:
          "https://i.ytimg.com/vi/1roy4o4tqQM/maxresdefault.jpg",
      },
      {
        title: "Daily World News Update",
        category: "News",
        thumbnailUrl:
          "https://i.ytimg.com/vi/l482T0yNkeo/maxresdefault.jpg",
      },
      {
        title: "Best Action Movies 2025",
        category: "Movies",
        thumbnailUrl:
          "https://i.ytimg.com/vi/YoHD9XEInc0/maxresdefault.jpg",
      },
      {
        title: "Chill Music Playlist",
        category: "Music",
        thumbnailUrl:
          "https://i.ytimg.com/vi/OPf0YbXqDm0/maxresdefault.jpg",
      },
    ];

    const videos = videosData.map((video) => ({
      title: video.title,
      description: "Demo video for YouTube clone project",
      category: video.category,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnailUrl: video.thumbnailUrl,
      channel: channel._id,
      views: Math.floor(Math.random() * 100000),
    }));

    await Video.insertMany(videos);

    console.log("✅ Videos seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedVideos();