const Base = require("./base");

class Cars extends Base {
  constructor(model) {
    super(model);
  }

  async getCars(req, res) {
    try {
      const getCars = await this.model.findAll();
      if (getCars) {
        res.json({ cars: getCars });
      }
    } catch (error) {
      console.log("Error message: ", error);
    }
  }
}

module.exports = Cars;
