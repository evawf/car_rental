import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CarsContext from "../providers/CarsContext";
import { Link } from "react-router-dom";

export default function Car() {
  const { id } = useParams();
  const allCarsList = useContext(CarsContext);

  const currentCar = allCarsList.filter(
    (car) => Number(car.id) === Number(id)
  )[0];
  console.log("all cars: ", allCarsList);

  const handleSubmit = () => {
    console.log("submit done!");
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2>Car details: {id}</h2>
        <h4>Name: {currentCar.name}</h4>
        <p>Model: {currentCar.model}</p>
        <p>Type: {currentCar.type}</p>
        <p>Price: ${currentCar.price} / Day</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Pickup Loaction</label>
        <input />
        <label>Start Date</label>
        <input />
        <label>End Date</label>
        <input />
        <label>Your Email</label>
        <input />
        <label>Your Contact No.</label>
        <input />
      </form>
      <Link to={`/cars/${currentCar.id}/book`}>Book</Link>
    </div>
  );
}
