import React, { useState } from "react";
import SearchForm from "../components/SearchForm.js";
import Cars from "../components/Cars.js";
import Navbar from "../components/Navbar";
import Car from "../components/Car";
import BookingForm from "../components/BookingForm.js";

export default function Home() {
  const [carsList, setCarsList] = useState([]);
  // const [showCarsList, setShowCarsList] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // states : car list / selectedcar
  return (
    <div>
      <div>{carsList.length}</div>
      <div>{`start Date: ${startDate} , end date : ${endDate}`}</div>
      <Navbar />
      <SearchForm
        setCarsList={setCarsList}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setPickupLocation={setPickupLocation}
      />
      <Cars carsList={carsList} setSelectedCarId={setSelectedCarId} />
      <Car
        selectedCarId={selectedCarId}
        setShowBookingForm={setShowBookingForm}
      />
      {showBookingForm && (
        <BookingForm
          startDate={startDate}
          endDate={endDate}
          selectedCarId={selectedCarId}
          pickupLocation={pickupLocation}
        />
      )}
    </div>
  );
}
