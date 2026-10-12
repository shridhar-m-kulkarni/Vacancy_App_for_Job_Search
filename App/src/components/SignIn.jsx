import React, { useRef, useState } from "react";
import "../Css/SignIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./Login";


const SignIn = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();


  

  // Regex
  const usernameRegex = /^[A-Za-z0-9_@#$!]{3,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[A-Za-z0-9@#$]{8,16}$/;

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const Auth = () => {
    // Username validation
    if (username === "") {
      usernameRef.current.textContent = "Enter the Username";

      return;
    } else {
      usernameRef.current.textContent = "";
    }

    if (!usernameRegex.test(username)) {
      usernameRef.current.textContent =
        "Username must be 3–15 characters long and can contain letters, numbers, and special characters (_ @ # $ !). Spaces are not allowed.";

      return;
    } else {
      usernameRef.current.textContent = "";
    }

    // Email validation
    if (email === "") {
      emailRef.current.textContent = "Enter Email";

      return;
    } else {
      emailRef.current.textContent = "";
    }

    if (!emailRegex.test(email)) {
      emailRef.current.textContent =
        "Enter a valid email address (example: name@example.com).";
      return;
    } else {
      emailRef.current.textContent = "";
    }

    // Password validation
    if (password === "") {
      passwordRef.current.textContent = "Enter Password";

      return;
    } else {
      passwordRef.current.textContent = "";
    }

    if (!passwordRegex.test(password)) {
      passwordRef.current.textContent =
        "Password must be 8–16 characters and can contain letters, numbers, @, #, and $.";
      return;
    } else {
      passwordRef.current.textContent = "";
    }

    const sendData = async () => {
      try {
        const send = await axios.post(
          "http://localhost:3000/create",
          {
            username,
            email,
            password,
          },
          {
            withCredentials: true,
          },
        );

        if (send.data === true) navigate("/Login");
        else alert(send.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    sendData();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    Auth();
  };

  return (
    <>
      <div
        style={{ position: "fixed", backgroundColor: "white", width: "100vw" }}
      >
        <img src="/Logo.png" style={{ width: "200px" }} />
      </div>
      <div className="signin-container">
        <div className="signin-box">
          <h1>Sign In</h1>
          <p className="subtitle">Create Account</p>

          <form onSubmit={submitHandler}>
            {/* Username */}

            <div className="input-group">
              <label htmlFor="username">Username</label>

              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                maxLength={15}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <h5 ref={usernameRef} style={{ color: "red" }}></h5>
            </div>

            {/* Email */}

            <div className="input-group">
              <label htmlFor="email">Email</label>

              <input
                
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h5 ref={emailRef} style={{ color: "red" }}></h5>
            </div>

            {/* Password */}

            <div className="input-group">
              <label htmlFor="password">Password</label>

              <input
               
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <h5 ref={passwordRef} style={{ color: "red" }}></h5>
            </div>

            <button type="submit" className="SignInAndLoginBtn">Sign In</button>
            <br /><br />
            <h5>Already Have Account?<span onClick={() => navigate("/Login")} style={{color:"blue",cursor:"pointer"}}> Login</span></h5>
            

          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
