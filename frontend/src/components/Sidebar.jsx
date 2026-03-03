import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ isSidebarOpen, darkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!isSidebarOpen) return null;

  const menuItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Subscriptions", path: "/subscriptions", icon: "📺" },
    { name: "Library", path: "/library", icon: "📚" },
    { name: "History", path: "/history", icon: "🕒" },
  ];

  return (
    <div
      style={{
        width: "220px",
        backgroundColor: darkMode ? "#0f0f0f" : "#f2f2f2",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
        paddingTop: "20px",
        borderRight: darkMode ? "1px solid #222" : "1px solid #ddd",
      }}
    >
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <div
            key={item.name}
            onClick={() => navigate(item.path)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 20px",
              cursor: "pointer",
              borderRadius: "10px",
              margin: "5px 10px",
              backgroundColor: isActive
                ? darkMode
                  ? "#272727"
                  : "#e5e5e5"
                : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            <span>{item.icon}</span>
            <span style={{ fontSize: "15px", fontWeight: "500" }}>
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;