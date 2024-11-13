const { DataTypes } = require("sequelize");
const connection = require("../db.js");

const Review = connection.define(
  "reviews",
  {
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "restaurants",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Review;
