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
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    fetchVideo();
    fetchRelatedVideos();
    fetchLikes();
    fetchComments();
  }, [id]);

  const fetchVideo = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/videos/${id}`
      );
      setVideo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRelatedVideos = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/videos?limit=100"
      );
      const filtered = res.data.videos.filter(
        (vid) => vid._id !== id
      );
      setRelatedVideos(filtered.slice(0, 8));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLikes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/likes/video/${id}`
      );
      setLikes(res.data.likes);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/comments/video/${id}`
      );
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/likes",
        { videoId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLikes();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleSubscribe = async () => {
    try {
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

  const formatViews = (num) => {
    if (num >= 1000000)
      return (num / 1000000).toFixed(1) + "M views";
    if (num >= 1000)
      return (num / 1000).toFixed(1) + "K views";
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

              <div
                onClick={() => navigate(-1)}
                style={{
                  cursor: "pointer",
                  marginBottom: "15px",
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

              <h2 style={{ marginTop: "20px" }}>{video.title}</h2>

              <p style={{ color: "gray" }}>
                {formatViews(video.views)}
              </p>

              {/* Like Button */}
              {token && (
                <button
                  onClick={handleLike}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#eee",
                    marginTop: "10px",
                  }}
                >
                  👍 {likes}
                </button>
              )}

              {/* Channel + Subscribe */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h4 style={{ margin: 0 }}>
                    {video.channel?.name}
                  </h4>
                  <p style={{ margin: 0, color: "gray" }}>
                    {video.channel?.description}
                  </p>
                </div>

                {token && (
                  <button
                    onClick={handleSubscribe}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "20px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: subscribed
                        ? "gray"
                        : "red",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {subscribed
                      ? "Subscribed"
                      : "Subscribe"}
                  </button>
                )}
              </div>

              {/* COMMENTS */}
              <div
                style={{
                  marginTop: "30px",
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h3>Comments</h3>

                {token && (
                  <>
                    <textarea
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) =>
                        setCommentText(e.target.value)
                      }
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
                  </>
                )}

                {comments.length === 0 && (
                  <p>No comments yet.</p>
                )}

                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    style={{
                      marginTop: "15px",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "10px",
                    }}
                  >
                    <strong>
                      {comment.user?.username}
                    </strong>
                    <p style={{ margin: "5px 0" }}>
                      {comment.text}
                    </p>

                    {user?._id ===
                      comment.user?._id && (
                      <button
                        onClick={() =>
                          handleDeleteComment(
                            comment._id
                          )
                        }
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

            {/* RIGHT SECTION */}
            <div style={{ flex: 1 }}>
              <h3>Related Videos</h3>

              {relatedVideos.map((vid) => (
                <div
                  key={vid._id}
                  onClick={() =>
                    navigate(`/video/${vid._id}`)
                  }
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
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {vid.title}
                    </p>

                    <p
                      style={{
                        margin: 0,
                        color: "gray",
                        fontSize: "13px",
                      }}
                    >
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