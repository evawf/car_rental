const Base = require("./base");
const { Booking } = require("../models");
const { Op } = require("sequelize");

class Cars extends Base {
  constructor(model) {
    super(model);
  }

  async getAvailableCars(req, res) {
    const { searchedStartDate, searchedEndDate } = req.query;
    console.log("start date: ", searchedStartDate);
    console.log("end date: ", searchedEndDate);

    try {
      const getAvailableCars = await this.model.findAll({
        include: {
          required: false,
          model: Booking,
          where: {
            [Op.and]: [
              {
                startDate: {
                  [Op.notBetween]: [searchedStartDate, searchedEndDate],
                },
              },
              {
                endDate: {
                  [Op.notBetween]: [searchedStartDate, searchedEndDate],
                },
              },
            ],
          },
        },
      });

      if (getAvailableCars) {
        res.json({ cars: getAvailableCars });
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
