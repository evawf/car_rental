const initBookingModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
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
        type: DataTypes.TEXT,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      carId: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
