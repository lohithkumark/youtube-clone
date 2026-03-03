function Sidebar() {
  return (
    <div style={{
      width: "200px",
      height: "100vh",
      borderRight: "1px solid #ddd",
      padding: "20px",
      backgroundColor: "white"
    }}>
      <p>Home</p>
      <p>Subscriptions</p>
      <p>Library</p>
      <p>History</p>
    </div>
  );
}

export default Sidebar;