import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePic = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Select image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  // Upload image
  const sendPic = async () => {
    if (!imageFile) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("profilePic", imageFile);


   

      const response = await axios.post(
        "http://localhost:3000/profilpic",
        formData,
        {
          withCredentials: true,
        }
      );

      

      if (response.data === true) {
        navigate("/JobPage");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to upload profile picture");
    } finally {
      setLoading(false);
    }
  };

  // Form submit
  const submitHandler = (e) => {
    e.preventDefault();
    sendPic();
  };

  return (
    <form onSubmit={submitHandler}>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            width: "400px",
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              marginBottom: "10px",
              color: "#222",
            }}
          >
            Profile Picture
          </h2>

          <p
            style={{
              color: "#777",
              marginBottom: "25px",
            }}
          >
            Choose a profile picture
          </p>

          {/* Image Preview */}

          <div
            style={{
              width: "150px",
              height: "150px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #ddd",
              backgroundColor: "#eee",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {image ? (
              <img
                src={image}
                alt="Profile Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <span
                style={{
                  color: "#999",
                  fontSize: "50px",
                }}
              >
                👤
              </span>
            )}
          </div>

          {/* Choose Image */}

          <label
            htmlFor="profileImage"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#222",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            Choose Image
          </label>

          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              display: "none",
            }}
          />

          {/* Save Button */}

          <button
            type="submit"
            disabled={loading}
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: loading ? "#999" : "#007bff",
              color: "white",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Uploading..." : "Save Profile Picture"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfilePic;