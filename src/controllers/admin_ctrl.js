import User from "../models/Createuser.js";

const admin_ctrl = async (req, res) => {
    try {
       
        // const RoleofcurrentU = JSON.parse(sessionStorage.getItem("role"))
        // console.log(RoleofcurrentU)

        // if (RoleofcurrentU !== "Admin") {
        //     return res.status(403).json({ error: "Access Denied" });
        // }

        // Fetch all users
        const users = await User.find({}, {password:0});

        res.json(users); // ✅ Fix: Return the users array directly
        // console.log(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export default admin_ctrl;
