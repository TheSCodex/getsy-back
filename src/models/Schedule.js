const { DataTypes } = require("sequelize");
const connection = require("../db.js");

const Schedule = connection.define(
  "schedule",
  {
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "restaurants",
        key: "id",
      },
    },
    working_days: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Schedule;
