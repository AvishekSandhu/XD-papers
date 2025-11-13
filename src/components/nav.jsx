import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/nav.css';
import mlogo from './images/main-logo.png';




  
 function Navbar() {
 useLocation(); // Triggers re-render on route change
  const storedUserData = JSON.parse(sessionStorage.getItem("userData"));
  const op1 = storedUserData?.Username;
  return (
    <div id="navbr">
      <img className="nvimg" src={mlogo} alt="logo" />

      <ul className="navul">
        <li>
         
          <Link className="nvm" to="/about">
    
            ABOUT
            
          </Link>
          
        </li>
        <li>
          <Link className="nvm" to="/papers">
            PAPERS
          </Link>
        </li>
        <li>
          <Link className="nvm" to="/contact">
            CONTACT US
          </Link>
        </li>
      </ul>

      <ul className="nav-right">
        <li>
          <Link className='rnvm-p' to="/profile">
         {op1}
          </Link>
        </li>
        <li>
          <Link className="rnvm" to="/course">
            COURSE
          </Link>
        </li>
        <li>
          <Link className="rnvm" to="/">
            HOME
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;