import React from "react";
// import axios from "axios";

// // make sure that axios always sends the cookies to the backend server
// axios.defaults.withCredentials = true;

// const BACKEND_URL =
//   process.env.REACT_APP_CAR_RENTAL_BACKEND_URL || "http://localhost:3004";

export default function Car({ selectedCarId, setShowBookingForm, currentCar }) {
  // const [currentCar, setCurrentCar] = useState();
  // console.log("car id: ", selectedCarId);
  // useEffect(() => {
  //   // console.log("start date: ", localStorage.getItem("startDate"));
  //   const getCurrentCar = async () => {
  //     const result = await axios.get(`${BACKEND_URL}/cars/${selectedCarId}`);
  //     setCurrentCar(result.data.car);
  //   };
  //   getCurrentCar();
  // }, []);

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
