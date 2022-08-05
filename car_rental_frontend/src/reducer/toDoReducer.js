import axios from "axios";

export const initialState = [];

const BOOK = "BOOK";
const UPDATE = "UPDATE";
const CANCEL = "CANCEL";

export function toDoReducer(state, action) {
  switch (action.type) {
    case BOOK:
      return [...state, action.payload.bookingDetails];
    case UPDATE:
      return state.map((booking, i) => {
        if (i === action.payload.bookingId) {
          booking = action.payload.bookingDetails;
        }
        return booking;
      });
    case CANCEL:
      return state.filter((_booking, i) => action.payload.bookingId !== i);
    default:
      return state;
  }
}

export const bookAction = async (bookingDetails) => {
  return {
    type: BOOK,
    payload: {
      bookingDetails,
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
