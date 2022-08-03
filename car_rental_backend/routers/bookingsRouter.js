const express = require("express");
const router = express.Router();

class BookingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  router() {
    router
      .get(
        "/bookings/:id",
        this.controller.getBookingInfo.bind(this.controller)
      )
      .post("/booking", this.controller.postBooking.bind(this.controller));
    return router;
  }
}

module.exports = BookingsRouter;
