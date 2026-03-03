import { useNavigate } from "react-router-dom";

function Sidebar({ isSidebarOpen }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: isSidebarOpen ? "200px" : "0px",
        overflow: "hidden",
        transition: "width 0.3s ease",
        backgroundColor: "white",
        borderRight: "1px solid #ddd",
        padding: isSidebarOpen ? "20px" : "0px",
      }}
    >
      {isSidebarOpen && (
        <>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Home
          </p>

          <p style={{ cursor: "pointer" }}>
            Subscriptions
          </p>

          <p style={{ cursor: "pointer" }}>
            Library
          </p>

          <p style={{ cursor: "pointer" }}>
            History
          </p>
        </>
      )}
    </div>
  );
}

export default Sidebar;