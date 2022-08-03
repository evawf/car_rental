import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
// import CarsContext from "../providers/CarsContext";
// import { Link } from "react-router-dom";
import axios from "axios";

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true;

const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function Car() {
  const { id } = useParams();
  const [currentCar, setCurrentCar] = useState();
  const initBooking = {
    carId: id,
    email: "",
    phone: "",
  };
  const [bookingInfo, setBookingInfo] = useState(initBooking);
  // const allCarsList = useContext(CarsContext);

  // const currentCar = allCarsList.filter(
  //   (car) => Number(car.id) === Number(id)
  // )[0];
  // console.log("all cars: ", allCarsList);

  useEffect(() => {
    const getCurrentCar = async () => {
      const result = await axios.get(`${BACKEND_URL}/cars/${id}`);
      setCurrentCar(result.data.car);
    };
    getCurrentCar();
  }, []);

  const handleSubmit = () => {
    console.log("submit done!");
  };

  return (
    <div>
      <Navbar />
      {currentCar && (
        <div>
          <h2>Car details: {id}</h2>
          <h4>Name: {currentCar.name}</h4>
          <p>Model: {currentCar.model}</p>
          <p>Type: {currentCar.type}</p>
          <p>Price: ${currentCar.price} / Day</p>
        </div>
      )}
      <p>Please input your contact info to book: </p>
      <form onSubmit={handleSubmit}>
        <label>Your Email</label>
        <input
          value={bookingInfo.email}
          onChange={(e) => setBookingInfo({ email: e.target.value })}
        />
        <label>Your Contact No.</label>
        <input
          value={bookingInfo.phone}
          onChange={(e) => setBookingInfo({ phone: e.target.value })}
        />
        <button>Book</button>
      </form>
      {/* <Link to={`/cars/${currentCar.id}/book`}>Book</Link> */}
    </div>
  );
}
