import React, { useState } from "react";
import "../style/login.css";
import { Link, useNavigate } from "react-router-dom";
import apiResponse from "../controllers/apiControl.js";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [user2, setUser] = useState();
  const [pass, setPass] = useState();

  const userData = {
    Username: user2,
    Password: pass,
  };

  const send_data = async () => {
    // console.log("Sending data:", userData);

    try {
      const res = await apiResponse("/login2", userData);

      sessionStorage.setItem("userData", JSON.stringify(res));

      toast.success(res.message + user2, {
        position: "top-right",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });
      //  fetchrole();
      navigate("/");
    } catch (error) {
      toast.error(
        error.message || "An unexpected error occurred. Please try again.",
        {
          position: "top-right",
        }
      );
    }
  };

  // const fetchrole =async()=>{
  //  const res= await apiResponse('/login2',userData)
  //  console.log(res)
  // }

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "inuser77") {
      setUser(value); // Update Username
    }
    if (id === "inpass77") {
      setPass(value); // Update password
    }
  };

  return (
    <div class="main-login">
      <h1 class="tl">LOGIN</h1>
      <div class="form">
        <p class="user">Username</p>
        <i
          className="fa-solid fa-user"
          style={{ marginRight: "76px", marginTop: "10px" }}
        ></i>
        <input
          id="inuser77"
          onChange={handleChange}
          type="text"
          placeholder="Enter your Username"
        />
        <br />
        <p class="pass">Password</p>
        <i
          class="fa-solid fa-key"
          style={{ marginRight: "76px", marginTop: "10px" }}
        ></i>
        <input
          id="inpass77"
          type="password"
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <br />
        <label class="fp" For="">
          Forget Password?
        </label>
        <button className="login" onClick={send_data}>
          Login
        </button>
        {/* <p className="login" onClick={send_data}>Login</p> */}'
        <p class="siup">Or Sign up using</p>
        <img
          src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1719964800&semt=ais_user"
          alt="twitter"
          class="i-t"
        />
        <img
          class="i-fb"
          src="https://cdn.logojoy.com/wp-content/uploads/20230921104408/Facebook-logo-600x319.png"
          alt="fb"
          srcset=""
        />
        <img
          src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-icon-logo-png-transparent-svg-vector-bie-supply-14.png"
          alt="g"
          class="i-g"
        />
        <p class="or">or</p>
        <Link to="/signup2">
          <p class="sin">SIGN UP</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
