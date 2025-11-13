import User from "../models/Createuser.js";
import bcrypt from "bcrypt";


const Addusertodb = async (req, res) => {
  console.log("Received data:", req.body);
//receiving data
  try {
    const { Username, Password, Email,role } = req.body;

    if (!Username || !Password || !Email) {
      return  res.status(400).json({ message: "All fields are required" });

    
      
    }
// Checking existing User
    const existingUser = await User.findOne({ Username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
      
    }
    // Checking existing Email
    const existingEmail = await User.findOne({Email})
    if(existingEmail){
      return res.status(400).json({ message: "Email is already used" });
      
    }

    if (Password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
   
    }
    
const encryptpass =  await bcrypt.hash(Password, 10)



    const savedata = new User({ 
 
      Username, 
      Password :encryptpass,
       Email,
       role
    }); 
    const savedUser = await savedata.save();
    console.log("User saved successfully:", savedUser.Username,"Role:",savedUser.role);
    return res.status(201).json({ message: "User created successfully:"});

    
  } catch (error) {
    console.error("Error saving user to database:", error);
    return res.status(500).json({ message: "Internal Server error"});
  }
};

export default Addusertodb;
