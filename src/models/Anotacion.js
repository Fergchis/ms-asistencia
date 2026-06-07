const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Anotacion = sequelize.define('Anotacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  alumnoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  profesorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('POSITIVA', 'NEGATIVA', 'NEUTRA'),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'anotaciones',
  timestamps: true
});

module.exports = Anotacion;