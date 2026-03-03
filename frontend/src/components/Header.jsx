import { useNavigate } from "react-router-dom";

function Header({
  setIsSidebarOpen,
  darkMode = false,
  setDarkMode = () => {},
}) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const user =
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;

  return (
    <div
      style={{
        height: "60px",
        backgroundColor: darkMode ? "#0f0f0f" : "white",
        color: darkMode ? "white" : "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: darkMode
          ? "1px solid #333"
          : "1px solid #ddd",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {/* Hamburger */}
        <div
          onClick={() =>
            setIsSidebarOpen((prev) => !prev)
          }
          style={{
            cursor: "pointer",
            fontSize: "22px",
          }}
        >
          ☰
        </div>

        {/* Logo */}
        <h2
          onClick={() => navigate("/")}
          style={{
            color: "red",
            cursor: "pointer",
            margin: 0,
          }}
        >
          YouTube
        </h2>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {/* Dark Mode Toggle */}
        <button
          onClick={() =>
            setDarkMode((prev) => !prev)
          }
          style={{
            padding: "6px 12px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: darkMode
              ? "#272727"
              : "#f2f2f2",
            color: darkMode ? "white" : "black",
            fontWeight: "500",
          }}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* User Section */}
        {token && user ? (
          <>
            <div
              style={{
                backgroundColor: "#cc0000",
                color: "white",
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {user.username?.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.reload();
              }}
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#eee",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#065fd4",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;