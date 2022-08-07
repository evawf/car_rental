import { useState, useContext } from "react";
import { TodosContext } from "../providers/ToDoProvider";
import { bookAction } from "../reducer/toDoReducer";

export default function BookingForm({
  startDate,
  endDate,
  selectedCarId,
  setShowConfirmation,
  currentCar,
}) {
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const { ToDoDispatch: dispatch } = useContext(TodosContext);

  const dayDiff = Math.floor(
    (new Date(endDate) - new Date(startDate)) / 86400000
  );

  console.log("start date:", startDate);
  console.log("end date: ", endDate);
  console.log("price per day: ", currentCar.price);
  console.log("renting days: ", dayDiff);
  console.log("total: ", dayDiff * currentCar.price);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let bookingInfo = {
      carId: selectedCarId,
      email: userEmail,
      phoneNo: userPhone,
      startDate: startDate,
      total: dayDiff * currentCar.price,
      endDate: endDate,
      // total: currentCar.price * (endDate - startDate),
      pickupLocation: "Changi Airport",
    };
    dispatch(await bookAction(bookingInfo));
    setShowConfirmation(true);
  };

  return (
    <div>
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
    </div>
  );
}
