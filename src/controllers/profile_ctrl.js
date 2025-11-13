
import User from '../models/Createuser.js'
 
const profile_ctrl =async (req,res) => {
    try {
        const { Username } = req.query;
        // console.log("Username received:", Username);  Assuming username is passed as query param
        const user = await User.findOne({ Username });  //Find user by username from MongoDB
        // console.log("User found:", user);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    //sending back 
        res.status(200).json({
          username: user.Username,
          email: user.Email,
          created_date:user.createdAt,
          role:user.role,
        });
        
      } catch (error) {
        console.error("Error in profile_ctrl:", error.message);
        res.status(500).json({ message: 'Error fetching user data', error });
      }
}

export default profile_ctrl