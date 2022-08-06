import React, { useReducer } from "react";
import { toDoReducer, initialState } from "../reducer/toDoReducer";

export const TodosContext = React.createContext();

const ToDoProvider = ({ children }) => {
  const [state, ToDoDispatch] = useReducer(toDoReducer, initialState);

  return (
    <TodosContext.Provider
      value={{
        bookingList: state.bookings,
        ToDoDispatch,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default ToDoProvider;
