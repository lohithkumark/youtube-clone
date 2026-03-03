import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Library({
  isSidebarOpen,
  setIsSidebarOpen,
  darkMode,
  setDarkMode,
}) {
  return (
    <div
      style={{
        backgroundColor: darkMode ? "#0f0f0f" : "#f9f9f9",
        color: darkMode ? "white" : "black",
        minHeight: "100vh",
      }}
    >
      <Header
        setIsSidebarOpen={setIsSidebarOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div style={{ display: "flex" }}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          darkMode={darkMode}
        />

        <div style={{ padding: "24px", flex: 1 }}>
          <h2 style={{ marginBottom: "20px" }}>
            📚 Your Library
          </h2>

          <div
            style={{
              backgroundColor: darkMode
                ? "#181818"
                : "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: darkMode
                ? "0 2px 8px rgba(0,0,0,0.5)"
                : "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <p style={{ color: darkMode ? "#aaa" : "gray" }}>
              Saved playlists and videos will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;