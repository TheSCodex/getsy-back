const { DataTypes } = require("sequelize");
const connection = require("../db.js");

const Role = connection.define(
  "role",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    permissions: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Role;
