const { DataTypes } = require('sequelize'); // importa los tipos de datos de Sequelize
const sequelize = require('../config/db'); // importa la conexión a la BD

// define el modelo Justificativo y sus campos en la BD
const Justificativo = sequelize.define('Justificativo', {
  id: {
    type: DataTypes.INTEGER, // id como número entero
    primaryKey: true, // id como clave primaria
    autoIncrement: true // genera el id automáticamente
  },
  asistenciaId: {
    type: DataTypes.INTEGER, // guarda el id de la asistencia relacionada
    allowNull: false // obliga a que el campo tenga valor
  },
  urlCloudStorage: {
    type: DataTypes.STRING, // guarda la URL del archivo en la nube
    allowNull: false // obliga a que el campo tenga valor
  },
  fechaCarga: {
    type: DataTypes.DATEONLY, // guarda solo la fecha (sin hora)
    allowNull: false // obliga a que el campo tenga valor
  }
}, {
  tableName: 'justificativos', // define el nombre real de la tabla
  timestamps: true // agrega createdAt y updatedAt automáticamente
});

module.exports = Justificativo; // exporta el modelo para usarlo en otras partes
