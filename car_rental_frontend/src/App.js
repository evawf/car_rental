import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home.js";
import Bookings from "./routes/Bookings.js";
import About from "./routes/About.js";
import Car from "./routes/Car.js";
import Book from "./routes/Book.js";
import NotFound from "./routes/NotFound.js";
import CarsContext from "./providers/CarsContext";
import axios from "axios";

axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

function App() {
  const [allCarsList, setAllCarsList] = useState();
  console.log("home all cars: ", allCarsList);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        console.log("called useEffect");
        const result = await axios.get(`${BACKEND_URL}/allCars`);

        console.log(result);
        setAllCarsList(result.data.allCars);
      } catch (error) {
        console.log("Error message: ", error);
      }
    };
    getAllCars();
  }, []);

  console.log(CarsContext);

  return (
    <Router>
      <CarsContext.Provider value={allCarsList}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Bookings" element={<Bookings />} />
          <Route path="/About" element={<About />} />
          <Route path="/cars/:id" element={<Car />} />
          <Route path="/cars/:id/book" element={<Book />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CarsContext.Provider>
    </Router>
  );
}

export default App;
