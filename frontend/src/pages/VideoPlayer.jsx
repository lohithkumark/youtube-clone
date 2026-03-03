import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function VideoPlayer({ isSidebarOpen, setIsSidebarOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/videos/${id}`)
      .then((res) => setVideo(res.data));

    fetchComments();
  }, [id]);

  const fetchComments = () => {
    axios
      .get(`http://localhost:8080/api/comments/video/${id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    try {
      await axios.post(
        "http://localhost:8080/api/comments",
        { videoId: id, text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommentText("");
      fetchComments();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComments();
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

            <h2 style={{ marginTop: "20px" }}>{video.title}</h2>

            {/* 🔥 COMMENT SECTION */}
            <div
              style={{
                marginTop: "30px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>Comments</h3>

              {/* Add Comment */}
              {token && (
                <div style={{ marginBottom: "20px" }}>
                  <textarea
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                      resize: "none",
                    }}
                  />
                  <button
                    onClick={handleCommentSubmit}
                    style={{
                      marginTop: "10px",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: "red",
                      color: "white",
                    }}
                  >
                    Post
                  </button>
                </div>
              )}

              {/* Display Comments */}
              {comments.length === 0 && <p>No comments yet.</p>}

              {comments.map((comment) => (
                <div
                  key={comment._id}
                  style={{
                    marginBottom: "15px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <strong>{comment.user?.username}</strong>
                  <p style={{ margin: "5px 0" }}>{comment.text}</p>

                  {user?.id === comment.user?._id && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      style={{
                        fontSize: "12px",
                        background: "none",
                        border: "none",
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  )}
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