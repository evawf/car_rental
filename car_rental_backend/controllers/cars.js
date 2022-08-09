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
            //Option 1
            // [Op.and]: [
            //   {
            //     startDate: {
            //       [Op.lte]: searchedEndDate,
            //     },
            //     endDate: {
            //       [Op.gte]: searchedStartDate,
            //     },
            //   },
            // ],
            // Option 2
            // [Op.not]: [
            //   {
            //     [Op.or]: [
            //       {
            //         [Op.and]: [
            //           {
            //             startDate: {
            //               [Op.gt]: searchedEndDate,
            //             },
            //           },
            //           {
            //             endDate: {
            //               [Op.gt]: searchedEndDate,
            //             },
            //           },
            //         ],
            //       },
            //       {
            //         [Op.and]: [
            //           {
            //             startDate: {
            //               [Op.lt]: searchedStartDate,
            //             },
            //           },
            //           {
            //             endDate: {
            //               [Op.lt]: searchedStartDate,
            //             },
            //           },
            //         ],
            //       },
            //     ],
            //   },
            // ],
            // Option 3
            [Op.not]: [
              {
                [Op.or]: [
                  {
                    startDate: {
                      [Op.gt]: searchedEndDate,
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
        },
      });

      let availableCars;
      if (bookedCars.length) {
        // availableCars = allCars.filter((c) => {
        //   // c.id is not in bookedCars
        //   for (let i = 0; i < bookedCars.length; i++) {
        //     if (c.id === bookedCars[i].id) {
        //       return false;
        //     }
        //   }
        //   return true;
        // });
        availableCars = allCars.filter((c) => {
          let booked = false;
          bookedCars.forEach((b) => {
            if (b.id === c.id) {
              booked = true;
            }
          });
          return !booked;
        });
      } else {
        availableCars = allCars;
      }

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
