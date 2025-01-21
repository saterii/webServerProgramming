const { DataTypes} = require('sequelize')
const sequelize = require('../db/postgres')

const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    username: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false
    },
  }, {
    underscored: true,
    timestamps: false,
  })

module.exports = User
