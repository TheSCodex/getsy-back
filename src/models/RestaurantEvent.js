const { DataTypes } = require("sequelize");
const connection = require("../db.js");

const RestaurantEvent = connection.define(
  "restaurant_events",
  {
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "restaurants",
        key: "id",
      },
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "events",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = RestaurantEvent;
