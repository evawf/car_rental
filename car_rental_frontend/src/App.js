import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home.js";
import Bookings from "./routes/Bookings.js";
import NotFound from "./routes/NotFound.js";
import ToDoProvider from "./providers/ToDoProvider";

function App() {
  return (
    <Router>
      <ToDoProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Bookings" element={<Bookings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToDoProvider>
    </Router>
  );
}

export default App;
