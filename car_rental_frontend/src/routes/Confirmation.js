import { useContext } from "react";
import { TodosContext } from "../providers/ToDoProvider";
// import { updateAction, cancelAction } from "../reducer/toDoReducer";

export default function Confirmation() {
  const { bookingList: booking } = useContext(TodosContext);

  console.log("my booking: ", booking);

  return (
    <div>
      <div>Booking Confirmation</div>
    </div>
  );
}
