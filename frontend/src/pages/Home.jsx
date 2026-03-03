import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Home() {
  const [videos, setVideos] = useState([]);
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
          // Search API returns array directly
          setVideos(res.data);
        } else {
          // Normal API returns object with videos
          setVideos(res.data.videos);
        }
      })
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "24px", flex: 1 }}>
          
          {/* Search Result Title */}
          {query && (
            <h2 style={{ marginBottom: "20px" }}>
              Search Results for "{query}"
            </h2>
          )}

          {/* Grid Container */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {videos.map((video) => (
              <div
                key={video._id}
                onClick={() => navigate(`/video/${video._id}`)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "12px",
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
                    objectFit: "cover",
                  }}
                />

                <div style={{ marginTop: "10px" }}>
                  <h4
                    style={{
                      margin: "5px 0",
                      fontSize: "16px",
                    }}
                  >
                    {video.title}
                  </h4>

                  <p
                    style={{
                      color: "gray",
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    {video.channel?.name}
                  </p>

                  <p
                    style={{
                      color: "gray",
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
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