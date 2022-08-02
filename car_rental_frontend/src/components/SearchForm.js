import React, { useState } from "react";
import axios from "axios";

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function SearchForm({ setCarsList, setShowCarsList }) {
  const initalVal = {
    pickupLocation: "",
    pickupDate: "",
    dropoffDate: "",
  };
  const [searchParams, setSearchParams] = useState(initalVal);
  const handleSubmit = async () => {
    try {
      const result = await axios.get(`${BACKEND_URL}/cars`);
      setCarsList(result.data.cars);
      setShowCarsList(true);
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
        value={(searchParams.pickupLocation = "Changi Airport")}
        onChange={(e) => {
          setSearchParams({ pickupLocation: e.target.value });
        }}
      />
      <label>Start Date</label>
      <input
        type="date"
        placeholder="Pick-up Date"
        value={searchParams.pickupDate}
        onChange={(e) => {
          setSearchParams({ pickupDate: e.target.value });
        }}
      />
      <label>End Date</label>
      <input
        type="date"
        placeholder="Drop-off Date"
        value={searchParams.dropoffDate}
        onChange={(e) => {
          setSearchParams({ dropoffDate: e.target.value });
        }}
      />
      <button type="button" onClick={handleSubmit}>
        Search
      </button>
    </div>
  );
}
