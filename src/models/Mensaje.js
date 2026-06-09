const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mensaje = sequelize.define('Mensaje', {
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
  destinatario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  asunto: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('COMUNICACION', 'NOTIFICACION'),
    allowNull: false
  }
}, {
  tableName: 'mensajes',
  timestamps: true
});

module.exports = Mensaje;