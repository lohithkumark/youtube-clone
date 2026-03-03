import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function VideoPlayer({ isSidebarOpen, setIsSidebarOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Fetch selected video
    axios
      .get(`http://localhost:8080/api/videos/${id}`)
      .then((res) => setVideo(res.data))
      .catch((err) => console.log(err));

    // Fetch related videos
    axios
      .get("http://localhost:8080/api/videos?limit=100")
      .then((res) => {
        const filtered = res.data.videos.filter(
          (vid) => vid._id !== id
        );
        setRelatedVideos(filtered.slice(0, 8));
      })
      .catch((err) => console.log(err));

    // Fetch like count
    axios
      .get(`http://localhost:8080/api/likes/video/${id}`)
      .then((res) => {
        setLikes(res.data.totalLikes);
      })
      .catch((err) => console.log(err));

  }, [id]);

  const handleLike = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:8080/api/likes",
      { videoId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 THIS IS THE FIX
        },
      }
    );

    setLikes(res.data.totalLikes);
    setLiked(res.data.liked);

  } catch (error) {
    console.log(error.response?.data);
  }
};

  if (!video) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  const formatViews = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M views";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K views";
    return num + " views";
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />

      <div style={{ display: "flex" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div style={{ padding: "24px", flex: 1 }}>
          <div style={{ display: "flex", gap: "24px" }}>

            {/* LEFT SECTION */}
            <div style={{ flex: 3 }}>

              {/* Back Button */}
              <div
                onClick={() => navigate(-1)}
                style={{
                  cursor: "pointer",
                  marginBottom: "15px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                ⬅ Back
              </div>

              <video
                src={video.videoUrl}
                controls
                width="100%"
                style={{ borderRadius: "12px" }}
              />

              <div style={{ marginTop: "20px" }}>
                <h2>{video.title}</h2>

                <p style={{ color: "gray" }}>
                  {formatViews(video.views)}
                </p>

                {/* 🔥 Like Button */}
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={handleLike}
                    style={{
                      padding: "8px 15px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: liked ? "red" : "#eee",
                      color: liked ? "white" : "black",
                    }}
                  >
                    👍 {likes}
                  </button>
                </div>

                {/* Channel Info */}
                <div
                  style={{
                    marginTop: "15px",
                    padding: "15px",
                    backgroundColor: "white",
                    borderRadius: "12px",
                  }}
                >
                  <h4>{video.channel?.name}</h4>
                  <p>{video.channel?.description}</p>
                </div>

                {/* Description */}
                <div
                  style={{
                    marginTop: "20px",
                    padding: "15px",
                    backgroundColor: "white",
                    borderRadius: "12px",
                  }}
                >
                  <h4>Description</h4>
                  <p>{video.description}</p>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - Related Videos */}
            <div style={{ flex: 1 }}>
              <h3>Related Videos</h3>

              {relatedVideos.map((vid) => (
                <div
                  key={vid._id}
                  onClick={() => navigate(`/video/${vid._id}`)}
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "15px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    style={{
                      width: "120px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <div>
                    <p style={{ margin: 0, fontWeight: "bold", fontSize: "14px" }}>
                      {vid.title}
                    </p>

                    <p style={{ margin: 0, color: "gray", fontSize: "13px" }}>
                      {vid.channel?.name}
                    </p>

                    <p style={{ margin: 0, color: "gray", fontSize: "13px" }}>
                      {formatViews(vid.views)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;