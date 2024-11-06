import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./Pages/Splash";
import Home from "./Pages/Home";
import LoginPage from './Pages/LoginPage';
import SignupPage from "./Pages/SignupPage";
import About from "./Pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<LoginPage />} /> 
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/About" element={<About />} />
        
        
      </Routes>
    </Router>
  );
}

export default App;
