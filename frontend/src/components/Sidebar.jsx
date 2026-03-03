import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Subscriptions", path: "/subscriptions", icon: "📺" },
    { name: "Library", path: "/library", icon: "📚" },
    { name: "History", path: "/history", icon: "🕒" },
  ];

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
      {isSidebarOpen &&
        menuItems.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              navigate(item.path);
              setIsSidebarOpen(false); // 🔥 auto close
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor:
                location.pathname === item.path ? "#eee" : "transparent",
              fontWeight:
                location.pathname === item.path ? "bold" : "normal",
            }}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </div>
        ))}
    </div>
  );
}

export default Sidebar;