import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProficPic from "./ProfilePic";



const Login = () => {

      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
        const navigate = useNavigate();
      

        // Regex
  const usernameRegex = /^[A-Za-z0-9_@#$!]{3,15}$/;
  const passwordRegex = /^[A-Za-z0-9@#$]{8,16}$/;



    const usernameRef = useRef();
    const passwordRef = useRef();

    const Auth = async () =>{

    // Username validation
    if (username === "") {
      usernameRef.current.textContent = "Enter the Username"
      
      return;
    }else{
      usernameRef.current.textContent = ""
    }

    if (!usernameRegex.test(username)) {
      usernameRef.current.textContent ="Username must be 3–15 characters long and can contain letters, numbers, and special characters (_ @ # $ !). Spaces are not allowed."

      
      return;
    }
    else{
      usernameRef.current.textContent = ""
    }


    // Password validation
    if (password === "") {
      passwordRef.current.textContent ="Enter Password"
      
      
      return;
    }else{
      passwordRef.current.textContent =""

    }

    if (!passwordRegex.test(password)) {
      passwordRef.current.textContent = "Password must be 8–16 characters and can contain letters, numbers, @, #, and $."
      return;
    }else{
      passwordRef.current.textContent =""

    }







    const login = async () =>{

        try{  
             const sendLogin = await axios.post(
                "http://localhost:3000/login",
                {
                  username,
                  password,
                },
                {
                  withCredentials: true,
                }
              );
       
            
           
      if(sendLogin.data === true){
        
      navigate("/ProfilePic")
      
      }else{
      alert(sendLogin.data)
    }} catch (error) {
    console.log(error.response?.data || error.message);
  }
    
    };
    
    
    login();
  };
              

    




      const submitHandler = async (e) =>{
    e.preventDefault();
        
        Auth();
       
        
        

      }
  return (
     <>
     
   <div style={{ position: "fixed", backgroundColor:"white",width:'100vw'}}>
      <img src="/Logo.png" style={{width:"200px"}}/>
    </div>
    <div className="signin-container">
    
      <div className="signin-box">
        <h1>Log In</h1>
        <p className="subtitle">Login Account</p>

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
            <h5 ref={usernameRef} style={{color:"red"}}></h5>
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
              autoComplete="off"
            />
            <h5 ref={passwordRef} style={{color:"red"}}></h5>
          </div>

          <button type="submit" className="SignInAndLoginBtn">Login In</button>
          <br /><br />
            <h5>Don't Have Account?<span onClick={() => navigate("/SignIn")} style={{color:"blue",cursor:"pointer"}}> Create Account</span></h5>

        </form>
      </div>
    </div>
    </>
  )
}

export default Login
