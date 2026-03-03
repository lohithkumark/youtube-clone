import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";

function Subscriptions({ isSidebarOpen, setIsSidebarOpen }) {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:8080/api/subscriptions", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setSubscriptions(res.data))
    .catch((err) => console.log(err));

  }, []);

  return (
    <div style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Header setIsSidebarOpen={setIsSidebarOpen} />

      <div style={{ display: "flex" }}>
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <div style={{ padding: "24px", flex: 1 }}>
          <BackButton />

          <h2>📺 Subscriptions</h2>

          {subscriptions.length === 0 && <p>No subscriptions yet.</p>}

          {subscriptions.map((sub) => (
            <div
              key={sub._id}
              style={{
                padding: "15px",
                backgroundColor: "white",
                borderRadius: "12px",
                marginBottom: "15px",
              }}
            >
              <h4>{sub.channel.name}</h4>
              <p style={{ color: "gray" }}>{sub.channel.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Subscriptions;