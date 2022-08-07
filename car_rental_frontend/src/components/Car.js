import React from "react";

export default function Car({ selectedCarId, setShowBookingForm, currentCar }) {
  return (
    <div>
      <p>Single Car Page</p>
      {currentCar && (
        <div>
          <h2>Car details: {selectedCarId}</h2>
          <h4>Name: {currentCar.name}</h4>
          <p>Model: {currentCar.model}</p>
          <p>Type: {currentCar.type}</p>
          <p>Price: ${currentCar.price} / Day</p>
          <button onClick={() => setShowBookingForm(true)}>Book</button>
        </div>
      )}
    </div>
  );
}
