const { Car } = require("../models");
const Base = require("./base");

class Bookings extends Base {
  constructor(model) {
    super(model);
  }

  async getMyBookings(req, res) {
    const { email } = req.query;
    try {
      const result = await this.model.findAll({
        include: Car,
        where: { email: email },
        order: [["start_date", "DESC"]],
      });
      console.log("my booking: ", result);
      if (result) {
        return res.json({ bookings: result });
      } else {
        return res.send("You have no booking.");
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async postBooking(req, res) {
    const bookingInfo = req.body;
    try {
      const result = await this.model.create(bookingInfo);
      console.log("add booking", result);
      if (result) {
        return res.send("Booking success!");
      } else {
        return res.send("Booking failed!");
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  }

  async deleteBooking(req, res) {
    const { id } = req.params;
    try {
      const result = await this.model.findByPk(id);
      if (result) {
        result.destroy();
        return res.send("Booking deleted!");
      } else {
        return res.send("No booking record.");
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  }
}

module.exports = Bookings;
