const { DataTypes } = require('sequelize'); // importa DataTypes de Sequelize
const sequelize = require('../config/db'); // importa la conexión a la base de datos

const Justificativo = sequelize.define('Justificativo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  asistenciaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  motivo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  urlArchivo: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fechaCarga: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'justificativos',
  timestamps: true
});

module.exports = Justificativo;