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
  let booking = bookings.slice(-1);

  const handleConfirm = async () => {
    console.log("clicked");
    try {
      if (booking[0]) {
        const result = await axios.post(`${BACKEND_URL}/booking`, booking[0]);
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
          <hr />
        </Typography>
        <Typography>
          <b>
            Start Date: {booking[0].startDate} AT 8:00 AM<br></br>
            End Date: {booking[0].endDate} AT 10:00 PM<br></br>
            Pick-up and Drop-off Location: <br></br>
            {booking[0].pickupLocation}
          </b>
        </Typography>
        <hr />
        <Typography>
          <b>Car Details:</b>
          <br></br>
          Name: {currentCar.name} <br />
          Model: {currentCar.model} <br />
          Gearbox: {currentCar.type} <br />
          Seats: {currentCar.seats} <br />
          Price: ${currentCar.price} / Day <br />
          <b style={{ color: "red" }}>Total Cost: ${booking[0].total}</b>
        </Typography>
        <hr />
        <Typography>
          <b>My Contact Info: </b> <br></br>
          Email: {booking[0].email} <br></br>
          Phone number: {booking[0].phoneNo}
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
