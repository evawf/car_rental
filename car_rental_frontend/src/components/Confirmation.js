import { useContext } from "react";
import { TodosContext } from "../providers/ToDoProvider";
import { useNavigate } from "react-router-dom";
// make sure that axios always sends the cookies to the backend server
import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function Confirmation({ currentCar }) {
  const { bookingList: bookings } = useContext(TodosContext);
  let navigate = useNavigate();

  let booking = bookings.pop();
  console.log("my booking: ", booking);
  console.log("current car: ", currentCar);
  const handleConfirm = async () => {
    try {
      if (booking) {
        const result = await axios.post(`${BACKEND_URL}/booking`, booking);
        if (result.data === "Booking success!") {
          alert("Booking Success!");
          navigate("/Bookings", { replace: true });
          //return <Navigate to="/Bookings" replace={true} />;
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
    <div>
      <div>Booking Confirmation</div>
      <div>
        <h2>Start Date: {booking.startDate}</h2>
        <h2>End Date: {booking.endDate}</h2>
        <h2>Pickup Location: {booking.pickupLocation}</h2>
        <h4>Name: {currentCar.name}</h4>
        <p>Model: {currentCar.model}</p>
        <p>Type: {currentCar.type}</p>
        <p>Price: ${currentCar.price} / Day</p>
        <h2>My Contact Info: </h2>
        <p>Email: {booking.email}</p>
        <p>Phone number: {booking.phoneNo}</p>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
}
