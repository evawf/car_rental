import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function Bookings() {
  const [email, setEmail] = useState("");
  const [bookingList, setBookingList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.get(`${BACKEND_URL}/myBookings`, {
        params: { email: email },
      });
      console.log("result data: ", result.data);
      if (result.data) {
        setBookingList(result.data.bookings);
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  };

  return (
    <>
      <main>
        <Navbar />
        <h2>Manage Your Bookings</h2>
        <p>Please input your email: </p>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Search
          </button>
          {bookingList &&
            bookingList.map((booking, i) => (
              <li key={i}>
                <p>Booking ID: {booking.id}</p>
                <p>Pickup Location: {booking.pickupLocation}</p>
                <p>Start Date: {booking.startDate}</p>
                <p>End Date: {booking.endDate}</p>
                <button>Update</button>
                <button>Cancel</button>
              </li>
            ))}
        </div>
      </main>
    </>
  );
}
