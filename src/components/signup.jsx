import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import apiResponse from "../controllers/apiControl.js";

import "../style/signup.css";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const [Password, SetPassword] = useState();
  const [ConfirmPassword, SetConfirmPassword] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
 

  const handlesignup = async () => {
  

    const userData = {
      Username: username,
      Password: Password,
      Email: email,
    };
    try {
      // console.log("reached here");
  await apiResponse("/signup", userData);
  toast.success("User is  Registered Successfully!", {
    position: "top-right",
    autoClose: 2500,
    closeOnClick: true,
    pauseOnHover: false,
  });
  navigate("/");
      // console.log("Signup successful:", response);
    } catch (error) {
      console.error("Error during signup:", error);

      toast.error(error.message || "An unexpected error occurred. Please try again.", {
        position: "top-right",
      });
      
    }
    
  };

  const handleChange = (e) => {
    const { id, value, className } = e.target;
    if (id === "helo1") {
      SetPassword(value); // Update password
    }
    if (id === "op2") {
      SetConfirmPassword(value); // Update confirm password
    }
    if (className === "inpass") {
      setEmail(value); // Update email
    }
    if (className === "inuser2") setUsername(value); // Update username
  };

  const handlereg = () => {
    // let password = document.getElementById('helo1').value;
    // let confirmPassword= document.getElementById('op2').value;
    if (!username || !Password || !ConfirmPassword || !email) {
      toast.warning("All fields are required!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
        style: {
          borderRadius: "8px", // Rounded corners for better look
        },
      });
      return;
    }

    if (!Password) {
      toast.warning("Password is not entered", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,

        style: {
          borderRadius: "8px", // Rounded corners
        },
      });

      return;
    }

    if (!ConfirmPassword) {
      toast.warning("Confirm Password is not entered", {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return;
    }

    if (!email) {
      toast.warning("Email is not entered", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    }

    if (!username) {
      toast.warning("Username is not entered!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    }

    if (Password !== ConfirmPassword){
      toast.error("Password is not matched", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });
      return;
    } 
    

   
    handlesignup();
  };
 
  return (
    <div className="main-signup">
      <h1 className="t2">SIGN UP</h1>
      <div className="form">
        <p className="user">Username</p>

        <i
          className="fa-solid fa-user"
          style={{ marginLeft: "-58px", marginTop: "10px" }}
        ></i>
        <input
          className="inuser2"
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Type your Username"
          required
        />
        <br />
        <p className="pass">Password</p>
        <i
          className="fa-solid fa-key"
          style={{ marginLeft: "-58px", marginTop: "10px" }}
        ></i>
        <input
          id="helo1"
          type="password"
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <br />

        <input
          id="op2"
          type="password"
          style={{ left: "4.5rem" }}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />
        <br />
        <p className="pass3">Email</p>
        <i
          className="fa-solid fa-envelope"
          style={{ marginLeft: "-68px", marginTop: "10px" }}
        ></i>
        <input
          className="inpass"
          type="email"
          onChange={handleChange}
          placeholder="Enter your Email"
          required
          value={email}
        />
        <br />

        <div className="register">
          <button className="reg-btn" onClick={handlereg}>
            Register
          </button>
        </div>

        <Link to="/login">
          <p className="backtoslg">Back to Sign IN?</p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
