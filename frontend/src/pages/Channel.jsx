import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Channel({ isSidebarOpen, setIsSidebarOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [subscribers, setSubscribers] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchChannel();
    fetchVideos();
    fetchSubscribers();
  }, [id]);

  const fetchChannel = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/channels/${id}`
      );
      setChannel(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/videos/channel/${id}`
      );
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/subscriptions/channel/${id}`
      );
      setSubscribers(res.data.subscribers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscribe = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/subscriptions",
        { channelId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubscribed(res.data.subscribed);

      // Refresh subscriber count
      fetchSubscribers();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  if (!channel) return <h2 style={{ padding: "20px" }}>Loading...</h2>;

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />

      <div style={{ display: "flex" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div style={{ padding: "24px", flex: 1 }}>
          
          {/* CHANNEL HEADER */}
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ marginBottom: "5px" }}>
                {channel.name}
              </h2>

              <p style={{ color: "gray", margin: 0 }}>
                {subscribers} subscribers
              </p>

              <p style={{ color: "gray", marginTop: "8px" }}>
                {channel.description}
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

          {/* VIDEOS GRID */}
          <h3>Videos</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
              marginTop: "20px",
            }}
          >
            {videos.map((video) => (
              <div
                key={video._id}
                onClick={() =>
                  navigate(`/video/${video._id}`)
                }
                style={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "12px",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform =
                    "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform =
                    "scale(1)")
                }
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  style={{
                    width: "100%",
                    borderRadius: "12px",
                  }}
                />

                <div style={{ marginTop: "10px" }}>
                  <h4>{video.title}</h4>
                  <p style={{ color: "gray", margin: 0 }}>
                    {video.views} views
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

export default Channel;