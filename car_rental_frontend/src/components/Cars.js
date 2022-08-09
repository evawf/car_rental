import React from "react";
import { CardActionArea, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import Button from "@mui/material/Button";

export default function Cars({ carsList, setSelectedCarId, setShowSingleCar }) {
  return carsList.length ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "10px",
        padding: "10px",
        border: "1px solid lightgray",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h4 style={{ margin: "0" }}>Available Cars: </h4>
      {carsList.map((car, idx) => (
        <Card
          style={{
            display: "block",
            margin: "1rem 0",
            height: "200px",
            backgroundColor: "darkgray",
            textAlign: "center",
            color: "black",
          }}
          key={String(idx)}
        >
          <CardActionArea>
            <CardContent sx={{ maxWidth: 380 }}>
              <Typography gutterBottom variant="h6" component="div">
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
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="info"
              style={{ height: "28px" }}
              onClick={() => {
                setSelectedCarId(car.id);
                setShowSingleCar(true);
              }}
            >
              View Deal
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  ) : (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      Please input start date and end date to find available cars!
    </div>
  );
}
