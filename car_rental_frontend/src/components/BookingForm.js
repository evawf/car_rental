import { useState, useContext } from "react";
import { TodosContext } from "../providers/ToDoProvider";
import { bookAction } from "../reducer/toDoReducer";

export default function BookingForm({
  startDate,
  endDate,
  selectedCarId,
  setShowConfirmation,
}) {
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const { ToDoDispatch: dispatch } = useContext(TodosContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let bookingInfo = {
      carId: selectedCarId,
      email: userEmail,
      phoneNo: userPhone,
      startDate: startDate,
      endDate: endDate,
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
