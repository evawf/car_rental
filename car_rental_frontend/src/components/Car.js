import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

export default function Car({
  selectedCarId,
  setShowBookingForm,
  currentCar,
  setShowSingleCar,
}) {
  return (
    <Card>
      {currentCar && (
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="180"
            image={currentCar.img}
          ></CardMedia>
          <Typography variant="body2" color="text.secondary">
            <h3> {currentCar.name}</h3>
            <p>
              Model: {currentCar.model} <br />
              Gearbox: {currentCar.type} <br />
              Seats: {currentCar.seats} <br />
              Price: ${currentCar.price} / Day
            </p>
          </Typography>
          <CardActions>
            <Button
              variant="contained"
              color="success"
              onClick={() => setShowBookingForm(true)}
            >
              Book
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setShowSingleCar(false);
              }}
            >
              Back
            </Button>
          </CardActions>
        </CardContent>
      )}
    </Card>
  );
}
