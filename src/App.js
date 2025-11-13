import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/home.js";
import About from "./pages/about.js";
import Contact from "./pages/contact.js";
import Course from "./pages/course.js";
import NotFound from "./components/Notfound.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Profile from "./pages/profile.js";
import Navbar from "./components/nav.jsx";
import Transition from "./controllers/transition.js";
import Ptupapers from "./pages/ptu/ptupapers.js";
import Admin from "./pages/admin/admin.js"
import Uploadpaper from "./pages/admin/uploadpaper.js"


function AnimatedRoutes() {
  const location = useLocation(); // Detects route changes

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Transition><Home /></Transition>} />
        <Route path="/about" element={<Transition><About /></Transition>} />
        <Route path="/contact" element={<Transition><Contact /></Transition>} />
        <Route path="/course" element={<Transition><Course /></Transition>} />
        <Route path="/papers" element={<Transition><Course /></Transition>} />
        <Route path="/login" element={<Transition><Login /></Transition>} />
        <Route path="/signup2" element={<Transition><Signup /></Transition>} />
        <Route path="/profile" element={<Transition><Profile /></Transition>} />
        <Route path="/ptupapers" element={<Transition><Ptupapers /></Transition>} />
        <Route path="/admin" element={<Transition><Admin/></Transition>} />
        <Route path="/uploadpaper" element ={<Transition> <Uploadpaper/></Transition>}/>

        <Route path="*" element={<Transition><NotFound /></Transition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar outside to remain persistent */}
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
