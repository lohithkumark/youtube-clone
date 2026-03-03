import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Home() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/videos")
      .then((res) => {
        setVideos(res.data.videos);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px", flex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {videos.map((video) => (
              <div
                key={video._id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/video/${video._id}`)}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                  }}
                />
                <h4>{video.title}</h4>
                <p>{video.channel?.name}</p>
                <p>{video.views} views</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;