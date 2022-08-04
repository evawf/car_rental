import React, { useState } from "react";
import axios from "axios";

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function SearchForm({ setCarsList, setShowCarsList }) {
  const [pickupLocation, setPickupLocation] = useState("Changi Airport");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    try {
      const result = await axios.get(`${BACKEND_URL}/availableCars`, {
        params: { searchedStartDate: startDate, searchedEndDate: endDate },
      });
      if (result.data) {
        setCarsList(result.data.cars);
        setShowCarsList(true);
      } else {
        alert("Sorry, no available car!");
      }
    } catch (error) {
      console.log("Error message: ", error);
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
      <label>Pickup Location</label>
      <input
        type="location"
        placeholder="Pick-up Location"
        value={pickupLocation}
        onChange={(e) => {
          setPickupLocation(e.target.value);
        }}
      />
      <label>Start Date</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      />
      <label>End Date</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
      />
      <button type="button" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}
