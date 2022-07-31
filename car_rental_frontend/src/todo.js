import { act } from "react-dom/test-utils";

export const initalVal = [
  {
    bookingInfo: {},
    booked: false,
  },
];

const BOOK = "BOOK";
const UPDATE = "UPDATE";
const CANCEL = "CANCEL";

export function toDoReducer(state, action) {
  switch (action.type) {
    case BOOK:
      return [...state, action.playload.booking];
    case UPDATE:
      return state.map((booking, i) => {
        if (i === action.playload.bookingId)
          return { ...booking, booked: action.playload.booked };
        return booking;
      });
    case CANCEL:
      return state.filter((_booking, i) => action.playload.bookingId !== i);
    default:
      return state;
  }
}

export function addBookingAction(bookingDetails) {
  return {
    type: BOOK,
    playload: {
      bookingInfo: bookingDetails,
      booked: false,
    },
  };
}

export function updateBookingAction(bookingId, booked) {
  return {
    type: UPDATE,
    playload: {
      bookingId,
      booked,
    },
  };
}

export function cancelBookingAction(bookingId, booked) {
  return {
    type: CANCEL,
    playload: {
      bookingId,
    },
  };
}
