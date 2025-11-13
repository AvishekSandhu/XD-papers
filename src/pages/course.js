
import React, { useEffect,useState} from "react";
import Card from '../components/card.jsx';
import { Link } from "react-router-dom";
import "../style/course.css"
import img1 from '../components/images/ptu.png';
import img2 from '../components/images/cbse.png';
import img3 from '../components/images/dtu.png';
import img4 from '../components/images/rail.png';
import {Crs} from '../controllers/transition.js';
function Course(){
  
 const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        // Check if user data exists in localStorage
        const userData =  sessionStorage.getItem("userData");
        if (userData) {
          setIsLoggedIn(true); // User is logged in
        }
       
      }, []);

      
      const course= [
        {coursename:"PTU",details:"Punjab Technical University (PTU) is a premier institution offering technical and professional education in Punjab, India. It provides courses in engineering, management, and applied sciences, focusing on innovation and research. PTU plays a crucial role in shaping skilled professionals for the industry.",image:img1,linkpage:"/ptupapers"},
        {coursename:"CBSE",details:"CBSE is a national-level board of education in India. Ideal For: Students preparing for school-level board exams (10th & 12th) Additional Info: Offers NCERT-based curriculum, widely recognized.",image:img2},
        {coursename:"DTU",details:"Delhi Technological University (DTU), formerly known as Delhi College of Engineering, is a leading technical university in India. It offers undergraduate and postgraduate programs in engineering, technology, and management. DTU is renowned for its research, placements, and innovation-driven approach.",image:img3},
        {coursename:"RAILWAY NTPC",details:"Railway NTPC (Non-Technical Popular Categories) is a competitive exam conducted by the Indian Railways for various administrative and clerical positions. The exam covers subjects like general awareness, mathematics, and reasoning, offering career opportunities in India's largest employer.",image:img4},
      ]
     
    return(
     
<div>

  
    {isLoggedIn ? (
      <>
   <p className="sltc" style={{textAlign:"center",fontSize:"2.8rem",fontWeight:"600"}}>Select Your Course </p>
   <div className="cards" style={{display:"flex"}}>
   {course.map((course, index) => (
   
    <Crs key={index} index={index}>
    <Card
    key={index}
    coursename ={course.coursename}
    details ={course.details}
    image ={course.image}
    linkpage ={course.linkpage}
    />
    {/* //  </motion.div> */}
    </Crs>
  ))}

     </div>
    </>
): (
  <>
    <h1 style={{textAlign:"center",marginTop:"8rem"}}>Please log in to continue</h1>
    <Link  className ="main-lbtnc "to ="/login">
      <button className="Lbtnc">
        Login
      </button>
    </Link>
    </>
  )}
</div>

)};

export default  Course;