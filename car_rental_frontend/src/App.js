import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import Cars from "./components/Cars.js";
// import { Link, Outlet } from "react-router-dom";
// import Modal from "./components/Modal/Modal.js";
// import Car from "./components/Car.js";

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

function App() {
  const initalVal = {
    pickupLocation: "",
    pickupDate: "",
    dropoffDate: "",
  };

  const [searchParams, setSearchParams] = useState(initalVal);
  const [carsList, setCarsList] = useState([]);
  const [showCarsList, setShowCarsList] = useState(false);

  const handleSubmit = async () => {
    console.log("clicked!");
    console.log("searchParams", searchParams);
    try {
      const result = await axios.get(`${BACKEND_URL}/cars`);
      console.log(result.data.cars);
      setCarsList(result.data.cars);
      setShowCarsList(true);
    } catch (error) {
      console.log("Error message: ", error);
    }

    return;
  };

  return (
    <div className="App" style={{ marginTop: "50px" }}>
      <input
        type="location"
        placeholder="Pick-up Location"
        value={(searchParams.pickupLocation = "Changi Airport")}
        onChange={(e) => {
          setSearchParams({ pickupLocation: e.target.value });
        }}
      />
      <input
        type="date"
        placeholder="Pick-up Date"
        value={searchParams.pickupDate}
        onChange={(e) => {
          setSearchParams({ pickupDate: e.target.value });
        }}
      />
      <input
        type="date"
        placeholder="Drop-off Date"
        value={searchParams.dropoffDate}
        onChange={(e) => {
          setSearchParams({ dropoffDate: e.target.value });
        }}
      />
      <button type="button" onClick={handleSubmit}>
        Search
      </button>
      {/* <div>{Modal(Car)}</div> */}
      {showCarsList && <Cars carsList={carsList} />}
    </div>
  );
}

export default App;
