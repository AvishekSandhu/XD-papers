

import User from "../models/Createuser.js"; // Import your User model
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();




const login_control = async(req,res) => {
  // console.log(req.body)
try{

  const { Username,Password} = req.body;

  if (!Username || !Password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Check if the user exists
  const user = await User.findOne({ Username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // const token = jwt.sign(
    //   { id: user._id, role: user.role }, // Payload
    //   process.env.Secret_Key, // Replace with environment variable in production
    //   { expiresIn: "1h" }
    // );


    res.status(200).json({
      message: "User Logged-in as:",
      Username: user.Username,
      role: user.role,
      // token,
    });
    console.log("User logged-in successfully:", Username,"Role:",user.role);

}catch (error) {
  console.error("Error during login:", error);
  return res.status(500).json({ message: "Internal server error" });
}
  
  
 
}

export default login_control;