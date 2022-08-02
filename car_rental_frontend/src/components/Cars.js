import { Modal } from "./Modal/Modal.js";
import Car from "../routes/Car.js";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import {
//   addBookingAction,
//   updateBookingAction,
//   cancelBookingAction,
// } from "../todo.js";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import CardMedia from "@mui/material/CardMedia";

export default function Cars({ carsList, todoList }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0 10px 0 10px",
      }}
    >
      <h4>Available Cars: </h4>
      {carsList.map((car, idx) => (
        <Card
          style={{
            display: "block",
            margin: "1rem 0",
            height: "200px",
            backgroundColor: "darkgray",
            color: "black",
          }}
          key={String(idx)}
        >
          <CardActionArea>
            <CardContent sx={{ maxWidth: 380 }}>
              <Typography gutterBottom variant="h5" component="div">
                {car.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <DirectionsCarIcon sx={{ color: car.color, fontSize: 20 }} />
                <br />
                Model: {car.model}
                <br />
                Type: {car.type}
                <br />
                Price: ${car.price} / Day
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            style={{
              backgroundColor: "white",
              color: "gray",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {Modal(Car)}
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
