"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("bookings", "total", {
      allowNull: true,
      type: Sequelize.DECIMAL(10, 2),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("bookings", "total");
  },
};
