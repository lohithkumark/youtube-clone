import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Login</h2>

      <input
        type="email"
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

      <button onClick={handleLogin}>Login</button>

      <p
        style={{ marginTop: "15px", cursor: "pointer", color: "blue" }}
        onClick={() => navigate("/signup")}
      >
        New user? Signup
      </p>
    </div>
  );
}

export default Login;