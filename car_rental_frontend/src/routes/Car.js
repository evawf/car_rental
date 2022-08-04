import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Navigate } from "react-router-dom";

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function Car() {
  const { id } = useParams();
  const [currentCar, setCurrentCar] = useState();
  let newDate = new Date();

  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    const getCurrentCar = async () => {
      const result = await axios.get(`${BACKEND_URL}/cars/${id}`);
      setCurrentCar(result.data.car);
    };
    getCurrentCar();
  }, []);

  const handleSubmit = async () => {
    const bookingInfo = {
      carId: Number(id),
      email: userEmail,
      phoneNo: userPhone,
      startDate: newDate.getDate() + "/" + (newDate.getMonth() + 1),
      endDate: newDate.getDate() + "/" + (newDate.getMonth() + 1),
      pickupLocation: "Changi Airport",
    };

    try {
      if (userEmail && userPhone) {
        const result = await axios.post(`${BACKEND_URL}/booking`, bookingInfo);
        if (result.data === "Booking success!") {
          alert("Booking Success!");
          return <Navigate to="/Bookings" replace={true} />;
        } else {
          alert("Booking failed!");
        }
      } else {
        alert("Please input your contact info!");
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  };

  return (
    <div>
      <Navbar />
      {currentCar && (
        <div>
          <h2>Car details: {id}</h2>
          <h4>Name: {currentCar.name}</h4>
          <p>Model: {currentCar.model}</p>
          <p>Type: {currentCar.type}</p>
          <p>Price: ${currentCar.price} / Day</p>
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
      {/* <Link to={`/cars/${currentCar.id}/book`}>Book</Link> */}
    </div>
  );
}
