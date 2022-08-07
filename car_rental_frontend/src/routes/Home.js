import React, { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm.js";
import Cars from "../components/Cars.js";
import Navbar from "../components/Navbar";
import Car from "../components/Car";
import BookingForm from "../components/BookingForm.js";
import Confirmation from "../components/Confirmation.js";

// make sure that axios always sends the cookies to the backend server
import axios from "axios";
axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function Home() {
  const [carsList, setCarsList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [pickupLocation, setPickupLocation] = useState("");
  const [selectedCarId, setSelectedCarId] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSingleCar, setShowSingleCar] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentCar, setCurrentCar] = useState();

  useEffect(() => {
    const getCurrentCar = async () => {
      const result = await axios.get(`${BACKEND_URL}/cars/${selectedCarId}`);
      setCurrentCar(result.data.car);
    };
    getCurrentCar();
  }, [selectedCarId]);

  return (
    <div>
      <Navbar />
      {!showSingleCar ? (
        <div>
          <SearchForm
            setCarsList={setCarsList}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setPickupLocation={setPickupLocation}
          />
          <Cars
            carsList={carsList}
            setSelectedCarId={setSelectedCarId}
            setShowSingleCar={setShowSingleCar}
          />
        </div>
      ) : (
        <div>
          {!showBookingForm ? (
            <Car
              selectedCarId={selectedCarId}
              setShowBookingForm={setShowBookingForm}
              currentCar={currentCar}
            />
          ) : (
            <div>
              {!showConfirmation ? (
                <BookingForm
                  startDate={startDate}
                  endDate={endDate}
                  selectedCarId={selectedCarId}
                  pickupLocation={pickupLocation}
                  setShowConfirmation={setShowConfirmation}
                />
              ) : (
                <Confirmation currentCar={currentCar} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
