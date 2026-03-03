import { useNavigate } from "react-router-dom";

function Header({ setIsSidebarOpen }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
const user = storedUser && storedUser !== "undefined"
  ? JSON.parse(storedUser)
  : null;

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
      {/* LEFT SIDE */}
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

      {/* RIGHT SIDE */}
      {token && user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontWeight: "bold" }}>
            👤 {user.name}
          </span>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.reload();
            }}
            style={{
              padding: "6px 12px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
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