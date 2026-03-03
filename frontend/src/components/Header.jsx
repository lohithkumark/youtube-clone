import { useNavigate } from "react-router-dom";

function Header({ setIsSidebarOpen }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div
      style={{
        height: "60px",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          style={{ cursor: "pointer", fontSize: "22px" }}
        >
          ☰
        </div>

        <h2
          onClick={() => navigate("/")}
          style={{ color: "red", cursor: "pointer" }}
        >
          YouTube
        </h2>
      </div>

      {/* RIGHT */}
      {token ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Header;