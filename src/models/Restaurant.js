const { DataTypes } = require("sequelize");
const connection = require("../db.js");

const Restaurant = connection.define(
  "restaurant",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    maxPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("category");
        return rawValue ? rawValue.split(",") : [];
      },
      set(value) {
        this.setDataValue("category", value.join(","));
      },
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Restaurant;
