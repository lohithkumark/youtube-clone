function Sidebar({ isSidebarOpen }) {
  if (!isSidebarOpen) return null;

  return (
    <div
      style={{
        width: "200px",
        backgroundColor: "white",
        padding: "20px",
        borderRight: "1px solid #ddd",
      }}
    >
      <p>Home</p>
      <p>Subscriptions</p>
      <p>Library</p>
      <p>History</p>
    </div>
  );
}

export default Sidebar;