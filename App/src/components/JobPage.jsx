import axios from "axios";
import { useEffect, useState } from "react";
import Logout from "./logout";
import ProfilePic from "./ProfilePic";
import { useNavigate } from "react-router-dom";
import JobDetails from "./JobDetails";
import { IoReorderThreeOutline } from "react-icons/io5";

const JobPage = () => {
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [logoutDisplay,setLogoutDisplay] = useState(false)
  const[logout2PageDisplay,setLogout2PageDisplay] = useState(false)
  const navigate = useNavigate();



  const logoutBox = () =>{
    if(logoutDisplay === false){
      setLogoutDisplay(true)
    }else{
      setLogoutDisplay(false)
    }
  }


    const logoutBox2 = () =>{
    if(logout2PageDisplay === false){
      setLogout2PageDisplay(true)
    }else{
      setLogout2PageDisplay(false)
    }
  }

   const picChangeBox = () =>{
  
      navigate("/ProfilePic")
    }
  



  

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/sendPic",
          {
            withCredentials: true,
          }
        );

        const userData = response.data;
       
        

        setUsername(userData.username);

        if (userData.ProfilPic) {
          setProfilePic(
            `http://localhost:3000/uploads/${userData.ProfilPic}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  return (

    <>

   
    <div className="JobPageNavBar">
      {
        logout2PageDisplay && (
          <div className="JobPageSecondUserBox">
        
        <img src={profilePic} style={{width:"150px",height:"150px",borderRadius:"50%"}}/>
        <h1>{username}</h1>
         <Logout />
         <button className="ChangePPIC" onClick={picChangeBox}>Change Profile Pic</button>

    </div>

        )
      }
       
      {/* Logo */}

      <div>
        <img className="JobPageLogo"
          src="Logo.png"
          alt="Logo"
        />
      </div>

      {/* User Profile */}
      <div className="JobPageUserProfileMain">
        
      
      <div
        className="JobPageUserProfile"
      onClick={logoutBox}

      >
        {profilePic && (
          <img className="JobPageUserImage"
            src={profilePic}
            alt="Profile"
            
          />
        )}

        <h4 className="JobPageUserName">
          {username}
        </h4>
        
      </div>
     

        <h1 className="JobPageThreeLines" onClick={logoutBox2}><IoReorderThreeOutline /></h1>
         {
        logoutDisplay && (
            <div className="JobPageLogoutDiv">
              
             <Logout />
             <button className="ChangePPIC" onClick={picChangeBox}>Change Profile Pic</button>
            
      </div>
        )
      }
        
    </div>
 {/* <div style={{width:"50%",height:"100%",backgroundColor:"green",marginTop:"40px"}}> */}
      
    {/* </div> */}
   </div>
    

   

     
      <JobDetails />
      </>
  );
};

export default JobPage;