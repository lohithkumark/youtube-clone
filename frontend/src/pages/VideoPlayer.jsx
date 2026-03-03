import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    // Fetch selected video
    axios
      .get(`http://localhost:8080/api/videos/${id}`)
      .then((res) => {
        setVideo(res.data);
      })
      .catch((err) => console.log(err));

    // Fetch recommended videos
    axios
      .get("http://localhost:8080/api/videos?limit=10")
      .then((res) => {
        setRecommended(res.data.videos);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!video) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  const formatViews = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M views";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K views";
    return num + " views";
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ display: "flex", padding: "24px", flex: 1, gap: "30px" }}>
          
          {/* LEFT SIDE - MAIN VIDEO */}
          <div style={{ flex: 3 }}>
            <video
              src={video.videoUrl}
              controls
              width="100%"
              style={{ borderRadius: "12px" }}
            />

            <div style={{ marginTop: "15px" }}>
              <h2>{video.title}</h2>

              <p style={{ color: "gray" }}>
                {formatViews(video.views)} • 2 days ago
              </p>

              {/* Like & Subscribe */}
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "#f2f2f2",
                    cursor: "pointer",
                  }}
                >
                  👍 Like
                </button>

                <button
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Subscribe
                </button>
              </div>

              {/* Channel Info */}
              <div
                style={{
                  marginTop: "20px",
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

          {/* RIGHT SIDE - RECOMMENDED VIDEOS */}
          <div style={{ flex: 1 }}>
            <h3>Recommended</h3>

            {recommended
              .filter((item) => item._id !== id)
              .map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/video/${item._id}`)}
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "15px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    width="120"
                    style={{ borderRadius: "8px" }}
                  />

                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      {item.title}
                    </p>
                    <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
                      {item.channel?.name}
                    </p>
                    <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
                      {formatViews(item.views)}
                    </p>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;