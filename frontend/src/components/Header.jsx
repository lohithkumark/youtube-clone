function Header() {
  return (
    <div style={{
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "white"
    }}>
      <h2 style={{ color: "red" }}>YouTube</h2>

      <input
        type="text"
        placeholder="Search"
        style={{
          width: "400px",
          padding: "8px",
          borderRadius: "20px",
          border: "1px solid gray"
        }}
      />

      <div>Profile</div>
    </div>
  );
}

export default Header;