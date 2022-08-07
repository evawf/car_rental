import React, { useState } from "react";
// make sure that axios always sends the cookies to the backend server
import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function SearchForm({
  setCarsList,
  setStartDate,
  setEndDate,
  setPickupLocation,
}) {
  let pickupLocation;
  const [startDate, setStateStartDate] = useState(new Date());
  const [endDate, setStateEndDate] = useState(new Date());

  const handleSubmit = async () => {
    setStartDate(startDate);
    setEndDate(endDate);
    setPickupLocation(pickupLocation);
    if (startDate !== null && endDate !== null) {
      try {
        const result = await axios.get(`${BACKEND_URL}/availableCars`, {
          params: { searchedStartDate: startDate, searchedEndDate: endDate },
        });

        if (result.data) {
          setCarsList(result.data.cars);
        } else {
          alert("Sorry, no available car!");
        }
      } catch (error) {
        console.log("Error message: ", error);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "250px",
        textContent: "center",
      }}
    >
      <label>Pick-up & Drop-off Location</label>
      <input
        type="location"
        placeholder="Pick-up Location"
        value={"Changi Airport"}
        onChange={(e) => {
          pickupLocation = e.target.value;
        }}
      />
      <label>Start Date</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => {
          setStateStartDate(e.target.value);
        }}
      />
      <label>End Date</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => {
          setStateEndDate(e.target.value);
        }}
      />
      <button type="button" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}
