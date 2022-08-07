const { Car } = require("../models");
const Base = require("./base");

class Bookings extends Base {
  constructor(model) {
    super(model);
  }

  async getMyBookings(req, res) {
    const { email } = req.query;
    console.log(email);
    try {
      const result = await this.model.findAll({
        include: Car,
        where: { email: email },
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
    console.log("booking info:", bookingInfo);
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
    console.log("booking id :", id);
    try {
      const result = await this.model.findByPk(id);
      console.log("booking info: ", result);
      result.destroy();
      // result.save();
      return res.send("Booking deleted!");
    } catch (error) {
      console.log("Error message: ", error);
    }
  }
}

module.exports = Bookings;
