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
      phone_no: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      pickup_location: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      start_date: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      end_date: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      car_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "cars",
          key: "id",
        },
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
