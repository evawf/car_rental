import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

axios.defaults.withCredentials = true;
const BACKEND_URL =
  process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function Car() {
  const { id } = useParams();
  const [car, setCar] = useState([]);
  const getCarInfo = async () => {
    try {
      const result = await axios.get(`${BACKEND_URL}/cars/${id}`);
      console.log("car info:", result.data);
      setCar(result.data.car);
    } catch (error) {
      console.log("Error message: ", error);
    }
  };

  useEffect(() => {
    getCarInfo();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <h2>Car details: {id}</h2>
        <h4>Name: {car.name}</h4>
        <p>Model: {car.model}</p>
        <p>Type: {car.type}</p>
        <p>Price: ${car.price} / Day</p>
      </div>
      <button>Book</button>
    </div>
  );
}
