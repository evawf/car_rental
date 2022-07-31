const express = require("express");
const router = express.Router();

class BookingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  router() {
    // router.get("/bookings", (req, res) => {
    //   res.sendFile(resolve("dist", "main.html"));
    // });

    return router;
  }
}

module.exports = BookingsRouter;
