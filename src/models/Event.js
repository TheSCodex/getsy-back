const { DataTypes } = require("sequelize");
const connection = require("../db.js");

const Event = connection.define(
  "events",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Event;
