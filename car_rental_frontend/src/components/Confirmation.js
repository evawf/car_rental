import { useContext } from "react";
import { TodosContext } from "../providers/ToDoProvider";
// import { updateAction, cancelAction } from "../reducer/toDoReducer";

export default function Confirmation({ currentCar }) {
  const { bookingList: bookings } = useContext(TodosContext);
  let booking = bookings.pop();
  console.log("my booking: ", booking);
  console.log("current car: ", currentCar);
  const handleConfirm = () => {};

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
