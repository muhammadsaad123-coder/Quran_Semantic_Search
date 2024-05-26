import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./Splash";
import Home from "./Home";
import LoginPage from './LoginPage';
import SignupPage from "./SignupPage";
import About from "./About";

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
