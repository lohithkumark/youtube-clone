import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div>
      <Header />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "20px", flex: 1 }}>
          <h2>Video Grid Coming Soon...</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;