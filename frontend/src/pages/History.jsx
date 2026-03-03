import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function History({ isSidebarOpen, setIsSidebarOpen }) {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setHistory(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />

      <div style={{ display: "flex" }}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div style={{ padding: "24px", flex: 1 }}>
          <h2>🕒 Watch History</h2>

          {history.length === 0 && <p>No watched videos yet.</p>}

          {history.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/video/${item.video._id}`)}
              style={{
                display: "flex",
                gap: "15px",
                marginBottom: "20px",
                cursor: "pointer",
              }}
            >
              <img
                src={item.video.thumbnailUrl}
                alt={item.video.title}
                style={{
                  width: "200px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <div>
                <h4 style={{ margin: 0 }}>{item.video.title}</h4>
                <p style={{ margin: 0, color: "gray" }}>
                  {item.video.channel?.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;