import express from "express";
import sign from "../controllers/signIN&UP.js";
import LoginControl from "../controllers/login_control.js";
import profile_ctrl from "../controllers/profile_ctrl.js";
import admin_ctrl from "../controllers/admin_ctrl.js";
import uploadpaper_ctrl from '../controllers/uploadpaper_ctrl.js'

const route = express.Router();

route.post("/signup", sign);

route.post("/login2", LoginControl);
route.get("/profile", profile_ctrl);
route.get("/admin2", admin_ctrl);
route.post("/uploadpaper", uploadpaper_ctrl);


export default route;
