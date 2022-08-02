import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home.js";
import Bookings from "./routes/Bookings.js";
import About from "./routes/About.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
