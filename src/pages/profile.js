import React, { useEffect, useState } from "react";
import "../style/profile.css";
import imgp from "../components/images/prf.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiReq } from "../controllers/apiControl.js";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState();
  const [email, setEmail] = useState();
  const [joinDate, setjoinDate] = useState();
  const [role, setRole] = useState("");


  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("userData"));
    const username = data.Username;


    if (data) {
      setuser(username);
    }

    async function fetchData() {
      const profileData = await apiReq("/profile", username);
     
      if (profileData) {
        setEmail(profileData.email || "no email");
        setjoinDate(new Date(profileData.created_date).toLocaleString());
        setRole(profileData.role);
      }
 
    // const op =JSON.parse(sessionStorage.getItem("role"));
    // console.log(op)
      
    }
   
    fetchData();
    // console.log(data)
  }, []);

 
  const handlelogout = () => {
    try {
      sessionStorage.removeItem("userData");
      navigate("/");
      toast.success("User is logout", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.error("user is not logout", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className="main">
      <div className="box">
        <h1 className="box-title">Profile</h1>
        <img className="box-img" src={imgp} alt=" avatar" />
        <div className="box-details">
          <label className="userName">Username</label>
          <p className="uname">{user}</p>
          <label className="userName">Email</label>
          <p className="email">{email}</p>
          <label className="userName">Joined By</label>
          <p className="join">{joinDate}</p>
          <label className="userName">Role</label>
          <p className="join">{role}</p>
        </div>
        {role === "Admin" && (
          <button className="admin-button" onClick={() => navigate("/admin")}>
            Go to Admin Panel
          </button>
        )}
        <button className="logout-button" onClick={handlelogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
