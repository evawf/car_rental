const Base = require("./base");

class Cars extends Base {
  constructor(model) {
    super(model);
  }

  async getAvailableCars(req, res) {
    try {
      const getCars = await this.model.findAll();
      if (getCars) {
        res.json({ cars: getCars });
      } else {
        res.send("No available car.");
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async getCurrentCar(req, res) {
    try {
      const { id } = req.params;
      const getCurrentCar = await this.model.findByPk(id);
      console.log("current car: ", getCurrentCar);
      if (getCurrentCar) {
        res.json({ car: getCurrentCar });
      } else {
        res.send("Car not found.");
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  }
}

module.exports = Cars;
