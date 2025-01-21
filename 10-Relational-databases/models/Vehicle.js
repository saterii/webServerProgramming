const { DataTypes} = require('sequelize')
const sequelize = require('../db/postgres')

const Vehicle = sequelize.define('vehicle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  make: {
    type: DataTypes.TEXT,
    allowNull: false
    // allowNull defaults to true
  },
  model: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  license_plate: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true, // <- UNIQUE CONSTRAINT
    validate: {
      is: /^[A-ZÅÄÖ]{2,3}-[1-9]{1}[0-9]{0,2}$/
    }
  },
  commissioned: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  user_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  }
}, {
  underscored: true,
  timestamps: false,
  // Other model options would also go here
})

module.exports = Vehicle
