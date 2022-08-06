import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
// import { Navigate } from "react-router-dom";
import { TodosContext } from "../providers/ToDoProvider";
import { bookAction } from "../reducer/toDoReducer";
import Confirmation from "./Confirmation";

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function Car() {
  const { id } = useParams();
  const [currentCar, setCurrentCar] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // useContext + useReducer
  // const [booking, setBooking] = useState(null);
  const { ToDoDispatch: dispatch } = useContext(TodosContext);

  useEffect(() => {
    console.log("start date: ", localStorage.getItem("startDate"));
    const getCurrentCar = async () => {
      const result = await axios.get(`${BACKEND_URL}/cars/${id}`);
      setCurrentCar(result.data.car);
    };
    getCurrentCar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let bookingInfo = {
      carId: Number(id),
      email: userEmail,
      phoneNo: userPhone,
      startDate: localStorage.getItem("startDate"),
      endDate: localStorage.getItem("endDate"),
      pickupLocation: "Changi Airport",
    };
    console.log(bookingInfo);
    // setBooking(bookingInfo);
    dispatch(await bookAction(bookingInfo));

    // try {
    //   if (userEmail && userPhone) {
    //     const result = await axios.post(`${BACKEND_URL}/booking`, booking);
    //     if (result.data === "Booking success!") {
    //       alert("Booking Success!");
    //       return <Navigate to="/Bookings" replace={true} />;
    //     } else {
    //       alert("Booking failed!");
    //     }
    //   } else {
    //     alert("Please input your contact info!");
    //   }
    // } catch (error) {
    //   console.log("Error message: ", error);
    // }
    //setBooking(null);
    setShowConfirmation(true);
  };

  return (
    <div>
      <Navbar />
      {/* <div>{booking}</div> */}
      {currentCar && (
        <div>
          <h2>Car details: {id}</h2>
          <h4>Name: {currentCar.name}</h4>
          <p>Model: {currentCar.model}</p>
          <p>Type: {currentCar.type}</p>
          <p>Price: ${currentCar.price} / Day</p>
          <p>Start Date: {localStorage.getItem("startDate")}</p>
          <p>End Date: {localStorage.getItem("endDate")}</p>
        </div>
      )}
      <p>Please input your contact info to book: </p>
      <div style={{ display: "flex", flexDirection: "column", width: "250px" }}>
        <label>Your Email</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <label>Your Contact No.</label>
        <input
          type="number"
          value={userPhone}
          onChange={(e) => {
            setUserPhone(e.target.value);
          }}
        />
        <button type="button" onClick={handleSubmit}>
          Book
        </button>
      </div>
      {showConfirmation && <Confirmation />}
    </div>
  );
}
