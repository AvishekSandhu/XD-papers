import React from 'react'
import { Link } from "react-router-dom";
import "../style/card.css"


const Card = ({coursename,details, image,linkpage} ) => {
 
  return (
 

    <div className="maincard">
     
<div className="card-box">
<div className="roundimg">
    <img src= {image}alt="img" srcset="" />
</div>
<div className="courseName">
   {coursename}
</div>
<div className="details">
 {details }
</div>
<div className="gotop">
  <Link to={linkpage}>
    <button type="submit">
        Go to Page
    </button>
    </Link>
</div>
</div>

    </div>
   
  )
}

export default Card;