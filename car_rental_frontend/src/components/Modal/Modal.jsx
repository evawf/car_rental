import "./styles.css";
import React, { useState } from "react";
import { Button } from "@mui/material";

export default function Modal(ChildComponent) {
  const [isVisible, setIsVisible] = useState(false);
  if (isVisible) {
    return (
      <div className="modal-container">
        <div className="modal">
          <button className="modal-close" onClick={() => setIsVisible(false)}>
            X
          </button>
          <ChildComponent />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {/* <button onClick={() => setIsVisible(true)}>View Deal</button> */}
        <Button
          size="small"
          color="primary"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          View Deal
        </Button>
      </div>
    );
  }
}
