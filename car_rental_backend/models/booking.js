const initBookingModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "booking",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      phoneNo: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      pickupLocation: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      startDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      total: {
        allowNull: true,
        type: DataTypes.DECIMAL(10, 2),
      },
      carId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "cars",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    }
  );
};

module.exports = initBookingModel;
