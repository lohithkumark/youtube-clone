import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Upload({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [category, setCategory] = useState("");

  const handleUpload = async () => {
    const token = localStorage.getItem("token");

    if (!title || !videoUrl || !category) {
  alert("Title, Video URL and Category are required");
  return;
}

    try {
      await axios.post(
        "http://localhost:8080/api/videos",
        {
          title,
          description,
          videoUrl,
          thumbnailUrl,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Video uploaded successfully!");
      navigate("/");

    } catch (error) {
      console.log(error.response?.data);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />

      <div style={{ display: "flex" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div style={{ padding: "24px", flex: 1 }}>
          <h2>🎥 Upload Video</h2>

          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />


<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={inputStyle}
>
  <option value="">Select Category</option>
  <option value="Coding">Coding</option>
  <option value="Music">Music</option>
  <option value="Sports">Sports</option>
  <option value="Gaming">Gaming</option>
  <option value="Movies">Movies</option>
</select>


          <input
            type="text"
            placeholder="Video URL (mp4 link)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Thumbnail URL"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={handleUpload}
            style={{
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

export default Upload;