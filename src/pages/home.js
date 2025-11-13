import '../style/home.css';

import {Link,useLocation}from 'react-router-dom'
import React, { useEffect, useState } from "react";


// function Profileshow(){
//     const userData = sessionStorage.getItem("userData");
//     return !!userData;
// }


//  const chk_data =sessionStorage.getItem("userData")
function Home(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation(); 
    useEffect(() => {
      
        const userData = sessionStorage.getItem("userData");

        if (userData) {
          // If userData exists, parse it and set login state to true
          setIsLoggedIn(true);
        } else {
          // Otherwise, set it to false
          setIsLoggedIn(false);
        }
    
    }, [location]);
    return(
        <>
        <div className='main-lbtn'>
        {!isLoggedIn && (
        <Link to="/login">
            <button class="Lbtn" type="button">
                LOGIN
            </button>
        </Link>
        )}
    </div>
    
<div id="wlc">
   
        <div id="txt">
            {/* <!-- <h1>Question Papers,</h1>
            <h2>the clever way.</h2> --> */}
            <label class="mtxt">Old Papers, Fresh Success!</label>
        </div>
        <div class="dmain">
            <p >Increase Marks, Know Exam patterns, Revision, Improve Time management</p>
            <p >Identify your weak and strong topics by previous year paper.</p>
        </div>
        <div id="btn">
            <Link to="/course">
            <button   class="btn1" type="button">
                GET STARTED
            </button>
        </Link>
        </div>
    </div>
    </>
    );

}


export default  Home;