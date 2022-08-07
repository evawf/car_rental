import React, { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm.js";
import Cars from "../components/Cars.js";
import Navbar from "../components/Navbar";
import Car from "../components/Car";
import BookingForm from "../components/BookingForm.js";
import Confirmation from "../components/Confirmation.js";
import axios from "axios";

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function Home() {
  const [carsList, setCarsList] = useState([]);
  // const [showCarsList, setShowCarsList] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [selectedCarId, setSelectedCarId] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSingleCar, setShowSingleCar] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [currentCar, setCurrentCar] = useState();
  console.log("car id: ", selectedCarId);
  useEffect(() => {
    const getCurrentCar = async () => {
      const result = await axios.get(`${BACKEND_URL}/cars/${selectedCarId}`);
      setCurrentCar(result.data.car);
    };
    getCurrentCar();
  }, [selectedCarId]);

  return (
    <div>
      <div>{carsList.length}</div>
      <div>{`start Date: ${startDate} , end date : ${endDate}`}</div>
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
