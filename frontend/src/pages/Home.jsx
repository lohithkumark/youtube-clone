import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Home({ isSidebarOpen, setIsSidebarOpen }) {
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    const url = query
      ? `http://localhost:8080/api/videos/search?query=${query}`
      : "http://localhost:8080/api/videos?limit=100";

    axios
      .get(url)
      .then((res) => {
        if (query) {
          setVideos(res.data);
        } else {
          setVideos(res.data.videos);
        }
      })
      .catch((err) => console.log(err));
  }, [query]);

  const categories = ["All", "Coding", "Sports", "Movies", "Gaming", "Music"];

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter(
          (video) =>
            video.category &&
            video.category.toLowerCase() ===
              selectedCategory.toLowerCase()
        );

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />

      <div style={{ display: "flex" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div style={{ padding: "24px", flex: 1 }}>
          
          {/* Category Buttons */}
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "6px 15px",
                  borderRadius: "20px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor:
                    selectedCategory === cat ? "black" : "#f2f2f2",
                  color:
                    selectedCategory === cat ? "white" : "black",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredVideos.map((video) => (
              <div
                key={video._id}
                onClick={() => navigate(`/video/${video._id}`)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "12px",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
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
                    {video.channel?.name}
                  </p>
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

export default Home;