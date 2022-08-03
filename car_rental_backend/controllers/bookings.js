const Base = require("./base");

class Bookings extends Base {
  constructor(model) {
    super(model);
  }

  async getBookingInfo(req, res) {
    const { id } = req.params;
    console.log(id);
  }

  async postBooking(req, res) {
    const bookingInfo = req.body;
    console.log(bookingInfo);
  }
}

module.exports = Bookings;
