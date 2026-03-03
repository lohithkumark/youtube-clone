import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/?search=${search}`);
    }
  };

  return (
    <div
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "white",
      }}
    >
      <h2
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        YouTube
      </h2>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "400px",
            padding: "8px",
            borderRadius: "20px 0 0 20px",
            border: "1px solid gray",
            outline: "none",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "8px 15px",
            borderRadius: "0 20px 20px 0",
            border: "1px solid gray",
            backgroundColor: "#f2f2f2",
            cursor: "pointer",
          }}
        >
          🔍
        </button>
      </div>

      <div>Profile</div>
    </div>
  );
}

export default Header;