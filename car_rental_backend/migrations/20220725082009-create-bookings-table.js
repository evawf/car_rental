"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      phoneNo: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      pickupLocation: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      endDate: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      carId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bookings");
  },
};
