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
            image="https://assets.newcars.com/images/car-pictures/car-defaults/large/2022-bmw-x7.png"
          ></CardMedia>
          <Typography variant="body2" color="text.secondary">
            <h3>Name: {currentCar.name}</h3>
            <p>
              Model: {currentCar.model} <br></br>Type: {currentCar.type}{" "}
              <br></br>Price: ${currentCar.price} / Day
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
