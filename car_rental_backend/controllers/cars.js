const Base = require("./base");
const { Booking } = require("../models");
const { Op } = require("sequelize");

class Cars extends Base {
  constructor(model) {
    super(model);
  }

  async getAvailableCars(req, res) {
    const { searchedStartDate, searchedEndDate } = req.query;

    try {
      const allCars = await this.model.findAll();
      const bookedCars = await this.model.findAll({
        order: [["id", "ASC"]],
        include: {
          required: true,
          model: Booking,
          where: {
            [Op.not]: [
              {
                [Op.or]: [
                  {
                    [Op.and]: [
                      {
                        startDate: {
                          [Op.gt]: searchedEndDate,
                        },
                      },
                      {
                        endDate: {
                          [Op.gt]: searchedEndDate,
                        },
                      },
                    ],
                  },
                  {
                    [Op.and]: [
                      {
                        startDate: {
                          [Op.lt]: searchedStartDate,
                        },
                      },
                      {
                        endDate: {
                          [Op.lt]: searchedStartDate,
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      });

      const availableCars = allCars.filter((c) => {
        bookedCars.forEach((car) => car.id === c.id);
      });
      console.log("available cars: ", availableCars);

      if (availableCars) {
        res.json({ cars: availableCars });
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
