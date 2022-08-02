import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Car() {
  let { id } = useParams();

  return (
    <div>
      <Navbar />
      <h2>Car details: {id}</h2>

      {/* <h4>Name: {car.name}</h4>
        <p>Model: {car.model}</p>
        <p>Type: {car.type}</p>
        <p>Price: ${car.price} / Day</p> */}
    </div>
  );
}
