import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";

function Library({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />

      <div style={{ display: "flex" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div style={{ padding: "24px", flex: 1 }}>
          <BackButton />

          <h2>📚 Library</h2>
          <p>Your saved videos and playlists will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default Library;