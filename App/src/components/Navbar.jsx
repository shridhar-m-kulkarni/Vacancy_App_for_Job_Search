import { FaSignInAlt } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import { IoIosContact } from "react-icons/io";
import { HiOutlineBars3 } from "react-icons/hi2";
import MiniMenu from "./MiniMenu";
import { useState } from "react";
import { Link } from "react-router-dom";



const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);


  const menuToggle = () => {
    if (showMenu === false) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };


  return (
    <div
       style={{
    width: "90%",
    height: "10vh",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "50px",
    position: "fixed",
    margin: "20px 0px 0px 50px",
    zIndex: 1000,
  }}
    >
      <div style={{ padding: "-10px" }}>
        <img src="/Logo.png" className="Logo" />
      </div>

      <div className="NavMenu">
        <div style={{ width: "50%" }}>
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              gap: "100px",
              fontSize: "1.5rem",
              padding: "20px 100px 0px 100px",
              fontWeight: "bolder",
              color: "white",
              
            }}
          >
             <Link to="/signin" className="linkRemover">
            <li className="Navbarlis">
              <FaSignInAlt /> SignIn
            </li>
            </Link>
            
             <Link to="/About" className="linkRemover">

            <li className="Navbarlis">
              <BiErrorCircle />
              About
            </li>
            </Link>

             <Link to="/Contact" className="linkRemover">

            <li className="Navbarlis">
              <IoIosContact />
              Contact
            </li>
            </Link>
          </ul>
        </div>
      </div>

      <h1 onClick={menuToggle} className="threeLineToggle">
        <HiOutlineBars3 />
      </h1>

      {showMenu && <MiniMenu showMenu={showMenu} setShowMenu={setShowMenu}/>}
    </div>
  );
};

export default Navbar;
