import { useContext } from "react";
import { TodosContext } from "../providers/ToDoProvider";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// make sure that axios always sends the cookies to the backend server
import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function Confirmation({ currentCar, setShowConfirmation }) {
  const { bookingList: bookings } = useContext(TodosContext);
  let navigate = useNavigate();
  let booking = bookings[0];
  console.log("booking confirmation: ", booking);

  const handleConfirm = async () => {
    try {
      if (booking) {
        const result = await axios.post(`${BACKEND_URL}/booking`, booking);
        if (result.data === "Booking success!") {
          alert("Booking Success!");
          navigate("/Bookings", { replace: true });
        } else {
          alert("Booking failed!");
        }
      } else {
        alert("No booking info provided!");
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          color="Success"
          style={{ textAlign: "center", fontWeight: "700", color: "green" }}
        >
          Booking Confirmation
          <hr></hr>
        </Typography>
        <Typography>
          <h3>
            Start Date: {booking.startDate} AT 8:00 AM<br></br>
            End Date: {booking.endDate} AT 10:00 PM<br></br>
            Pickup Location: {booking.pickupLocation}
          </h3>
          <hr></hr>
          <p>
            <b>Car Details:</b>
            <br></br>
            Name: {currentCar.name} <br></br>
            Model: {currentCar.model} <br></br>
            Type: {currentCar.type} <br></br>
            Price: ${currentCar.price} / Day <br></br>
            <b>Total Cost: ${booking.total}</b>
          </p>
          <hr></hr>
          <p>
            <b>My Contact Info: </b> <br></br>
            Email: {booking.email} <br></br>
            Phone number: {booking.phoneNo}
          </p>
        </Typography>
        <CardActions
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            style={{ width: "100px" }}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100px" }}
            onClick={() => setShowConfirmation(false)}
          >
            Back
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
