import React, { useState } from "react";
import SearchForm from "../components/SearchForm.js";
import Cars from "../components/Cars.js";
import Navbar from "../components/Navbar";

export default function Home() {
  const [carsList, setCarsList] = useState([]);
  const [showCarsList, setShowCarsList] = useState(false);

  return (
    <div>
      <Navbar />
      <SearchForm setCarsList={setCarsList} setShowCarsList={setShowCarsList} />
      {showCarsList && <Cars carsList={carsList} />}
    </div>
  );
}
