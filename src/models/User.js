const { DataTypes } = require('sequelize');
const connection = require('../db.js');

const User = connection.define(
  'user',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    last_login_time: {
      type: DataTypes.DATE,
    },
    registration_time: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.ENUM('active', 'blocked'),
      allowNull: false,
      defaultValue: 'active',
    },
    theme: {
      type: DataTypes.ENUM('light', 'dark'),
      allowNull: false,
      defaultValue: 'light',
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id',
      },
      defaultValue: 2,
      allowNull: false,
    },
    recovery_code: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    recovery_code_expires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;