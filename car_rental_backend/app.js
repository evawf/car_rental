const cookieParser = require("cookie-parser");
const express = require("express");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Initialise Express instance
const app = express();
// Set CORS headers
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
// Set the Express view engine to expect EJS templates
app.set("view engine", "ejs");
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind Express middleware to parse JSON request bodies
app.use(express.json());
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride("_method"));
// Expose the files stored in the public folder
app.use(express.static("public"));
// Expose the files stored in the distribution folder
app.use(express.static("dist"));

// import db
const db = require("./models/index.js");

// import controllers
const Cars = require("./controllers/cars");
const Bookings = require("./controllers/bookings");

// init controllers
const carsController = new Cars(db.Car);
const bookingsController = new Bookings(db.Booking);

// import routers
const CarsRouter = require("./routers/carsRouter");
const BookingsRouter = require("./routers/bookingsRouter");

// Initializing routers
const carsRouter = new CarsRouter(carsController).router();
const bookingsRouter = new BookingsRouter(bookingsController).router();

app.use("/", carsRouter);
app.use("/", bookingsRouter);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
app.listen(PORT);
console.log(`App is running on port: ${PORT}`);
