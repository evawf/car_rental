const express = require("express");
const router = express.Router();

class BookingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  router() {
    router
      .get("/myBookings", this.controller.getMyBookings.bind(this.controller))
      .post("/booking", this.controller.postBooking.bind(this.controller));
    return router;
  }
}

module.exports = BookingsRouter;
