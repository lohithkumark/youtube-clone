import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function History({
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
          <h2>🕒 Watch History</h2>
          <p>No watched videos yet.</p>
        </div>
      </div>
    </div>
  );
}

export default History;