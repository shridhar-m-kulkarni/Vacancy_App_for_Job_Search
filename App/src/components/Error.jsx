

import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          margin: "0",
          color: "#111",
          fontWeight: "bold",
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: "30px",
          margin: "10px 0",
          color: "#333",
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          fontSize: "16px",
          color: "#666",
          marginBottom: "25px",
        }}
      >
        Sorry, the page you are looking for does not exist.
      </p>

      <button
        onClick={() => navigate("/")}
        style={{
          padding: "12px 25px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#111",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Error;



