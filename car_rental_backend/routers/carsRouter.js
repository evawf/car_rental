const express = require("express");
const router = express.Router();

class CarsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  router() {
    router.get("/cars", this.controller.getCars.bind(this.controller));

    return router;
  }
}

module.exports = CarsRouter;
