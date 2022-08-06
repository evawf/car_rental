// import axios from "axios";

export const initialState = { bookings: [] };

const BOOK = "BOOK";
const UPDATE = "UPDATE";
const CANCEL = "CANCEL";

export function toDoReducer(state, action) {
  switch (action.type) {
    case BOOK:
      return {
        ...state,
        bookings: [...state.bookings, action.payload.booking],
      };
    case UPDATE:
      const newBookings = state.bookings.map((booking, i) => {
        if (i === action.payload.bookingId) {
          booking = action.payload.bookingDetails;
        }
        return booking;
      });
      return { ...state, bookings: newBookings };
    case CANCEL:
      return {
        ...state,
        bookings: state.bookings.filter(
          (_booking, i) => action.payload.bookingId !== i
        ),
      };
    default:
      throw new Error("Action does not exist");
  }
}

export const bookAction = async (bookingDetails) => {
  return {
    type: BOOK,
    payload: {
      booking: bookingDetails,
    },
  };
};

export const updateAction = async (bookingId, bookingDetails) => {
  return {
    type: UPDATE,
    payload: {
      bookingId,
      bookingDetails,
    },
  };
};

export const cancelAction = async (bookingId) => {
  return {
    type: CANCEL,
    payload: {
      bookingId,
    },
  };
};
