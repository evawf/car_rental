const faker = require("faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const carsList = [];
    for (let i = 0; i < 100; i += 1) {
      carsList.push({
        name: faker.vehicle.vehicle(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        color: faker.vehicle.color(),
        price: faker.commerce.price(),
        // img: faker.vehicle.photo(),
        // seats: faker.vehicle.seats(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    try {
      const result = await queryInterface.bulkInsert("cars", carsList);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cars", null, {});
  },
};
