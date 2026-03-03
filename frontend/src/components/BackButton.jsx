import { useNavigate } from "react-router-dom";

function BackButton({ goHome = false }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => (goHome ? navigate("/") : navigate(-1))}
      style={{
        cursor: "pointer",
        marginBottom: "20px",
        fontWeight: "bold",
        fontSize: "16px",
      }}
    >
      ⬅ Back
    </div>
  );
}

export default BackButton;