import "./App.css";
import React, { useReducer, useState } from "react";
import axios from "axios";
import Cars from "./components/Cars.js";
import {
  initalState,
  toDoReducer,
  addBookingAction,
  updateBookingAction,
  cancelBookingAction,
} from "./todo.js";

// import { Link, Outlet } from "react-router-dom";
// import Modal from "./components/Modal/Modal.js";
// import Car from "./components/Car.js";

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

const ToDosContext = React.createContext(null);

function App() {
  const [showCarsList, setShowCarsList] = useState(false);
  const [carsList, setCarsList] = useState([]);
  const [todoList, dispatch] = useReducer(toDoReducer, initalState);

  return (
    <ToDosContext.Provider value={dispatch}>
      <div className="App" style={{ marginTop: "50px" }}>
        <SearchForm setShowCarsList={setShowCarsList} />
        {showCarsList && <Cars carsList={carsList} todoList={todoList} />}
      </div>
    </ToDosContext.Provider>
  );
}

function SearchForm() {
  const initalVal = {
    pickupLocation: "",
    pickupDate: "",
    dropoffDate: "",
  };
  const [searchParams, setSearchParams] = useState(initalVal);
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
  };

  return (
    <div>
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
    </div>
  );
}

export default App;
