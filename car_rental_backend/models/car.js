const initCarModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "car",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      model: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      type: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      color: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL,
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

module.exports = initCarModel;
