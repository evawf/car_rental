import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "@mui/material/Card";

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
      <main
        style={{
          width: "390px",
          height: "844px",
          border: "1px solid lightgray",
        }}
      >
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
                <Card
                  key={idx}
                  style={
                    new Date(booking.endDate) > new Date() &&
                    new Date(booking.startDate) > new Date()
                      ? { backgroundColor: "green" }
                      : { backgroundColor: "gray" }
                  }
                >
                  <p>My Booking Number: {booking.id}</p>
                  <p>Pickup Location: {booking.pickupLocation}</p>
                  <p>Start Date: {booking.startDate.slice(0, 10)} at 8:00 AM</p>
                  <p>End Date: {booking.endDate.slice(0, 10)} at 10:00 PM</p>
                  <p>Model Name: {booking.car.model}</p>
                  <p>Total Price: ${booking.total}</p>
                  <button
                    onClick={() => {
                      handleCancel(booking.id);
                    }}
                  >
                    Cancel
                  </button>
                </Card>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
