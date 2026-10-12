import { RxCross1 } from "react-icons/rx";
import { FaSignInAlt } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import { IoIosContact } from "react-icons/io";
import { Link } from "react-router-dom";



const MiniMenu = ({showMenu,setShowMenu}) => {
  return (
    <div
      style={{
        width: "60vw",
        height: "350px",
        backgroundColor: "white",
        position: "absolute",
        right: "0",
        zIndex: 9999,
      }}
    >
      <div className="crossIcon" onClick={()=>{
        setShowMenu(false)
      }}>
  <h1><RxCross1 /></h1>
      </div>
    
      <ul
        style={{
          listStyleType: "none",
          padding: "20px",
          display:"flex",
          flexDirection:"column",
          gap:"40px",
          fontSize:"1.5rem",
         

        }}
      >
        <Link to="/signin" className="Fblack">
            <li className="Navbarlis">
              <FaSignInAlt /> SignIn
            </li>
            </Link>
             <Link to="/About" className="Fblack">

            <li className="Navbarlis">
              <BiErrorCircle />
              About
            </li>
            </Link>

             <Link to="/Contact" className="Fblack">

            <li className="Navbarlis">
              <IoIosContact />
              Contact
            </li>
            </Link>
       
      </ul>
    </div>
  );
};

export default MiniMenu;