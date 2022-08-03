const express = require("express");
const router = express.Router();

class CarsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  router() {
    router
      .get(
        "/availableCars",
        this.controller.getAvailableCars.bind(this.controller)
      )
      .get("/cars/:id", this.controller.getCurrentCar.bind(this.controller));

    return router;
  }
}

module.exports = CarsRouter;
