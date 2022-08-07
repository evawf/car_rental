import React, { useState } from "react";
import Navbar from "../components/Navbar";

// make sure that axios always sends the cookies to the backend server
import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function Bookings() {
  const [email, setEmail] = useState("");
  const [myBookingList, setMyBookingList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(`${BACKEND_URL}/myBookings`, {
        params: { email: email },
      });
      console.log("result data: ", result.data);
      if (result.data.bookings.length) {
        setMyBookingList(result.data.bookings);
      } else {
        alert("You haven't booked a car yet!");
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  };

  const handleCancel = async (id) => {
    console.log("selected booking id: ", id);
    setMyBookingList(myBookingList.filter((booking) => booking.id !== id));
    try {
      const result = await axios.delete(`${BACKEND_URL}/myBookings/${id}`);
      console.log("delete result: ", result.data);
    } catch (error) {
      console.log("Error message: ", error);
    }
  };

  return (
    <>
      <main>
        <Navbar />
        <div>
          <p>Please input email to view all your bookings: </p>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="button" onClick={handleSubmit}>
              Search
            </button>
            {myBookingList &&
              myBookingList.map((booking, idx) => (
                <li key={idx}>
                  <p>My booking ID: {booking.id}</p>
                  <p>Pickup Location: {booking.pickupLocation}</p>
                  <p>Start Date: {booking.startDate}</p>
                  <p>Model Name: {booking.car.model}</p>
                  <p>End Date: {booking.endDate}</p>
                  <button
                    onClick={() => {
                      handleCancel(booking.id);
                    }}
                  >
                    Cancel
                  </button>
                </li>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
