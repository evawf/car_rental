import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Input } from "@mui/material";

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
          <Card style={{ margin: "10px" }}>
            <CardContent>
              <Typography variant="body">
                Please input email to view all your bookings:{" "}
              </Typography>
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0",
                  padding: "0",
                }}
              >
                <Input
                  style={{
                    border: "1px solid lightgray",
                    width: "100%",
                    margin: "10px 0 10px 0",
                    borderRadius: "5px",
                    padding: "5px",
                  }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CardActions style={{ margin: "0", padding: "0" }}>
                  <Button
                    variant="contained"
                    color="info"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Search
                  </Button>
                </CardActions>
              </CardContent>
            </CardContent>
          </Card>
          <div>
            {myBookingList &&
              myBookingList.map((booking, idx) => (
                <Card
                  key={idx}
                  style={
                    new Date(booking.endDate) > new Date() &&
                    new Date(booking.startDate) > new Date()
                      ? {
                          backgroundColor: "lightblue",
                          margin: "10px",
                          padding: "10px",
                        }
                      : {
                          backgroundColor: "lightgray",
                          margin: "10px",
                          padding: "10px",
                        }
                  }
                >
                  <p>
                    <b>
                      Your Booking Number: {booking.id} <br></br>
                      Total Price: ${booking.total}
                    </b>
                    <hr></hr>
                    Pickup Location: {booking.pickupLocation} <br></br>
                    Start Date: {booking.startDate.slice(0, 10)} at 8:00 AM{" "}
                    <br></br>
                    End Date: {booking.endDate.slice(0, 10)} at 10:00 PM{" "}
                    <br></br>
                    Model Name: {booking.car.model} <br></br>
                  </p>
                  {new Date(booking.endDate) > new Date() &&
                  new Date(booking.startDate) > new Date() ? (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleCancel(booking.id);
                      }}
                    >
                      CANCEL
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleCancel(booking.id);
                      }}
                    >
                      DELETE
                    </Button>
                  )}
                </Card>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
