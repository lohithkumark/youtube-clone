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
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`http://localhost:8080/api/videos/${id}`)
      .then((res) => setVideo(res.data));

    axios.get("http://localhost:8080/api/videos?limit=100")
      .then((res) => {
        const filtered = res.data.videos.filter((vid) => vid._id !== id);
        setRelatedVideos(filtered.slice(0, 8));
      });

    axios.get(`http://localhost:8080/api/likes/video/${id}`)
      .then((res) => setLikes(res.data.totalLikes));

  }, [id]);

  const handleSubscribe = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/api/subscriptions",
        { channelId: video.channel._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubscribed(res.data.subscribed);

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  if (!video) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />

      <div style={{ display: "flex" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div style={{ padding: "24px", flex: 1 }}>
          <div style={{ display: "flex", gap: "24px" }}>

            <div style={{ flex: 3 }}>

              <div
                onClick={() => navigate(-1)}
                style={{ cursor: "pointer", marginBottom: "15px", fontWeight: "bold" }}
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

                {/* Channel + Subscribe */}
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: "15px",
                    borderRadius: "12px",
                  }}
                >
                  <div>
                    <h4 style={{ margin: 0 }}>{video.channel?.name}</h4>
                    <p style={{ margin: 0, color: "gray" }}>
                      {video.channel?.description}
                    </p>
                  </div>

                  <button
                    onClick={handleSubscribe}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: subscribed ? "gray" : "red",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {subscribed ? "Subscribed" : "Subscribe"}
                  </button>
                </div>

              </div>
            </div>

            {/* Related Videos */}
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