import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/register",
        { name, email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", margin: "10px auto" }}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto" }}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto" }}
      />

      <button onClick={handleSignup}>Signup</button>

      <p
        style={{ marginTop: "15px", cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/login")}
      >
        Already have account? Login
      </p>
    </div>
  );
}

export default Signup;