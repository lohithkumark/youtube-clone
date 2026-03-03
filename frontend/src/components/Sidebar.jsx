function Sidebar({ isSidebarOpen }) {
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
          <p style={{ cursor: "pointer" }}>Home</p>
          <p style={{ cursor: "pointer" }}>Subscriptions</p>
          <p style={{ cursor: "pointer" }}>Library</p>
          <p style={{ cursor: "pointer" }}>History</p>
        </>
      )}
    </div>
  );
}

export default Sidebar;