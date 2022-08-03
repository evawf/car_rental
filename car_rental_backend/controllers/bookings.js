const Base = require("./base");

class Bookings extends Base {
  constructor(model) {
    super(model);
  }

  async getMyBookings(req, res) {
    const { email } = req.query;
    console.log(email);
    try {
      const result = await this.model.findAll({ where: { email: email } });
      console.log("my booking: ", result);
      if (result) {
        res.json({ bookings: result });
      } else {
        res.send("You have no booking.");
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
        res.send("Booking success!");
      } else {
        res.send("Booking failed!");
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  }
}

module.exports = Bookings;
