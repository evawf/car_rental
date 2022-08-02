import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CarsContext from "../providers/CarsContext";
import { Link } from "react-router-dom";

export default function Book() {
  const { id } = useParams();
  const allCarsList = useContext(CarsContext);

  const currentCar = allCarsList.filter(
    (car) => Number(car.id) === Number(id)
  )[0];
  console.log("all cars: ", allCarsList);

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
      <Link to={`/cars/${currentCar.id}/book`}>View Deal</Link>
    </div>
  );
}
