import React, { useState } from "react";
import SearchForm from "../components/SearchForm.js";

export default function Home() {
  const [carsList, setCarsList] = useState([]);
  const [showCarsList, setShowCarsList] = useState(false);

  return (
    <div>
      This is Homepage
      <SearchForm setCarsList={setCarsList} setShowCarsList={setShowCarsList} />
    </div>
  );
}
