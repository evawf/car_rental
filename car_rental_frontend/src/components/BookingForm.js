import { useState, useContext } from "react";
import { TodosContext } from "../providers/ToDoProvider";
import { bookAction } from "../reducer/toDoReducer";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function BookingForm({
  startDate,
  endDate,
  selectedCarId,
  setShowBookingForm,
  setShowConfirmation,
  currentCar,
}) {
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const { ToDoDispatch: dispatch } = useContext(TodosContext);

  const dayDiff =
    1 + Math.floor((new Date(endDate) - new Date(startDate)) / 86400000);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail || !userPhone) {
      alert("Please input your email and phone number to book!");
      return;
    }

    const validateEmail = (email) => {
      let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
      return regex.test(email);
    };
    let validatedEmail = validateEmail(userEmail);

    if (!validatedEmail) {
      alert("Invalid Email!");
      return;
    }

    const validatePhoneNo = (phone) => {
      let regex = /^\+65[\d\s]*$/;
      return regex.test(phone);
    };
    let validatedPhoneNo = validatePhoneNo(userPhone);
    if (!validatedPhoneNo) {
      alert("Invalide Phone Number!");
      return;
    }

    let bookingInfo = {
      carId: selectedCarId,
      email: userEmail,
      phoneNo: userPhone,
      startDate: startDate,
      total: dayDiff * currentCar.price,
      endDate: endDate,
      pickupLocation: "Changi Airport",
    };
    dispatch(await bookAction(bookingInfo));
    setShowConfirmation(true);
  };

  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography color="primary">
          Please input your contact info to book:{" "}
        </Typography>
        <div
          style={{ display: "flex", flexDirection: "column", width: "250px" }}
        >
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
            type="text"
            value={userPhone}
            onChange={(e) => {
              setUserPhone(e.target.value);
            }}
          />
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
              type="button"
              style={{ width: "100px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ width: "100px" }}
              onClick={() => {
                setShowBookingForm(false);
              }}
            >
              Back
            </Button>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  );
}
