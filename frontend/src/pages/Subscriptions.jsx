import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";

function Subscriptions({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />

      <div style={{ display: "flex" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div style={{ padding: "24px", flex: 1 }}>
          <BackButton />

          <h2>📺 Subscriptions</h2>
          <p>Subscribed channels will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;